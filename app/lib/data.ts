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
