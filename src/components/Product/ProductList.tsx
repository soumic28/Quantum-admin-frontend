import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../ui/dataTableColumnHeader"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/DropdownMenu";
import { IoMdMore } from "react-icons/io";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/AlertBox";
import { Button, Input, Loader } from "../../ui";
import { useToast } from "../../ui/use-toast";
import { Product } from '../../interfaces'
import { DataTable } from "../../ui/DataTable";
import { deleteProduct, updateProduct, updateStock } from "../../api/product";
import { useNavigate } from "react-router-dom";
import { LucideArrowUpRight } from "lucide-react";
interface Props{
  itemsList:Product[];
  setProducts:React.Dispatch<React.SetStateAction<Product[]>>;
}

function ProductList({itemsList,setProducts}: Props) {
  const navigate=useNavigate();
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product-Id" />
      ),
      cell: ({ row }) => {
          const value = row.getValue("_id")?.toString();
          const sliced = value?.slice(0,5) 
          return(
              <div className="w-[75px]">PID-{sliced}</div>
          )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const product= row.original;
          return(
            <div className="flex w-44 hover:underline truncate group cursor-pointer items-center" onClick={() => navigate(`/product/${product._id}`)}>
              <div>{product.name}</div>
              <div className="ml-1 underline hidden group-hover:block transition-all duration-300 ease-in-out" >
                  <LucideArrowUpRight className="ml-1" size={16} />
              </div>
            </div>
          )
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
  
        return (
          <div className="flex space-x-2">
            <span className="max-w-[450px] truncate font-medium">
              {row.getValue("description")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="stock" />
      ),
      cell: ({ row }) => {
        
        return (
          <div className="flex w-[100px] items-center">
            <span>{row.getValue("stock")}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "brand",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="brand" />
      ),
      cell: ({ row }) => {
  
        return (
          <div className="flex items-center">
            {row.getValue("brand")}
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      header:"Actions",
      cell: ({row}) =>  {
        const product = row.original;
        const [loading,setLoading] = useState<boolean>(false);
        const [stock,setStock] = useState<number>(0);
        const [open, setOpen] = useState(false);
        const [openDelete, setOpenDelete] = useState(false);
        const [openStock, setOpenStock] = useState(false);
        const { register, handleSubmit } = useForm({
          defaultValues: {
            name: product.name,
            description: product.description,
            price:product.price,
            brand:product.brand,
            discountPercent:product.discountPercent
          }
        });
        const {toast} =useToast();

        const handleUpdate = async (data) => {
          try {
            setLoading(true);
            const response = await updateProduct(product._id || "",data);
            console.log(response.data);
            setProducts(itemsList.map(item=> item._id == product._id ? response.data : item ))
            toast({
              title: 'Success',
              description: response.message,
              variant: 'default',
            });
            setOpen(false);
            setLoading(false);
          } catch (error) {
            toast({
              title: 'Error',
              description: error.message,
              variant: 'destructive',
            });
            setLoading(false);
          }
        };
  
        const handleDelete = async () => {
          try {
            setLoading(true);
            const response = await deleteProduct(product._id || "");
            setProducts(()=>itemsList.filter(item=>item._id != product._id));
            toast({
              title: 'Success',
              description: response.message,
              variant: 'default',
            });
            setOpenDelete(false);
            setLoading(false);
          } catch (error) {
            toast({
              title: 'Error',
              description: error.message,
              variant: 'destructive',
            });
            setLoading(false);
          }
        };
  
        const handleUpdateStock = async () => {
          try {
            setLoading(true);
            const response = await updateStock(product._id,stock);
            setProducts((prev)=>prev.map(item=>(item._id == product._id?{...item,stock:stock+item.stock}:item)))
            toast({
              title: 'Success',
              description:response.message,
              variant: 'default',
            });
            setOpenStock(false);
            setLoading(false);
          } catch (error) {
            toast({
              title: 'Error',
              description: error.message,
              variant: 'destructive',
            });
            setLoading(false);
          }
        };
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
                                        <AlertDialogTitle className='mb-2'>Update Product Details</AlertDialogTitle>
                                        <AlertDialogDescription className='space-y-2'>
                                            <h1>Name</h1>
                                            <Input id="name" placeholder="Enter Name" type="text" {...register("name")} />
                                            <h1>Description</h1>
                                            <Input type="text" placeholder="Enter Description" {...register("description")}  />
                                            <h1>Brand</h1>                                          
                                            <Input id="brand" placeholder="Enter Brand" type="text" {...register("brand")} />
                                            <h1>Price</h1>
                                            <Input id="price" placeholder="Enter Price" type="number" {...register("price",{valueAsNumber:true})} />
                                            <h1>Discount Percent</h1>
                                            <Input id="discountPercent" placeholder="Discount Percent" type="number" {...register("discountPercent",{valueAsNumber:true})} />
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <Button variant="destructive" onClick={handleSubmit(handleUpdate)}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
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
                                        <Button variant="destructive" onClick={handleDelete}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:bg-accent hover:cursor-pointer">
                            <AlertDialog open={openStock} onOpenChange={setOpenStock}>
                                <AlertDialogTrigger className="relative flex items-center w-32 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent cursor-pointer">
                                    Add Stock
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Add Stock</AlertDialogTitle>
                                        <AlertDialogDescription className='space-y-2'>
                                            <h1>Quantity</h1>
                                            <Input id="stock" placeholder="Enter stock" type="number" onChange={(e)=>setStock(parseInt(e.target.value))} />
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <Button variant="destructive" onClick={handleUpdateStock}>{loading ? <Loader /> : <h1>Continue</h1>}</Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
      }
    },
  ]
  return (
    <div>
      <DataTable columns={columns} data={itemsList} tableFilterColumn="name" facetFilter={true}/>
    </div>
  );
}

export default ProductList;
