import { ColumnDef } from "@tanstack/react-table";
import { Sport } from "../../interfaces/Sport";
import { IoMdMore } from "react-icons/io";
import {  useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/DropdownMenu";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/AlertBox";
import { Button, Input, Loader } from "../../ui";
import { deleteSport, updateSport } from "../../api/sports";
import { DataTable } from "../../ui/DataTable";
import { useToast } from "../../ui/use-toast";
import { UploadImage } from "../UploadImage";
interface sportListProps{
    sports:Sport[];
    setSports:React.Dispatch<React.SetStateAction<Sport[]>>
}


function SportList({sports,setSports}:sportListProps){
    const [loading,setLoading] = useState<boolean>(false);

    const columns: ColumnDef<Sport>[] = [
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
            accessorKey: "updated_at",
            header: "Action",
            cell: ({ row }) => {
                const user = row.original;
                const [name, setName] = useState(user.name);
                const [description,setDescription]=useState(user.description);
                const [image,setImage]=useState(user.image);
                const {toast} = useToast();
                const [open, setOpen] = useState(false);
                const [openDelete, setOpenDelete] = useState(false);
                async function handleUpdateSports(){
                    try {
                        setLoading(true);
                        const response = await updateSport(user._id || "",{name,description,image})
                        setSports(prev => prev.map(sport => 
                            sport._id === user._id ? { ...sport, name, description, image } : sport
                        ));
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
                            variant:"destructive"
                        })
                    }
                }

                async function handleDeleteSports(){
                    try {
                        setLoading(true);
                        await deleteSport(user._id as string);
                        setSports((prev)=>{
                            return prev.filter((sport)=>sport._id!==user._id);
                        });
                        toast({
                            title:"success",
                            description:"Facility deleted successful",
                            variant:"default"
                        })
                        setOpenDelete(false);
                        setLoading(false);
                    } catch (error:any) {
                        toast({
                            title:"Error",
                            description:error.message,
                            variant:"destructive"
                        })
                    }
                }
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
                                                    <div className="flex gap-4">
                                                        <UploadImage folder="sports" id="sport" setKey={setImage}/>
                                                        <img src={image} alt={user.name} className="w-40 h-40 inline ml-5 border"/>
                                                    </div>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <Button variant="destructive" onClick={handleUpdateSports}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
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
                                                <Button variant="destructive" onClick={handleDeleteSports}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
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
                            data={sports ? sports : []}
                            columns={columns}
                            tableFilterColumn="name"
                            facetFilter={false}
                        />
                    </div>
            }
        </div>
    )
}

export default SportList