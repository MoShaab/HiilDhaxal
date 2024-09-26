'use server';
import { S3 } from '@aws-sdk/client-s3';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { randomUUID} from 'crypto';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';

const endpoint = process.env.R2_ENDPOINT ?? '';

if (!endpoint) {
  throw new Error('Cloudflare R2 endpoint is not set. Please check your environment variables.');
}
// Initialize the S3 client for Cloudflare R2 using environment variables
const s3Client = new S3({
  region: 'auto',  // Cloudflare uses auto-region detection
  endpoint: process.env.R2_ENDPOINT?? "",
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",  // Access key from your .env.local
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",  // Secret key from your .env.local
  },
});

// Define schema for the form data
const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  location: z.string(),
  images: z.array(z.instanceof(File)),  // Expecting images to be of File type
});

// Function to upload files to Cloudflare R2
async function uploadToR2(file: File): Promise<string> {
  const filename = `${randomUUID()}_${file.name.replace(/\s/g, '_')}`;  // Create unique filename

  // Convert file to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload to R2
  await s3Client.putObject({
    Bucket: process.env.R2_BUCKET_NAME,  // Your R2 bucket name from .env.local
    Key: filename,  // Unique file name
    Body: buffer,  // File content as buffer
    ContentType: file.type,  // Set correct MIME type
  });

  // Return the file URL constructed with the public bucket URL
  return `https://pub-3ea46b7dcfbf4dd9828bfd06c1989ace.r2.dev/${filename}`;  // Return the full public URL
}

// Create a new listing and upload images
export async function createListing(formData: FormData) {
  const { title, description, price, location, images } = FormSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    price: parseFloat(formData.get('price') as string),  // Ensure price is parsed to number
    location: formData.get('location'),
    images: formData.getAll('images') as File[],  // Collect all images
  });

  try {
    const imageUrls: string[] = [];
  
    try {
      for (const image of images) {
        const imageUrl = await uploadToR2(image);
        imageUrls.push(imageUrl);
      }
    } catch (imageError) {
      console.error('Image upload error:', imageError);
  
      throw new Error('Failed to upload images.');
    }
  
    try {
      await sql`
        INSERT INTO properties (title, description, price, location, image_path)
        VALUES (${title}, ${description}, ${price}, ${location}, ${JSON.stringify(imageUrls)})
      `;
    } catch (dbError) {
      console.error('Database insertion error:', dbError);
      throw new Error('Failed to insert listing into database.');
    }
  
    
  
  } catch (error) {
    console.error('Error creating listing:', error);
    throw new Error('Failed to create listing.');
  }
  // Revalidate and redirect
  revalidatePath('/properties');
  redirect('/properties/success');
  
}




// Function to update an existing listing
export async function updateListing(id: string, formData: FormData) {
  const { title, description, price, location, images } = FormSchema.partial({
    images: true, // Make images optional
  }).parse({
    title: formData.get('title'),
    description: formData.get('description'),
    price: parseFloat(formData.get('price') as string),
    location: formData.get('location'),
    images: formData.getAll('images') as File[],
  });

  const imageUrls: string[] = [];

  // Upload new images if provided
  if (images && images.length > 0) {
    try {
      for (const image of images) {
        const imageUrl = await uploadToR2(image);
        imageUrls.push(imageUrl);
      }
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload images.');
    }
  }

  // Update the listing in the database
  try {
    if (imageUrls.length > 0) {
      // Update with new image paths
      await sql`
        UPDATE properties
        SET title = ${title}, description = ${description}, price = ${price}, location = ${location}, image_path = ${JSON.stringify(imageUrls)}
        WHERE id = ${id}
      `;
    } else {
      // Update without changing image paths
      await sql`
        UPDATE properties
        SET title = ${title}, description = ${description}, price = ${price}, location = ${location}
        WHERE id = ${id}
      `;
    }
  } catch (error) {
    console.error('Database update error:', error);
    throw new Error('Failed to update listing.');
  }

  // Revalidate and redirect
  revalidatePath('/properties/success');
  redirect('/properties/success');
}

// // Function to delete a listing
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


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    

  
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }

  
  redirect('/properties');
}


// Generate a unique code
function generateInviteCode() {
  const inviteCode = Math.floor(100000 + Math.random() * 900000);
  return inviteCode.toString();  
}

export async function createInvite() {
  const inviteCode = generateInviteCode();

  try {
    // Insert invite code into the database
    await sql`
      INSERT INTO invites (code)
      VALUES (${inviteCode})
    `;

    return inviteCode; // Return the code for further use (e.g., sending via email)
  } catch (error) {
    console.error('Error generating invite:', error);
    throw new Error('Failed to generate invite code.');
  }
}




// Define schema for sign-up form data
const SignUpSchema = z.object({
  username: z.string().min(3, 'Username should be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password should be at least 6 characters'),
  inviteCode: z.string(),
});

// Function to handle user sign-up
export async function signUpUser(formData: FormData) {
  const { username, email, password, inviteCode } = SignUpSchema.parse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    inviteCode: formData.get('inviteCode')
  });

  try {

     // Check if the invite code is valid and unused
     const invite = await sql`SELECT * FROM invites WHERE code = ${inviteCode} AND used = false`;
     console.log('Invite result:', invite);

     if (!invite.rows.length) {
       throw new Error('Invalid or already used invite code.');
     }
    // Hash the password before storing it
    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
    `;

    // Mark invite code as used
    await sql`UPDATE invites SET used = true WHERE code = ${inviteCode}`;
    
  } catch (error) {
    console.error('Sign-up error:', error);
    throw new Error('Failed to sign up the user.');
  }
 // Revalidate the necessary path and redirect to the success page
  revalidatePath('/signup');
  redirect('/properties');
}
