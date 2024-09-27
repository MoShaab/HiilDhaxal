
import { db } from '@vercel/postgres';
import { agents } from '../lib/data/placeholder-data';
import { NextResponse } from 'next/server';


async function connectToDb() {
  const client = await db.connect();
  return client;
}

async function seedProperties() {
  const client = await connectToDb();
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS properties (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      price DECIMAL(10, 2),
      location VARCHAR(255),
      image_path JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

 
       
}

async function seedInviteCodes(){
  const client = await connectToDb();
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
  await client.sql`
  CREATE TABLE IF NOT EXISTS invites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP
);

  `;
}




async function seedUsers() {
  const client = await connectToDb();
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  // const insertedUsers = await Promise.all(
  //   users.map(async (user) => {
  //     const hashedPassword = await bcrypt.hash(user.password, 10);
  //     return client.sql`
  //       INSERT INTO users (id, username, email, password)
  //       VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
  //       ON CONFLICT (id) DO NOTHING;
  //     `;
  //   })
  // );

  // return insertedUsers;
}

async function seedBookings() {
  const client = await connectToDb();
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id),
      property_id UUID NOT NULL REFERENCES properties(id),
      booking_date DATE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;


}

async function seedAgents() {
  const client = await connectToDb();
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`DROP TABLE IF EXISTS agents CASCADE`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS agents (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255),
      role VARCHAR(255),
      image_url VARCHAR(255),
      facebook VARCHAR(255),
      instagram VARCHAR(255),
      twitter VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedAgents = await Promise.all(
    agents.map(async (agent) => {
      return client.sql`
        INSERT INTO agents (id, name, role, image_url, facebook, instagram, twitter)
        VALUES (${agent.id}, ${agent.name}, ${agent.role}, ${agent.image_url}, ${agent.facebook}, ${agent.instagram}, ${agent.twitter})
        ON CONFLICT (id) DO UPDATE
        SET name = EXCLUDED.name,
          role = EXCLUDED.role,
          image_url = EXCLUDED.image_url,
          facebook = EXCLUDED.facebook,
          instagram = EXCLUDED.instagram,
          twitter = EXCLUDED.twitter;
      `;
    })
  );

  return insertedAgents;
}


export async function GET() {
  const client = await connectToDb();
  
  try {
    await client.sql`BEGIN`;
    await seedProperties();
    await seedInviteCodes();
    await seedUsers();
    await seedBookings();
    await seedAgents(); // Add seeding for agents
    await client.sql`COMMIT`;

    return NextResponse.json({ message: 'Database seeded successfully' });

  } catch (error) {
    await client.sql`ROLLBACK`;

    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });

  } finally {
    client.release();
  }
}
