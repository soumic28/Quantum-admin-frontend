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
import { Turf } from "../../interfaces";
// You'll need to create these API functions
import { getTurf, updateTurf } from "../../api/turf";

export function TurfDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [turf, setTurf] = useState<Turf>({
    _id: id || "",
    name: "",
    description: "",
    contact: "",
    location: "",
    address: {
      city: "",
      state: "",
      street: "",
      pincode: 0,
    },
    sports: [],
    facilities: [],
    bookings: [],
    status: "",
    price: 0,
    images: [],
    verified: false,
    rating: [],
    createdAt: "",
    updatedAt: "",
  });
  const [newTurfDetails, setNewTurfDetails] = useState<Turf>(turf);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchTurfDetails() {
      setLoading(true);
      try {
        const response = await getTurf(id || "");
        setTurf(response.data.turf);
        setNewTurfDetails(response.data.turf);
        setSelectedImage(response.data.turf.images[0]);
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
    fetchTurfDetails();
  }, [id]);

  async function updateTurfDetails() {
    try {
      setLoading(true);
      const response = await updateTurf(id || "", { ...newTurfDetails });
      setTurf(response.data);
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
        <h1 className="text-3xl font-bold">Turf Details</h1>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="default">Edit Details</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Turf Details</AlertDialogTitle>
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
                      value={newTurfDetails.name}
                      onChange={(e) =>
                        setNewTurfDetails({
                          ...newTurfDetails,
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
                      value={newTurfDetails.description}
                      onChange={(e) =>
                        setNewTurfDetails({
                          ...newTurfDetails,
                          description: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <Input
                      id="location"
                      value={newTurfDetails.location}
                      onChange={(e) =>
                        setNewTurfDetails({
                          ...newTurfDetails,
                          location: e.target.value,
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
                      value={newTurfDetails.price}
                      onChange={(e) =>
                        setNewTurfDetails({
                          ...newTurfDetails,
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
              <Button onClick={updateTurfDetails} disabled={loading}>
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
        <div>
          <div className="w-full h-[400px] relative mb-4">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={turf.name}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {turf.images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={`Turf image ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                  selectedImage === item ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(item)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{turf.name}</h2>
          <p>{turf.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>{turf.location}</p>
            </div>
            <div>
              <h3 className="font-semibold">Price</h3>
              <p>₹{turf.price}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{turf.status}</p>
            </div>
            <div>
              <h3 className="font-semibold">Verified</h3>
              <p>{turf.verified ? "Yes" : "No"}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Address</h3>
            <p>
              {turf.address.street}, {turf.address.city}, {turf.address.state} -{" "}
              {turf.address.pincode}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Sports</h3>
            <ul className="list-disc list-inside">
              {turf.sports.map((sport, index) => (
                <li key={index}>{sport.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Facilities</h3>
            <ul className="list-disc list-inside">
              {turf.facilities.map((facility, index) => (
                <li key={index}>{facility.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Created At</h3>
            {/* <p>{format(new Date(turf.createdAt), 'PPP')}</p> */}
          </div>
          <div>
            <h3 className="font-semibold">Updated At</h3>
            {/* <p>{format(new Date(turf.updatedAt), 'PPP')}</p> */}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Bookings</h3>
        {turf.bookings.length > 0 ? (
          <ul className="space-y-2">
            {turf.bookings.map((booking, index) => (
              <li key={index}>
                {/* Display booking information here */}
                Booking {index + 1}: {JSON.stringify(booking)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings yet.</p>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Ratings</h3>
        {turf.rating.length > 0 ? (
          <ul className="space-y-2">
            {turf.rating.map((rating, index) => (
              <li key={index}>
                {/* Display rating information here */}
                Rating {index + 1}: {JSON.stringify(rating)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ratings yet.</p>
        )}
      </div>
    </div>
  );
}
