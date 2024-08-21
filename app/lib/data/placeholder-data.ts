export const properties = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        title: "Apartment for Rent & Sale",
        description: "A beautiful apartment located in the heart of the city.",
        price: 120.00,
        location: "Kisumu",
        image_path: "/servicesProperty/apartment.jpg"
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        title: "Home for Rent & Sale",
        description: "A quiet retreat in the countryside, perfect for relaxation.",
        price: 80.00,
        location: "Nairobi",
        image_path:"/servicesProperty/home.jpg"
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ed84a9bd81aa',
        title: "Villa for Rent & Sale",
        description: "A Luxurious villa, perfect for comfort.",
        price: 80.00,
        location: "Nairobi",
        image_path:"/servicesProperty/villa.jpg"
    }
];

export const users = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: "John Doe",
        email: "john@example.com",
        password: '123456'
    },
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        name: "Jane Smith",
        email: "jane@example.com",
        password: '123458'
    }
];

export const bookings = [
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        user_id: users[0].id,
        property_id: properties[1].id,
        booking_date: "2024-09-01"
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        user_id: users[1].id,
        property_id: properties[0].id,
        booking_date: "2024-09-10"
    }
];

export const agents = [
    {
        id: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
        name: "Alex Mbuvi",
        role: "Sales Agent",
        image_url: "/agents/alex.jpg",
        social_media: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            twitter: "https://twitter.com"
        }
    },
    {
        id: 'b2c3d4e5-6789-01ab-cdef-2345678901bc',
        name: "Sylvia Walker",
        role: "Sales Agent",
        image_url: "/agents/sylvia.jpg",
        social_media: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            twitter: "https://twitter.com"
        }
    },
    {
        id: 'c4b3d4e5-6789-01ab-cdef-2345678901bc',
        name: "John Brown",
        role: "Sales Agent",
        image_url: "/agents/john.jpg",
        social_media: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            twitter: "https://twitter.com"
        }
    }
];
