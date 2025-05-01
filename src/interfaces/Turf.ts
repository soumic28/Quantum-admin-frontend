export interface Turf2 {
  _id?: string;
  name: string;
  location: {
    longitude: number;
    latitude: number;
  };
  price?: number;
  description: string;
  contact: string;
  address?: {
    city: string;
    state: string;
    street: string;
    pincode: number;
  };
  sports?: Sport[] | string[];
  facilities?: string[];
  status?: string;
  partner?: string;
  images?: string[];
}

interface Sport {
  _id: string;
  name: string;
}

interface Facility {
  _id: string;
  name: string;
}

export interface Turf {
  _id: string;
  name: string;
  description: string;
  contact: string;
  location: string;
  address: {
    city: string;
    state: string;
    street: string;
    pincode: number;
  };
  sports: Sport[];
  facilities: Facility[];
  bookings: any[];
  status: string;
  price: number;
  images: string[];
  verified: boolean;
  rating: any[];
  createdAt: string;
  updatedAt: string;
}
