import { ColumnDef } from "@tanstack/react-table";
import { Category } from "../../interfaces";
import { IoMdMore } from "react-icons/io";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/DropdownMenu";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/AlertBox";
import { Button, Input, Loader } from "../../ui";
import { deleteCategory,updateCategory ,toggleCategoryStatus } from "../../api/category";
import { DataTable } from "../../ui/DataTable";
import { UploadImage } from "../UploadImage";
import { useToast } from "../../ui/use-toast";

interface CategoryListProps{
    category:Category[],
    setCategory:React.Dispatch<React.SetStateAction<Category[]>>
}

function CategoryList({category,setCategory}:CategoryListProps){
    const [loading,setLoading] = useState<boolean>(false);
    const {toast} = useToast();
    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex w-44 hover:underline truncate group cursor-pointer items-center">
                        <div>{user.name}</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex hover:underline truncate group cursor-pointer items-center">
                        <div>{user.description}</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex w-20  truncate group cursor-pointer items-center">
                        <img src={user.image} alt={user.name} className="w-10 h-10"/>
                    </div>
                );
            }
        },
        {
            //Todo:add different badge Active or inActive
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex w-20  truncate group cursor-pointer items-center capitalize">
                        <div>{user.status}</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "createdAt",
            header: "Action",
            cell: ({ row }) => {
                const user = row.original;
                const [name, setName] = useState(user.name);
                const [description,setDescription]=useState(user.description);
                const [image,setImage]=useState(user.image);
                const [open, setOpen] = useState(false);
                const [openDelete, setOpenDelete] = useState(false);

                return (
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <IoMdMore size={20} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild className="hover:bg-accent hover:cursor-pointer">
                                    <AlertDialog open={open} onOpenChange={setOpen}>
                                        <AlertDialogTrigger className="relative flex items-center w-32 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent cursor-pointer">
                                            Update
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className='mb-2'>Update Sport Name</AlertDialogTitle>
                                                <AlertDialogDescription className='space-y-2'>
                                                    <h1>Name</h1>
                                                    <Input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                    <h1>Description</h1>
                                                    <Input type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                    <h1>Reference Image</h1>
                                                    <UploadImage folder={"category"} id={"category"} setKey={setImage}/>
                                                    <img src={image} alt={user.name} className="w-20 h-20"/>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <Button variant="destructive" onClick={async () => {
                                                    try{
                                                        setLoading(true);
                                                        const {data} = await updateCategory(user._id || "",{name,description,image});
                                                        setCategory((prev)=>prev.map(item=> item._id == data.id ? data: item ))
                                                        toast({
                                                            title:"Success",
                                                            description:"Data Updated successfully",
                                                            variant:"default"
                                                        })
                                                        setOpen(false);
                                                        setLoading(false);
                                                    } catch(error:any){
                                                        toast({
                                                            title:"Error",
                                                            description:error.message,
                                                            variant:"destructive"
                                                        })
                                                    }
                                                }}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="hover:bg-accent hover:cursor-pointer">
                                    <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                                        <AlertDialogTrigger className="relative flex items-center w-32 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent cursor-pointer">
                                            Delete
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <Button variant="destructive" onClick={async () => {
                                                    try{
                                                        setLoading(true);
                                                        await deleteCategory(user._id as string);
                                                        toast({
                                                            title:"Success",
                                                            description:"Data deleted successfully",
                                                            variant:"default"
                                                        })
                                                        setCategory((prev)=>prev.filter(item=> item._id != user._id))
                                                        setOpen(false);
                                                        setLoading(false);
                                                    } catch(error:any){
                                                        toast({
                                                            title:"Error",
                                                            description:error.message,
                                                            variant:"destructive"
                                                        })
                                                    }
                                                }}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="hover:bg-accent hover:cursor-pointer">
                                    <AlertDialog>
                                        <AlertDialogTrigger className="relative flex items-center w-32 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent cursor-pointer">
                                            Status
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Change the status of this Category
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <Button variant="destructive" onClick={async () => {
                                                    try{
                                                        setLoading(true);
                                                        const response = await toggleCategoryStatus(user._id || "");
                                                        toast({
                                                            title:"Success",
                                                            description:response.message,
                                                            variant:"default"
                                                        })
                                                        
                                                        setLoading(false);
                                                    } catch(error:any){
                                                        toast({
                                                            title:"Error",
                                                            description:error.message,
                                                            variant:"destructive"
                                                        })
                                                    }
                                                }}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ];


    return (
        <div>
            {
                loading ?
                    <div className='h-[calc(100vh-10rem)] flex justify-center items-center'>
                        <Loader />
                    </div>
                    : <div>
                        <DataTable
                            data={category ? category : []}
                            columns={columns}
                            tableFilterColumn="name"
                            facetFilter={false}
                        />
                    </div>
            }
        </div>
    )
}

export default CategoryList