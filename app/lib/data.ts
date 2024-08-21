import { sql } from '@vercel/postgres';
import { Property } from './definitions';


export async function fetchFeaturedProperty(): Promise<Property[]> {
  try {
    // Execute SQL query to fetch all properties
    console.log('Fetching properties data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = await sql<Property>`SELECT * FROM properties`;

    // Extract rows from the query result
   

    // Return the latest properties
    return result.rows;
  } 
  catch (error) {
    // Log the error for debugging
    console.error('Database Error:', error);

    // Throw an error to handle it appropriately in the calling code
    throw new Error('Failed to fetch the latest properties.');
  }
}

export async function fetchDisplayVillas(): Promise<Property[]>{
  try {
    // Execute SQL query to fetch all properties
    console.log('Fetching properties data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = await sql<Property>`SELECT * FROM properties
    WHERE title ILIKE ('%villa%')
    `;

    // Extract rows from the query result
   

    // Return the latest properties
    return result.rows;
  } 
  catch (error) {
    // Log the error for debugging
    console.error('Database Error:', error);

    // Throw an error to handle it appropriately in the calling code
    throw new Error('Failed to fetch the latest villaDisplays.');
  }
}
