import { db } from '@vercel/postgres';
import { properties, users, bookings } from '../lib/data/placeholder-data';
import { NextResponse } from 'next/server';



async function connectToDb() {
  const client = await db.connect();
  return client;
}


async function seedProperties() {
  const client = await connectToDb();
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Drop and create the properties table
  // await client.sql`
  // DROP TABLE IF EXISTS PROPERTIES CASCADE;
  // `
 
  await client.sql`
    
    CREATE TABLE IF NOT EXISTS properties (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255),
      description TEXT,
      price DECIMAL(10, 2),
      location VARCHAR(255),
      image_path VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedProperties = await Promise.all(
    properties.map(async (property) => {
      return client.sql`
        INSERT INTO properties (id, title, description, price, location, image_path)
        VALUES (${property.id}, ${property.title}, ${property.description}, ${property.price}, ${property.location}, ${property.image_path})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

   return insertedProperties;
}



async function seedUsers() {
  const client = await connectToDb();
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Drop and create the users table
 
  
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedBookings() {
  const client = await connectToDb();
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Drop and create the bookings table
 
  await client.sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id),
      property_id UUID NOT NULL REFERENCES properties(id),
      booking_date DATE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedBookings = await Promise.all(
    bookings.map(async (booking) => {
      return client.sql`
        INSERT INTO bookings (id, user_id, property_id, booking_date)
        VALUES (${booking.id}, ${booking.user_id}, ${booking.property_id}, ${booking.booking_date})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedBookings;
}

export async function GET() {
  const client = await connectToDb();
  try {
    await client.sql`BEGIN`;
    await seedProperties();
    await seedUsers();
    await seedBookings();
    await client.sql`COMMIT`;

    return NextResponse.json({ message: 'Database seeded successfully' });

    

   
  } catch (error) {
    await client.sql`ROLLBACK`;
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  } finally {
    client.release();
  }
}
