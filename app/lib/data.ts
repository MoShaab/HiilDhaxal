import { sql } from '@vercel/postgres';
import { Property, Agent, Blog } from './definitions';

export async function fetchFeaturedProperty(): Promise<Property[]> {
  try {
    console.log('Fetching properties data...');
    const result = await sql<Property>`
      SELECT * FROM properties
      ORDER BY properties.created_at DESC
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
      WHERE title ILIKE '%gabay%' OR 
            title ILIKE '%Maahmaahyo%' OR
            title ILIKE '%Maanso%' OR 
            title ILIKE '%Xikmad%' OR

            description ILIKE '%gabay%' OR

            description ILIKE '%Maahmaah%'  OR
            description ILIKE '%Xikmad%' OR
            description ILIKE '%Maansooyin%'



      ORDER BY properties.created_at DESC
      LIMIT 3
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest villa displays.');
  }
}

// export async function fetchFeaturedAgents(): Promise<Agent[]> {
//   try {
//     console.log('Fetching agents data...');
//     const result = await sql<Agent>`SELECT * FROM agents`;
//     return result.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest agents.');
//   }
// }

const ITEMS_PER_PAGE = 15;

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

export async function fetchFilteredBlogs(query: string, currentPage: number): Promise<Blog[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const blogs = await sql<Blog>`
      SELECT * FROM blogs
      WHERE
        blogs.title ILIKE ${`%${query}%`} OR
        blogs.content ILIKE ${`%${query}%`}
        
      ORDER BY blogs.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return blogs.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch blogs.');
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




export async function fetchBlogsPages(query: string): Promise<number> {
  try {
    const count = await sql`SELECT COUNT(*) FROM blogs
      WHERE
        blogs.title ILIKE ${`%${query}%`} OR
        blogs.content ILIKE ${`%${query}%`}
        
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch blogs.');
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


export async function fetchBlogById(id: string){
  try {
    const data = await sql<Blog>`
      SELECT *
      FROM blogs
      WHERE blogs.id = ${id};
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch blog.');
  }
}

export async function fetchDisplayAllVillas(): Promise<Property[]> {
  try {
    console.log('Fetching all villas data...');
    const result = await sql<Property>`
      SELECT * FROM properties
      WHERE title ILIKE '%gabay%' OR 
            title ILIKE '%Maahmaahyo%' OR
            title ILIKE '%Maanso%' OR 
            title ILIKE '%Xikmad%' OR
            title ILIKE '%suugaan%' OR

            description ILIKE '%gabay%' OR
            description ILIKE '%suugaan%' OR
            description ILIKE '%Maahmaah%' OR
            description ILIKE '%Xikmad%' OR
            description ILIKE '%Maansooyin%'



      ORDER BY properties.created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest villa displays.');
  }
}

// Fetch all blog posts
export async function fetchBlogs() {
  try {
    const result = await sql`
      SELECT * FROM blogs ORDER BY blogs.created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Failed to fetch blogs.');
  }
}