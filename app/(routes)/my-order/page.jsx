"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./_component/MyOrderItem";

const MyOrder = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const router = useRouter();
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getMyOrder();
  }, []);

  const getMyOrder = async () => {
    const orderList_ = await GlobalApi.getMyOrder(jwt, user.id);
    console.log(orderList_);
    setOrderList(orderList_);
  };
  return (
    <div>
      <h2 className="p-2 bg-primary text-xl font-bold text-center text-white">
        My Order
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
        <div>
          {orderList.map((item, index) => (
            <Collapsible>
              <CollapsibleTrigger>
                <div className="border p-2 bg-slate-100 flex justify-evenly gap-24">
                  <h2>
                    <span className="font-bold mr-2">Order Date: </span>
                    {moment(item?.createdAt).format("DD/MMM/YYYY")}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Total Amount:</span>{" "}
                    {item.totalOrderAmount}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Status: </span>
                    {item.status}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orderItemList.map((order, index_) => (
                  <MyOrderItem orderItem={order} key={index_} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
