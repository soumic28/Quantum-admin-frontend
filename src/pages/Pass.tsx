"use client";
import { useQuery } from "@tanstack/react-query";
import { getPasses, createOrder } from "../api/pass";
import { useState } from "react";

export default function PassPage() {
  const {
    data: passes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["passes"],
    queryFn: getPasses,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading passes</p>;

  const handlePayment = async (passId: string) => {
    try {
      setIsProcessing(true);
      const { data } = await createOrder(passId);
      const options = data.options; // Razorpay options

      const razorpay = new (window as any).Razorpay({
        ...options,
        handler: function (response: any) {
          alert(
            `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
          );
          // Here you can call an API to confirm payment in the backend
        },
        prefill: {
          email: options.prefill.email,
          contact: options.prefill.contact,
        },
        theme: { color: "#3399cc" },
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex my-6">
        <h1 className="text-3xl">Passes</h1>
      </div>
      <div className="flex flex-col">
        {Array.isArray(passes?.data) && passes.data.map((pass: any, index: number) => (
          <div
            key={index}
            className="border rounded-lg p-2 mx-2 my-4 py-6 px-4 grid grid-cols-5"
          >
            <div className="col-span-4">
              <h1 className="text-2xl mb-3 flex gap-3 items-center">
                {pass.name}
                <span className="text-xs border rounded px-2 py-1 capitalize">
                  {pass.type}
                </span>
              </h1>
              <p>{pass.description}</p>
            </div>
            <div className="col-span-1 space-y-2">
              <p>Price: ₹{pass.price}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handlePayment(pass._id)}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Buy Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
