"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  LayoutGrid,
  LoaderCircle,
  Search,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import CartItemList from "./CartItemList";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCartItems, setLoadingCartItems] = useState(true);

  const isLogin = sessionStorage.getItem("jwt") ? true : false;
  const user = isLogin ? JSON.parse(sessionStorage.getItem("user")) : null;
  const jwt = sessionStorage.getItem("jwt");

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subtotal, setSubTotal] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      getCategoryList();
      getCartItems();
    } else {
      setLoadingCategories(false);
      setLoadingCartItems(false);
    }
  }, [updateCart]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
      setLoadingCategories(false); // Set loading state to false after fetching
    });
  };

  const getCartItems = async () => {
    setLoadingCartItems(true);
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItem(cartItemList_.length);
    setCartItemList(cartItemList_);
    setLoadingCartItems(false); // Set loading state to false after fetching
  };

  useEffect(() => {
    if (isLogin && cartItemList.length > 0) {
      let total = 0;
      cartItemList.forEach((element) => {
        total += element.amount;
      });
      setSubTotal(total.toFixed(2));
    }
  }, [cartItemList, isLogin]);

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  const onDeleteItem = async (id) => {
    await GlobalApi.deleteCartItem(id, jwt).then((resp) => {
      toast("Item deleted from cart.");
      getCartItems();
    });
  };

  return (
    <div className="flex p-5 shadow-sm justify-between">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image src="/logo.png" alt="logo" width={150} height={100} />
        </Link>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2 className="md:flex cursor-pointer gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 hidden">
                <LayoutGrid className="h-5 w-5" />
                Category
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Browse Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {loadingCategories ? (
                <div className="flex justify-center items-center p-4">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                categoryList.map((category, index) => (
                  <Link
                    key={index}
                    href={"/products-category/" + category.attributes.name}
                  >
                    <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
                      <Image
                        src={
                          category.attributes?.icon?.data[0]?.attributes?.url
                        }
                        unoptimized={true}
                        width={30}
                        height={30}
                        alt="categoryIcon"
                      />
                      <h2 className="text-md">{category?.attributes?.name}</h2>
                    </DropdownMenuItem>
                  </Link>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="md:flex gap-3 items-center border rounded-full p-2 mx-5 hidden">
          <Search />
          <input type="text" placeholder="search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasket className="h-7 w-7" />
              {loadingCartItems ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span className="bg-primary text-white px-2 rounded-full">
                  {isLogin ? totalCartItem : 0}
                </span>
              )}
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold p-2 text-lg rounded-md">
                My Cart
              </SheetTitle>
              <SheetDescription>
                {isLogin ? (
                  <CartItemList
                    cartItemList={cartItemList}
                    onDeleteItem={onDeleteItem}
                  />
                ) : (
                  <div className="text-center p-4">
                    <p>Please sign in to view your cart items.</p>
                  </div>
                )}
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between">
                  Subtotal <span>${subtotal}</span>
                </h2>
                <Button
                  onClick={() =>
                    router.push(isLogin ? "/checkout" : "/sign-in")
                  }
                >
                  {isLogin ? "Checkout" : "Sign in to Checkout"}
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className="h-12 w-12 bg-green-100 text-primary p-2 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/my-order"}>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
