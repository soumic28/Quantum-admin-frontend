import { ColumnDef } from "@tanstack/react-table";
import { IoMdMore } from "react-icons/io";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/DropdownMenu";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/AlertBox";
import { Button, Input, Loader } from "../../ui";
import { DataTable } from "../../ui/DataTable";
import { deleteFacility, updateFacility } from "../../api/facilities";
import { Facility } from "../../interfaces/Facility";
import { UploadImage } from "../UploadImage";
import { useToast } from "../../ui/use-toast";

interface facilityListProps{
    facilities:Facility[];
    setFacilities:React.Dispatch<React.SetStateAction<Facility[]>>
}

function FacilityList({facilities,setFacilities}:facilityListProps){
    const [loading,setLoading] = useState<boolean>(false);
    const {toast} =useToast();
    
    
    const columns: ColumnDef<Facility>[] = [
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
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex hover:underline truncate group cursor-pointer items-center">
                        <div>{String(user.price)}</div>
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
                        <img src={user.image} alt={user.name} className="w-10 h-10 bg-white"/>
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
                const [price,setPrice]=useState(user.price);
                const [image,setImage]=useState(user.image);
                const [open, setOpen] = useState<boolean>(false);
                const [openDelete, setOpenDelete] = useState<boolean>(false);
                async function handleUpdateFacility(){
                    try {
                        setLoading(true);
                        const response = await updateFacility(user._id || "",{name,description,image,price})
                        setFacilities(prev => prev.map(facility => 
                            facility._id === user._id ? { ...facility, name, description, image, price } : facility
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

                async function handleDeleteFacility(){
                    try {
                        setLoading(true);
                        await deleteFacility(user._id as string);
                        setFacilities((prev)=>{
                            return prev.filter((facility)=>facility._id!==user._id);
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
                                                <AlertDialogTitle className='mb-2'>Update Facility Name</AlertDialogTitle>
                                                <AlertDialogDescription className='space-y-2'>
                                                    <h1>Name</h1>
                                                    <Input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                    <h1>Description</h1>
                                                    <Input type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                                    <h1>Price</h1>
                                                    <Input type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value as unknown as number)} />
                                                    <h1>Reference Image</h1>
                                                    <div className="flex gap-4">
                                                        <UploadImage folder="facility" id="facility" setKey={setImage}/>
                                                        <img src={image} alt={user.name} className="w-40 h-40 inline ml-5 border"/>
                                                    </div>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <Button variant="destructive" onClick={handleUpdateFacility}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
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
                                                <Button variant="destructive" onClick={handleDeleteFacility}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
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
                            data={facilities ? facilities : []}
                            columns={columns}
                            tableFilterColumn="name"
                            facetFilter={false}
                        />
                    </div>
            }
        </div>
    )
}

export default FacilityList;