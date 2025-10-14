export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};

export type Property = {
  id: string;
  title: string;
  description: string;
  
  location: string;
  image_path: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
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
  facebook: string;
  instagram: string;
  twitter: string;
  
};
