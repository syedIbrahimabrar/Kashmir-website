export interface Destination {
  id: string;
  name: string;
  location: string;
  rating: number;
  description: string;
  image: string;
  bestTime: string;
}

export interface TravelPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  hotel: string;
  transport: string;
  meals: string;
  guide: string;
  features: string[];
}

export interface TourPackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  tag?: string;
  included: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  description: string;
  image: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  image: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
