export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_path: string;
};

export type Booking = {
  id: string;
  user_id: string;
  property_id: string;
  booking_date: string;
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  image_url: string;
  social_media: {
      facebook: string;
      instagram: string;
      twitter: string;
  };
};