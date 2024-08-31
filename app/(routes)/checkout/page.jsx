"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const router = useRouter();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  const [subtotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItem(cartItemList_.length);
    setCartItemList(cartItemList_);
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total += element.amount;
    });

    const calculatedSubtotal = total.toFixed(2);
    const extraAmount = total * 0.09 + 15;
    const calculatedTotalAmount = Number(total) + Number(extraAmount);

    setSubTotal(calculatedSubtotal);
    setTotalAmount(calculatedTotalAmount.toFixed(2));
  }, [cartItemList]);

  const onApprove = (data) => {
    console.log(data);
    const payLoad = {
      data: {
        paymentId: data.paymentId.toString(),
        totalOrderAmount: totalAmount,
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        orderItemList: cartItemList,
        userId: user.id,
      },
    };
    GlobalApi.createOrder(payLoad, jwt).then((resp) => {
      console.log(resp);
      toast("Order Placed Successfully.");
      cartItemList.forEach((item) => {
        GlobalApi.deleteCartItem(item.id, jwt).then((resp) => {});
      });
      router.replace("/order-confirmation");
    });
  };

  return (
    <div>
      <h2 className="p-2 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              type="text"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              type="text"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Zip"
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 my-10 md:my-0 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal : <span>${subtotal}</span>
            </h2>
            <hr></hr>
            <h2 className="flex justify-between">
              Delivery : <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%) : <span>${(subtotal * 0.09).toFixed(2)}</span>
            </h2>
            <hr></hr>
            <h2 className="font-bold flex justify-between">
              Total : <span>${totalAmount}</span>
            </h2>

            {/* <Button onClick={() => onApprove({ paymentId: 123 })}>
              <ArrowRight /> Payment
            </Button> */}
            {/* Render PayPal buttons only if totalAmount is calculated */}
            {totalAmount > 15 && (
              <PayPalButtons
                disabled={!(username && email && address && zip)}
                style={{ layout: "horizontal" }}
                onApprove={onApprove}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount, // Ensure the correct total amount is passed
                          currency_code: "USD", // Change currency code if needed
                        },
                      },
                    ],
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
