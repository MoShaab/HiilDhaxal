import { sql } from '@vercel/postgres';
import { Property, Agent } from './definitions';

export async function fetchFeaturedProperty(): Promise<Property[]> {
  try {
    console.log('Fetching properties data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // The type here should be Property, not Property[]
    const result = await sql<Property>`SELECT * FROM properties`;

    // Return the properties directly
    return result.rows;
  } 
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest properties.');
  }
}

export async function fetchDisplayVillas(): Promise<Property[]> {
  try {
    console.log('Fetching villas data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // The type here should be Property, not Property[]
    const result = await sql<Property>`
      SELECT * FROM properties
      WHERE title ILIKE '%villa%'
    `;

    return result.rows;
  } 
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest villa displays.');
  }
}

export async function fetchFeaturedAgents(): Promise<Agent[]> {
  try {
    console.log('Fetching agents data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // The type here should be Agent, not Agent[]
    const result = await sql<Agent>`SELECT * FROM agents`;

    return result.rows;
  } 
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest agents.');
  }
}

const ITEMS_PER_PAGE = 3;

export async function fetchFilteredProperties(
query: string,
currentPage:number,
){
  const offset = (currentPage-1)*ITEMS_PER_PAGE;

  try{
    const properties = await sql<Property>`
    SELECT * FROM properties
    WHERE
     properties.title ILIKE ${`%${query}%`} OR
     properties.description ILIKE ${`%${query}%`} OR
     properties.location ILIKE ${`%${query}%`} OR
     properties.price::text ILIKE ${`%${query}%`}
    
    ORDER BY properties.created_at DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}

    `;
    return properties.rows;
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch properties.');
  }

}

export async function fetchPropertiesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM properties
    
    WHERE
    properties.title ILIKE ${`%${query}%`} OR
    properties.description ILIKE ${`%${query}%`} OR
    properties.location ILIKE ${`%${query}%`} OR
    properties.price::text ILIKE ${`%${query}%`}
   
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch properties.');
  }
}
