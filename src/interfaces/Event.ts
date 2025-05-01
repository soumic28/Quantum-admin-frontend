export interface Event2 {
  _id?: string;
  name: string;
  location: string;
  price?: number;
  description: string;
  address?: {
    city: string;
    state: string;
    street: string;
    pincode: number;
  };
  sports?: string[];
  facilities?: string[];
  status?: string;
  partner?: string;
  images?: string[];
}

export interface Event {
  _id: string;
  name: string;
  Category: string;
  location: string;
  description: string;
  price: number;
  recurring: string;
  dateAndTime: {
    start: string;
    end: string;
  };
  capacity: number;
  bookedUsers: string[];
  address: {
    city: string;
    state: string;
    street: string;
    pincode: number;
  };
  facilities: string[];
  bookings: string[];
  organizer: {
    name: string;
    phoneNumber: number;
    email: string;
  };
  images: string[];
  verified: boolean;
  rating: any[];
}
