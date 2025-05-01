export interface IBooking {
  _id: string;
  orderId: string;
  user: string;
  bookingObjectId: {
    slots?: Array<{
      turfId: string;
      startTime: string;
      endTime: string;
      isAvailable: string;
      price: number;
      day: string;
    }>;
    eventId?: {
      name: string;
      price: number;
      dateAndTime: {
        start: string;
        end: string;
      };
    };
    quantity?: number;
  };
  bookingObjectType: "TurfBooking" | "EventBooking";
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITurfBooking {
  slots: string[];
}
export interface IEventBooking {
  eventId: string;
  quantity: number;
}

export interface IProductBooking {
  orderList: {
    product: string;
    quantity: number;
  }[];
}
