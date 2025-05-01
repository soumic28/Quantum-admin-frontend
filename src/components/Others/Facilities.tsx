import { useEffect, useState } from "react";
import { Facility } from "../../interfaces/Facility";
import FacilityList from "./FacilityList";
import { Button, Input, Loader } from "../../ui";
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
import { UploadImage } from "../UploadImage";
import { createFacility, getFacilities } from "../../api/facilities";
import { Heading } from "../Heading";

export function Facilities() {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        name,
        description,
        image,
        price,
      };
      const response = await createFacility(data);
      setFacilities([...facilities, response.data]);
      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.log("error while adding facility", error);
    }
  };
  async function fetchFacilities() {
    try {
      setLoading(true);
      const response = await getFacilities();
      setFacilities(response?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error during GET request:", error);
    }
  }
  useEffect(() => {
    fetchFacilities();
  }, []);
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center m-5">
        <Heading label="Facilities" />
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger className="relative flex items-center rounded-lg text-md px-4 py-2 bg-orange-800 hover:bg-accent cursor-pointer">
            Add Facility
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-2">
                Add Facility details
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <h1>Name</h1>
                <Input
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <h1>Short Description</h1>
                <Input
                  type="text"
                  placeholder="Write something about this sport"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <h1>Additional Price</h1>
                <Input
                  type="number"
                  placeholder="Enter Additional Price"
                  onChange={(e) =>
                    setPrice(e.target.value as unknown as number)
                  }
                />
                <h1>Add reference Image</h1>
                {image === "" ? (
                  <UploadImage
                    folder={"facility"}
                    id={"facility"}
                    setKey={setImage}
                  />
                ) : (
                  <div>
                    <img src={image} alt="sport" className="w-40 h-40" />
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant="destructive" onClick={handleSubmit}>
                {loading ? <Loader /> : <h1>Continue</h1>}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <FacilityList facilities={facilities} setFacilities={setFacilities}/>
    </div>
  );
}
