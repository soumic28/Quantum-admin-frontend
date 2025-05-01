import { useEffect, useState } from "react";
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
import { createSport, getSports } from "../../api/sports";
import { Sport } from "../../interfaces/Sport";
import SportList from "./SportList";
import { Heading } from "../Heading";
import { useToast } from "../../ui/use-toast";

export function Sports() {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [sports, setSports] = useState<Sport[]>([]);
  const [open,setOpen]=useState(false);
  const {toast} = useToast();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await createSport({name,description,image});
      console.log(response);
      setSports([...sports, response.data]);
      toast({
        title:"success",
        description:response.message,
        variant:"default"
      })
      setOpen(false);
      setLoading(false);
    } catch (error:any) {
      toast({
        title:"Error",
        description:error.message,
        variant:"default"
      })
    }
  };
  async function fetchSports(){
    try{
        setLoading(true);
        const response = await getSports();
        setSports(response?.data);
        setLoading(false);
    }catch(error){
        console.error('Error during GET request:', error);
    }
  }
  useEffect(()=>{
      fetchSports();
  },[])

  
  return (
    <div>
      <div className="flex flex-row justify-between items-center m-5">
        <Heading label="Sports"/>
        <div>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="relative flex items-center rounded-lg text-md px-4 py-2 bg-orange-800 hover:bg-accent cursor-pointer">
              Add Sport
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-2">
                  Add Sport details
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
                  <h1>Add reference Image</h1>
                  {image === "" ? (
                    <UploadImage
                      folder={"sports"}
                      id={"sport"}
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
      </div>
      <SportList sports={sports} setSports={setSports}/>
    </div>
  );
}
