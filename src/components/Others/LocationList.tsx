import { ColumnDef } from "@tanstack/react-table";
import { IoMdMore } from "react-icons/io";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/DropdownMenu";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/AlertBox";
import { Button, Loader } from "../../ui";
import { DataTable } from "../../ui/DataTable";
import { deleteLocation } from "../../api/location";
import { Location } from "../../interfaces/Location";

interface props{
    locationList:any;
    setLocationList:(locationList:any)=>void;
}

export default function LocationList({locationList,setLocationList}:props){
    const [loading,setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const columns: ColumnDef<Location>[] = [
        {
            accessorKey: "_id",
            header: "ID",
            cell: ({ row }) => {
                const location = row.original;
                return (
                    <div className="flex w-44 hover:underline truncate group cursor-pointer items-center">
                        <div>{location._id}</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "state",
            header: "State",
            cell: ({ row }) => {
                const location = row.original;
                return (
                    <div className="flex w-44 hover:underline truncate group cursor-pointer items-center">
                        <div>{location.state}</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "city",
            header: "City",
            cell: ({ row }) => {
                const location = row.original;
                return (
                    <div className="flex hover:underline truncate group cursor-pointer items-center">
                        <div>{location.city}</div>
                    </div>
                );
            }
        },
        {
            accessorKey: "updated_at",
            header: "Action",
            cell: ({ row }) => {
                
                return (
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <IoMdMore size={20} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild className="hover:bg-accent hover:cursor-pointer">
                                    <AlertDialog onOpenChange={setOpen} open={open}>
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
                                                    setLoading(true);
                                                    await deleteLocation(row.getValue("_id"));
                                                    setLocationList((prev:Location[])=> prev.filter(item=> item._id !== row.getValue("_id")))
                                                    setOpen(false);
                                                    setLoading(false);
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
                            data={locationList ? locationList : []}
                            columns={columns}
                            tableFilterColumn="state"
                            facetFilter={false}
                        />
                    </div>
            }
        </div>
    )
}