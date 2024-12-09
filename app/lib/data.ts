import { sql } from '@vercel/postgres';
import { Property, Agent } from './definitions';

export async function fetchFeaturedProperty(): Promise<Property[]> {
  try {
    console.log('Fetching properties data...');
    const result = await sql<Property>`
      SELECT * FROM properties
      ORDER BY created_at ASC
      LIMIT 6
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest properties.');
  }
}

export async function fetchDisplayVillas(): Promise<Property[]> {
  try {
    console.log('Fetching villas data...');
    const result = await sql<Property>`
      SELECT * FROM properties
      WHERE title ILIKE '%villa%'
      ORDER BY created_at ASC
      LIMIT 3
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest villa displays.');
  }
}

export async function fetchFeaturedAgents(): Promise<Agent[]> {
  try {
    console.log('Fetching agents data...');
    const result = await sql<Agent>`SELECT * FROM agents`;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest agents.');
  }
}

const ITEMS_PER_PAGE = 3;

export async function fetchFilteredProperties(query: string, currentPage: number): Promise<Property[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const properties = await sql<Property>`
      SELECT * FROM properties
      WHERE
        properties.title ILIKE ${`%${query}%`} OR
        properties.description ILIKE ${`%${query}%`} OR
        properties.location ILIKE ${`%${query}%`}
      ORDER BY properties.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return properties.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch properties.');
  }
}

export async function fetchPropertiesPages(query: string): Promise<number> {
  try {
    const count = await sql`SELECT COUNT(*) FROM properties
      WHERE
        properties.title ILIKE ${`%${query}%`} OR
        properties.description ILIKE ${`%${query}%`} OR
        properties.location ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch properties.');
  }
}

export async function fetchPropertyById(id: string){
  try {
    const data = await sql<Property>`
      SELECT *
      FROM properties
      WHERE properties.id = ${id};
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch property.');
  }
}

export async function fetchDisplayAllVillas(): Promise<Property[]> {
  try {
    console.log('Fetching all villas data...');
    const result = await sql<Property>`
      SELECT * FROM properties
      WHERE title ILIKE '%villa%' OR
            description ILIKE '%villa%'
      ORDER BY created_at ASC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest villa displays.');
  }
}
