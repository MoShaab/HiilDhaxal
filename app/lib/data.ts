import { sql } from '@vercel/postgres';
import { Property, Agent } from './definitions';

export async function fetchFeaturedProperty(): Promise<Property[]> {
  try {
    // Execute SQL query to fetch all properties
    console.log('Fetching properties data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = await sql<Property[]>`SELECT * FROM properties`;

    // Return the properties
    return result.rows;
  } 
  catch (error) {
    // Log the error for debugging
    console.error('Database Error:', error);

    // Throw an error to handle it appropriately in the calling code
    throw new Error('Failed to fetch the latest properties.');
  }
}

export async function fetchDisplayVillas(): Promise<Property[]> {
  try {
    // Execute SQL query to fetch all properties where title contains 'villa'
    console.log('Fetching villas data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = await sql<Property[]>`
      SELECT * FROM properties
      WHERE title ILIKE '%villa%'
    `;

    // Return the villas
    return result.rows;
  } 
  catch (error) {
    // Log the error for debugging
    console.error('Database Error:', error);

    // Throw an error to handle it appropriately in the calling code
    throw new Error('Failed to fetch the latest villa displays.');
  }
}

export async function fetchFeaturedAgents(): Promise<Agent[]> {
  try {
    // Execute SQL query to fetch all agents
    console.log('Fetching agents data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = await sql<Agent[]>`SELECT * FROM agents`;

    // Return the agents
    return result.rows;
  } 
  catch (error) {
    // Log the error for debugging
    console.error('Database Error:', error);

    // Throw an error to handle it appropriately in the calling code
    throw new Error('Failed to fetch the latest agents.');
  }
}
