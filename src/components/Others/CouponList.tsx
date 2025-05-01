import { ColumnDef } from "@tanstack/react-table";
import { Coupon } from "../../interfaces";
import { IoMdMore } from "react-icons/io";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/DropdownMenu";
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
import { Button, Input, Loader } from "../../ui";
import { deleteCoupon, updateCoupon } from "../../api/coupon";
import { DataTable } from "../../ui/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { toast } from "../../ui/use-toast";

interface CouponListProps {
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
}
function CouponList({ coupons, setCoupons }: CouponListProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const columns: ColumnDef<Coupon>[] = [
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => {
        const coupon = row.original;
        return (
          <div className="flex w-44 hover:underline truncate group cursor-pointer items-center">
            <div>{coupon.code}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "discountPercent",
      header: "Discount Percent",
      cell: ({ row }) => {
        const coupon = row.original;
        return (
          <div className="flex hover:underline truncate group cursor-pointer items-center">
            <div>{coupon.discountPercent}</div>
          </div>
        );
      },
    },
    {
      //Todo: add badge green : red for valid, inValid
      accessorKey: "validTill",
      header: "Status",
      cell: ({ row }) => {
        const coupon = row.original;
        const valid = new Date(coupon.validTill) > new Date();
        return (
          <div className="flex w-20  truncate group cursor-pointer items-center">
            {valid ? "Valid" : "InValid"}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const coupon = row.original;
        return (
          <div className="flex w-20  truncate group cursor-pointer items-center">
            {coupon.type}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Action",
      cell: ({ row }) => {
        const coupon = row.original;
        const [code, setCode] = useState(coupon.code);
        const [discountPercent, setDiscountPercent] = useState(
          coupon.discountPercent
        );
        const [validTill, setValidTill] = useState(coupon.validTill);
        const [type, setType] = useState(coupon.type);
        const [open, setOpen] = useState(false);
        const [openDelete, setOpenDelete] = useState(false);
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IoMdMore size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  asChild
                  className="hover:bg-accent hover:cursor-pointer"
                >
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger className="relative flex items-center w-32 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent cursor-pointer">
                      Update
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="mb-2">
                          Update Sport Name
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                          <h1>Code</h1>
                          <Input
                            type="text"
                            placeholder="Enter Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                          />
                          <h1>Discount Percent</h1>
                          <Input
                            type="number"
                            placeholder="Enter Discount Percent"
                            value={discountPercent}
                            onChange={(e) =>
                              setDiscountPercent(parseInt(e.target.value))
                            }
                          />
                          <h1>Valid Till</h1>
                          <Input
                            type="date"
                            value={validTill.slice(0, 10)}
                            onChange={(e) => setValidTill(e.target.value)}
                          />
                          <h1>Type</h1>
                          <Select
                            onValueChange={(value) => {
                              console.log(value);
                              setType(value);
                            }}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="product">Product</SelectItem>
                              <SelectItem value="turf">Turf</SelectItem>
                            </SelectContent>
                          </Select>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          variant="destructive"
                          onClick={async () => {
                            try {
                              setLoading(true);
                              const { data } = await updateCoupon(
                                coupon._id || "",
                                {
                                  code,
                                  discountPercent,
                                  validTill,
                                  type,
                                }
                              );
                              setCoupons((prev) =>
                                prev.map((item) =>
                                  item._id == data._id ? data : item
                                )
                              );
                              toast({
                                title:"Success",
                                description:"Coupon updated successfully"
                              })
                              setOpen(false);
                              setLoading(false);
                            } catch (error: any) {
                              toast({
                                title: "Error",
                                description: error.message,
                                variant:"destructive"
                              });
                              setLoading(false);
                            }
                          }}
                        >
                          {loading ? <Loader /> : <h1>Continue</h1>}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="hover:bg-accent hover:cursor-pointer"
                >
                  <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                    <AlertDialogTrigger className="relative flex items-center w-32 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent cursor-pointer">
                      Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          variant="destructive"
                          onClick={async () => {
                            try {
                              setLoading(true);
                              await deleteCoupon(coupon._id as string);
                              setCoupons((prev) =>
                                prev.filter((item) => item._id !== coupon._id)
                              );
                              toast({
                                title:"Success",
                                description:"Coupon deleted successfully"
                              })
                              setOpenDelete(false);
                              setLoading(false);
                            } catch (error: any) {
                                toast({
                                    title: "Error",
                                    description: error.message,
                                    variant: "destructive",
                                });
                                setLoading(false);
                            }
                          }}
                        >
                          {loading ? <Loader /> : <h1>Continue</h1>}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {loading ? (
        <div className="h-[calc(100vh-10rem)] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <DataTable
            data={coupons ? coupons : []}
            columns={columns}
            tableFilterColumn="code"
            facetFilter={false}
          />
        </div>
      )}
    </div>
  );
}

export default CouponList;
