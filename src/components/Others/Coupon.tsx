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
import { createCoupon, getCoupons } from "../../api/coupon";
import { Coupon } from "../../interfaces";
import CouponList from "./CouponList";
import { Heading } from "../Heading";
import { useToast } from "../../ui/use-toast";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export function CouponPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [validTill, setValidTill] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { toast } = useToast();
  async function handleSubmit() {
    try {
      setLoading(true);
      const data = {
        code,
        discountPercent,
        validTill,
        type,
      };
      const response = await createCoupon(data);
      setCoupons([...coupons, response.data]);
      toast({
        title: "success",
        description: "New coupon created successfully",
      });
      setOpen(false);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  }
  async function fetchCoupons() {
    try {
      setLoading(true);
      const response = await getCoupons();
      setCoupons(response?.data);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }
  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-5">
        <Heading label="Coupon" />
        <div>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="relative flex items-center rounded-lg text-md px-4 py-2 bg-orange-800 hover:bg-accent cursor-pointer">
              Add Coupon
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="mb-2">
                  Add Coupon Details
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <h1>Code</h1>
                  <Input
                    type="text"
                    placeholder="Enter Code"
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <h1>Discount Percent</h1>
                  <Input
                    type="number"
                    placeholder="Discount Percentage ex. 5 , 10"
                    onChange={(e) =>
                      setDiscountPercent(parseInt(e.target.value))
                    }
                  />
                  <h1>Valid Till</h1>
                  <Input
                    type="date"
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
                <Button variant="destructive" onClick={handleSubmit}>
                  {loading ? <Loader /> : <h1>Continue</h1>}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <CouponList coupons={coupons} setCoupons={setCoupons} />
    </div>
  );
}
