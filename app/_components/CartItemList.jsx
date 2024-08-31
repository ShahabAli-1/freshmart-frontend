import { TrashIcon, LoaderCircle } from "lucide-react"; // Import LoaderCircle
import Image from "next/image";
import React, { useState } from "react";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  const [loadingItems, setLoadingItems] = useState({}); // Track loading state for each item

  const handleDelete = async (id) => {
    setLoadingItems((prev) => ({ ...prev, [id]: true })); // Set loading state for the item
    await onDeleteItem(id);
    setLoadingItems((prev) => ({ ...prev, [id]: false })); // Reset loading state after deletion
  };

  return (
    <div>
      <div className="h-[500px] overflow-auto">
        {cartItemList.map((cart) => (
          <div
            key={cart.id}
            className="flex justify-between items-center p-2 mb-5"
          >
            <div className="flex gap-6 items-center">
              <Image
                src={cart.image}
                alt={cart.name}
                height={90}
                width={90}
                className="border p-2"
              />
              <div>
                <h2 className="font-bold">{cart.name}</h2>
                <h2>Quantity: {cart.quantity}</h2>
                <h2 className="font-bold text-lg">$ {cart.amount}</h2>
              </div>
            </div>
            <button
              onClick={() => handleDelete(cart.id)}
              className="text-red-500"
              disabled={loadingItems[cart.id]} // Disable button while loading
            >
              {loadingItems[cart.id] ? (
                <LoaderCircle className="animate-spin h-5 w-5" />
              ) : (
                <TrashIcon className="cursor-pointer h-5 w-5" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
