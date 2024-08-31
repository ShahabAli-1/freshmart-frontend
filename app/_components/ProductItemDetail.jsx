// "use client";
// import { Button } from "@/components/ui/button";
// import { Loader, LoaderCircle, ShoppingBag } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useContext, useState } from "react";
// import GlobalApi from "../_utils/GlobalApi";
// import { toast } from "sonner";
// import { UpdateCartContext } from "../_context/UpdateCartContext";
// const ProductItemDetail = ({ product }) => {
//   const [productTotalPrice, setProductTotalPrice] = useState(
//     product.attributes.sellingPrice
//       ? product.attributes.sellingPrice
//       : product.attributes.mrp
//   );

//   const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

//   const jwt = sessionStorage.getItem("jwt");
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const [quantity, setQuantity] = useState(1);
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const addToCart = async () => {
//     setLoading(true);
//     if (!jwt) {
//       router.push("/sign-in");
//       toast("Sign in to add item to cart.");
//       return;
//     }
//     const data = {
//       data: {
//         quantity: quantity,
//         amount: (quantity * productTotalPrice).toFixed(2),
//         products: product.id,
//         users_permissions_user: user.id,
//         userId: user.id,
//       },
//     };
//     console.log(data);
//     await GlobalApi.addToCart(data, jwt).then(
//       (resp) => {
//         console.log(resp);
//         toast("Added to cart.");
//         setUpdateCart(!updateCart);

//         setLoading(false);
//       },
//       (e) => {
//         toast("Error while adding to cart.");
//         setLoading(false);
//       }
//     );
//   };
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
//       <Image
//         src={product?.attributes?.images?.data[0]?.attributes?.url}
//         alt="imageproduct"
//         width={300}
//         height={300}
//         className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
//       />
//       <div className="flex flex-col gap-3">
//         <h2 className="text-2xl font-bold">{product.attributes.name}</h2>
//         <h2 className="text-sm text-gray-500">
//           {product.attributes.description}
//         </h2>
//         <div className="flex gap-3">
//           {product.attributes.sellingPrice && (
//             <h2 className="font-bold text-3xl">
//               ${product.attributes.sellingPrice}
//             </h2>
//           )}
//           <h2
//             className={`font-bold text-3xl ${
//               product.attributes.sellingPrice && "line-through text-gray-500"
//             }`}
//           >
//             ${product.attributes.mrp}
//           </h2>
//         </div>
//         <h2 className="font-medium text-lg">
//           Quantity ({product.attributes.itemQuantityType})
//         </h2>
//         <div className="flex flex-col items-baseline gap-3">
//           <div className="flex gap-3 items-center">
//             <div className="flex border p-2 px-5 gap-10 items-center">
//               <button
//                 disabled={quantity == 1}
//                 onClick={() => setQuantity(quantity - 1)}
//               >
//                 -
//               </button>
//               <h2>{quantity}</h2>
//               <button onClick={() => setQuantity(quantity + 1)}>+</button>
//             </div>
//             <h2 className="text-3xl font-bold">
//               = ${(quantity * productTotalPrice).toFixed(2)}
//             </h2>
//           </div>
//           <Button disabled={loading} onClick={addToCart} className="flex gap-3">
//             <ShoppingBag />
//             {loading ? (
//               <LoaderCircle className="animate-spin" />
//             ) : (
//               "Add To Cart"
//             )}
//           </Button>
//         </div>
//         <h2>
//           <span className="font-bold">Category: </span>
//           {product.attributes.categories.data[0].attributes.name}
//         </h2>
//       </div>
//     </div>
//   );
// };

// export default ProductItemDetail;

"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetail = ({ product }) => {
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp
  );

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwtToken = sessionStorage.getItem("jwt");
      const userData = jwtToken
        ? JSON.parse(sessionStorage.getItem("user"))
        : null;

      setJwt(jwtToken);
      setUser(userData);
    }
  }, []);

  const addToCart = async () => {
    setLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      toast("Sign in to add item to cart.");
      setLoading(false);
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_user: user.id,
        userId: user.id,
      },
    };
    console.log(data);
    await GlobalApi.addToCart(data, jwt).then(
      (resp) => {
        console.log(resp);
        toast("Added to cart.");
        setUpdateCart(!updateCart);
        setLoading(false);
      },
      (e) => {
        toast("Error while adding to cart.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={product?.attributes?.images?.data[0]?.attributes?.url}
        alt="imageproduct"
        width={300}
        height={300}
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.attributes.name}</h2>
        <h2 className="text-sm text-gray-500">
          {product.attributes.description}
        </h2>
        <div className="flex gap-3">
          {product.attributes.sellingPrice && (
            <h2 className="font-bold text-3xl">
              ${product.attributes.sellingPrice}
            </h2>
          )}
          <h2
            className={`font-bold text-3xl ${
              product.attributes.sellingPrice && "line-through text-gray-500"
            }`}
          >
            ${product.attributes.mrp}
          </h2>
        </div>
        <h2 className="font-medium text-lg">
          Quantity ({product.attributes.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="flex border p-2 px-5 gap-10 items-center">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-3xl font-bold">
              = ${(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>
          <Button disabled={loading} onClick={addToCart} className="flex gap-3">
            <ShoppingBag />
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add To Cart"
            )}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {product.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  );
};

export default ProductItemDetail;
