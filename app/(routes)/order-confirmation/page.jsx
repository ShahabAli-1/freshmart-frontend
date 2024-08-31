import { CheckCircle, CheckCircle2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const OrderConfirmation = () => {
  return (
    <div className="flex justify-center my-20">
      <div className="border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32">
        <CheckCircle2 className="h-24 w-24 text-primary" />
        <h2 className="font-medium text-3xl text-primary">Order Success</h2>
        <h2>Thank You for Your Order</h2>
        <Link href={"/my-order"}>
          <Button classname="mt-8">Track Your Order</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
