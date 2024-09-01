'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';
import { writeFile } from 'fs/promises';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// Define the schema for form data validation
const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  location: z.string(),
  images: z.array(z.instanceof(File)),
});

// Function to create a new listing
export async function createListing(formData: FormData) {
  // Extract the form fields and convert the images to an array
  const { title, description, price, location, images } = FormSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    price: parseFloat(formData.get('price') as string), // Convert to number
    location: formData.get('location'),
    images: formData.getAll('images') as File[],
  });

  // Validate images
  FormSchema.shape.images.parse(images);
  console.log('Form Data:', formData);
  console.log('Images:', images);



  const imagePaths: string[] = [];

  try {
    for (const image of images) {
      const filename = `${Date.now()}_${image.name.replace(/\s/g, '_')}`;
      const imagePath = path.join('public/uploads', filename);

      // Save the image file
      const buffer = Buffer.from(await image.arrayBuffer());
      await writeFile(path.join(process.cwd(), imagePath), buffer);

      // Save the relative path to the array
      imagePaths.push('/uploads/' + filename);
    }

    // Insert listing into the database with the image paths as an array or JSON string
    await sql`
      INSERT INTO properties (title, description, price, location, image_path)
      VALUES (${title}, ${description}, ${price}, ${location}, ${JSON.stringify(imagePaths)})
    `;

  } catch (error) {
    console.error('Error occurred while creating the listing:', error);
    throw new Error('Failed to create listing.');
  }

  // Revalidate and redirect after successful insertion
  revalidatePath('/properties/success');
  redirect('/properties/success');
}

// Function to update an existing listing
// Function to update an existing listing
export async function updateListing(id: string, formData: FormData) {
  const { title, description, price, location, images } = FormSchema.partial({
    images: true,  // Make images optional for updates
  }).parse({
    title: formData.get('title'),
    description: formData.get('description'),
    price: parseFloat(formData.get('price') as string), // Convert to number
    location: formData.get('location'),
    images: formData.getAll('images') as File[],
  });

  const imagePaths: string[] = [];

  if (images &&images.length > 0) {
    try {
      for (const image of images) {
        const filename = `${Date.now()}_${image.name.replace(/\s/g, '_')}`;
        const imagePath = path.join('public/uploads', filename);

        // Save the image file
        const buffer = Buffer.from(await image.arrayBuffer());
        await writeFile(path.join(process.cwd(), imagePath), buffer);

        // Save the relative path to the array
        imagePaths.push('/uploads/' + filename);
      }

      // Update the listing in the database with the new image paths
      await sql`
        UPDATE properties
        SET title = ${title}, description = ${description}, price = ${price}, location = ${location}, image_path = ${JSON.stringify(imagePaths)}
        WHERE id = ${id}
      `;
    } catch (error) {
      console.error('Error occurred while updating the listing:', error);
      throw new Error('Failed to update listing.');
    }
  } else {
    try {
      // Update the listing without modifying image paths
      await sql`
        UPDATE properties
        SET title = ${title}, description = ${description}, price = ${price}, location = ${location}
        WHERE id = ${id}
      `;
    } catch (error) {
      console.error('Error occurred while updating the listing:', error);
      throw new Error('Failed to update listing.');
    }
  }

  // Revalidate and redirect after successful update
  revalidatePath('/properties/success');
  redirect('/properties/success');
}

// Function to delete a listing
export async function deleteListing(id: string) {
  try {
    await sql`
      DELETE FROM properties WHERE id = ${id}
    `;
    revalidatePath('/properties');
  } catch (error) {
    console.error('Error occurred while deleting the listing:', error);
    throw new Error('Failed to delete listing.');
  }
}



export type AuthResult = {
  authenticated: boolean;
  message?: string;
};

export async function authenticate(prevState: string | undefined, formData: FormData): Promise<AuthResult> {
  try {
    await signIn('credentials', formData);
    return { authenticated: true };
  } catch (error) {
    if (error instanceof AuthError) {
      let message = 'Something went wrong.';
      switch (error.type) {
        case 'CredentialsSignin':
          message = 'Invalid credentials.';
          break;
      }
      return { authenticated: false, message };
    }
    throw error;  // Re-throw unexpected errors
  }
}

