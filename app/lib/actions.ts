"use server";

import { S3 } from '@aws-sdk/client-s3';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const endpoint = process.env.R2_ENDPOINT ?? '';

if (!endpoint) {
  throw new Error('Cloudflare R2 endpoint is not set. Please check your environment variables.');
}

// Initialize the S3 client for Cloudflare R2 using environment variables
const s3Client = new S3({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
});

// Function to upload files to Cloudflare R2
async function uploadToR2(file: File): Promise<string> {
  const filename = `${randomUUID()}_${file.name.replace(/\s/g, '_')}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  await s3Client.putObject({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: file.type,
  });

  return `https://pub-3ea46b7dcfbf4dd9828bfd06c1989ace.r2.dev/${filename}`;
}

// Define schema for blog form data
const BlogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
  images: z.array(z.instanceof(File)),
});

export async function createBlog(formData: FormData) {
  const { title, content, images } = BlogSchema.parse({
    title: formData.get('title'),
    content: formData.get('content'),
    images: formData.getAll('images') as File[],
  });
 

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
      INSERT INTO blogs (title, content, image_url)
      VALUES (${title}, ${content}, ${JSON.stringify(imageUrls)})
    `;
  } catch (dbError) {
    console.error('Database insertion error:', dbError);
    throw new Error('Failed to insert blog into database.');
  }

  revalidatePath('/properties');
  redirect('/properties/success');
}

// Define schema for listing form data
const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  images: z.array(z.instanceof(File)),
});

export async function createListing(formData: FormData) {
  const { title, description, location, images } = FormSchema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    location: formData.get('location'),
    images: formData.getAll('images') as File[],
  });

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
      INSERT INTO properties (title, description, location, image_path)
      VALUES (${title}, ${description}, ${location}, ${JSON.stringify(imageUrls)})
    `;
  } catch (dbError) {
    console.error('Database insertion error:', dbError);
    throw new Error('Failed to insert listing into database.');
  }

  revalidatePath('/properties');
  redirect('/properties/success');
}

export async function updateListing(id: string, formData: FormData) {
  const { title, description, location, images } = FormSchema.partial({
    images: true,
  }).parse({
    title: formData.get('title'),
    description: formData.get('description'),
    location: formData.get('location'),
    images: formData.getAll('images') as File[],
  });

  const imageUrls: string[] = [];

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

  try {
    if (imageUrls.length > 0) {
      await sql`
        UPDATE properties
        SET title = ${title}, description = ${description}, location = ${location}, image_path = ${JSON.stringify(imageUrls)}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE properties
        SET title = ${title}, description = ${description}, location = ${location}
        WHERE id = ${id}
      `;
    }
  } catch (error) {
    console.error('Database update error:', error);
    throw new Error('Failed to update listing.');
  }

  revalidatePath('/properties/success');
  redirect('/properties/success');
}

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

  
  revalidatePath('/login');
  redirect('/properties');
}

const SignUpSchema = z.object({
  username: z.string().min(3, 'Username should be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password should be at least 6 characters'),
  inviteCode: z.string(),
});

export async function signUpUser(formData: FormData) {
  const { username, email, password, inviteCode } = SignUpSchema.parse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    inviteCode: formData.get('inviteCode'),
  });

  try {
    const invite = await sql`SELECT * FROM invites WHERE code = ${inviteCode} AND used = false`;

    if (!invite.rowCount) {
      throw new Error('Invalid or already used invite code.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
    `;

    await sql`UPDATE invites SET used = true WHERE code = ${inviteCode}`;
  } catch (error) {
    console.error('Sign-up error:', error);
    throw new Error('Failed to sign up the user.');
  }

  revalidatePath('/signup');
  redirect('/properties');
}

function generateInviteCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createInvite() {
  const inviteCode = generateInviteCode();

  try {
    await sql`
      INSERT INTO invites (code)
      VALUES (${inviteCode})
    `;

    return inviteCode;
  } catch (error) {
    console.error('Error generating invite:', error);
    throw new Error('Failed to generate invite code.');
  }
}
