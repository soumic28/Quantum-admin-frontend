import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { Button, Input } from "../../ui";

import { Textarea } from "../../ui/Textarea";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/AlertBox";
import { useToast } from "../../ui/use-toast";

// You'll need to create these API functions
import { getEvent, updateEvent } from "../../api/event";
import { Event } from "../../interfaces";

export function EventDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [event, setEvent] = useState<Event>({
    _id: id || "",
    name: "",
    Category: "",
    location: "",
    description: "",
    price: 0,
    recurring: "none",
    dateAndTime: {
      start: "",
      end: "",
    },
    capacity: 0,
    bookedUsers: [],
    address: {
      city: "",
      state: "",
      street: "",
      pincode: 0,
    },
    facilities: [],
    bookings: [],
    organizer: {
      name: "",
      phoneNumber: 0,
      email: "",
    },
    images: [],
    verified: false,
    rating: [],
  });
  const [newEventDetails, setNewEventDetails] = useState<Event>(event);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchEventDetails() {
      setLoading(true);
      try {
        const response = await getEvent(id || "");
        setEvent(response.data);
        setNewEventDetails(response.data);
        setSelectedImage(response.data.images[0]);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchEventDetails();
  }, [id]);

  async function updateEventDetails() {
    try {
      setLoading(true);
      const response = await updateEvent({ ...newEventDetails });
      setEvent(response.data);
      toast({
        title: "Success",
        description: response.message,
        variant: "default",
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader className="w-6 h-6 animate-spin" />;
  }

  return (
    <div className="mt-10 container mx-auto">
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event Details</h1>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="default">Edit Details</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Event Details</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="space-y-4 mt-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      value={newEventDetails.name}
                      onChange={(e) =>
                        setNewEventDetails({
                          ...newEventDetails,
                          name: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={newEventDetails.description}
                      onChange={(e) =>
                        setNewEventDetails({
                          ...newEventDetails,
                          description: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <Input
                      id="price"
                      type="number"
                      value={newEventDetails.price}
                      onChange={(e) =>
                        setNewEventDetails({
                          ...newEventDetails,
                          price: Number(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={updateEventDetails} disabled={loading}>
                {loading ? (
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {event.images.length > 0 ? (
          <div>
            <div className="w-full h-[400px] relative mb-4">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt={event.name}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {event.images.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt={`Event image ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                    selectedImage === item ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(item)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center text-3xl text-center">
            No images found
            <Button onClick={() => {}}>Add Images</Button>
          </div>
        )}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{event.name}</h2>
          <p>{event.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>{event.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">Price</h3>
              <p>₹{event.price}</p>
            </div>
            <div>
              <h3 className="font-semibold">Date</h3>
              {/* <p>{format(new Date(event.dateAndTime.start), "PPP")}</p> */}
            </div>
            <div>
              <h3 className="font-semibold">Time</h3>
              <p>
                {/* {format(new Date(event.dateAndTime.start), "p")} -{" "} */}
                {/* {format(new Date(event.dateAndTime.end), "p")} */}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Capacity</h3>
              <p>{event.capacity}</p>
            </div>
            <div>
              <h3 className="font-semibold">Booked</h3>
              <p>{event.bookedUsers.length}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Address</h3>
            <p>
              {event.address.street}, {event.address.city},{" "}
              {event.address.state} - {event.address.pincode}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Organizer</h3>
            <p>{event.organizer.name}</p>
            <p>{event.organizer.email}</p>
            <p>{event.organizer.phoneNumber}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Bookings</h3>
        <div className="flex flex-col gap-4">No Bookings found</div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Ratings</h3>
        <div className="flex flex-col gap-4">No Ratings found</div>
      </div>
    </div>
  );
}
