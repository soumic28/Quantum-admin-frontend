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
import { createCategory, getCategories } from "../../api/category";
import { Category } from "../../interfaces";
import CategoryList from "./CategoryList";
import { Heading } from "../Heading";
import { useToast } from "../../ui/use-toast";

export function CategoryPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<Category[]>([]);
  const {toast} = useToast();
  
  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      name,
      description,
      image,
    };
    const response = await createCategory(data);
    toast({
        title:"success",
        description:response.message
    })
    setCategory([...category, response.data]);
    setOpen(false);
    setLoading(false);
  };
  
  async function fetchCategories(){
    try{
        setLoading(true);
        const response = await getCategories();
        setCategory(response?.data);
        setLoading(false);
    }catch(error:any){
        toast({
            title:"Error",
            description:error.message,
            variant:"destructive"
        })
    }
  }
    useEffect(()=>{
        fetchCategories();
    },[])

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-5">
        <Heading label="Categories"/>
        <div>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="relative flex items-center rounded-lg text-md px-4 py-2 bg-orange-800 hover:bg-accent cursor-pointer">
              Add Category
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-2">
                  Add Category details
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
                    placeholder="Write something about this Category"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <h1>Add reference Image</h1>
                  {image === "" ? (
                    <UploadImage
                      folder={"category"}
                      id={"category"}
                      setKey={setImage}
                    />
                  ) : (
                    <div>
                      <img src={image} alt="category" className="w-40 h-40" />
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
      <CategoryList category={category} setCategory={setCategory}/>
    </div>
  );
}
