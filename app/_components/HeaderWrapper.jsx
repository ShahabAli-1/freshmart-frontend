"use client";
import Header from "./Header";
import { usePathname } from "next/navigation";
const HeaderWrapper = () => {
  const params = usePathname();
  const showHeader = params !== "/sign-in" && params !== "/create-account";

  return <div>{showHeader && <Header />}</div>;
};

export default HeaderWrapper;
