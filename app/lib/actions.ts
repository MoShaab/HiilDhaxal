'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import path from 'path';
import { writeFile } from 'fs/promises';

const FormSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.coerce.number(),
    location: z.string(),
    images: z.instanceof(File),
});

export async function createListing(formData: FormData) {
    const { title, description, price, location, images } = FormSchema.parse({
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        location: formData.get('location'),
        images: formData.get('images'),
    });

    // Define file name and path
    const filename = `${Date.now()}_${images.name.replace(/\s/g, '_')}`;
    const imagePath = path.join('public/uploads', filename);

    try {
        // Write file to the public/uploads directory
        const buffer = Buffer.from(await images.arrayBuffer());
        await writeFile(path.join(process.cwd(), imagePath), buffer);

        // Insert listing into the database with the correct image path
        await sql`
        INSERT INTO properties (title, description, price, location, image_path)
        VALUES (${title}, ${description}, ${price}, ${location}, ${'/uploads/' + filename})
        `;

        // Revalidate and redirect after successful insertion
        // revalidatePath('/properties/sell_properties');
        // redirect('/properties/sell_properties');
    } catch (error) {
        console.error('Error occurred while creating the listing:', error);
        throw new Error('Failed to create listing.'); // Handle this appropriately in your application
    }
}
