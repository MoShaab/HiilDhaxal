

export const properties = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',  // Add UUID for property ID
        title: "Modern Apartment in the City Center",
        description: "A beautiful apartment located in the heart of the city.",
        price: 120.00,
        location: "Kisumu",
        image_path: "/servicesProperty/apartment.jpg"
       
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',  // Add UUID for property ID
        title: "Cozy Cottage in the Countryside",
        description: "A quiet retreat in the countryside, perfect for relaxation.",
        price: 80.00,
        location: "Nairobi",
        image_path:"/servicesProperty/home.jpg",
       
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ed84a9bd81aa',  // Add UUID for property ID
        title: "A place to call home",
        description: "A Luxurious villa, perfect for comfort.",
        price: 80.00,
        location: "Nairobi",
        image_path:"/servicesProperty/villa.jpg",
       
    }
];

export const users = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',  // Add UUID for user ID
        name: "John Doe",
        email: "john@example.com",
        password: '123456'
    },
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',  // Add UUID for user ID
        name: "Jane Smith",
        email: "jane@example.com",
        password: '123458'
    }
];

export const bookings = [
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',  // Add UUID for booking ID
        user_id: users[0].id,  // Reference the user's UUID
        property_id: properties[1].id,  // Reference the property's UUID
        booking_date: "2024-09-01"
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',  // Add UUID for booking ID
        user_id: users[1].id,  // Reference the user's UUID
        property_id: properties[0].id,  // Reference the property's UUID
        booking_date: "2024-09-10"
    }
];
