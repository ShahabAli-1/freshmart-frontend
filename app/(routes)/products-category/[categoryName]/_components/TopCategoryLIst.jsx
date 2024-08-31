"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  const [loadingIndex, setLoadingIndex] = useState(null); // Track which category is loading
  const router = useRouter();

  const handleClick = (categoryName, index, event) => {
    event.preventDefault(); // Prevent the default link behavior
    setLoadingIndex(index);
    router.push(`/products-category/${categoryName}`);
  };

  return (
    <div className="mt-2 flex gap-5 overflow-auto mx-7 md:mx-20 justify-center">
      {categoryList.map((category, index) => (
        <Link
          href={`/products-category/${category.attributes.name}`}
          key={index}
          className={`flex flex-col items-center p-3 rounded-lg bg-green-50 gap-2 group cursor-pointer hover:bg-green-600 w-[150px] min-w-[100px] relative ${
            selectedCategory == category.attributes.name &&
            "bg-green-600 text-white"
          }`}
          onClick={(event) =>
            handleClick(category.attributes.name, index, event)
          }
        >
          {loadingIndex === index ? (
            <div className="flex justify-center items-center w-full h-full absolute inset-0 bg-green-600 bg-opacity-70 rounded-lg">
              <LoaderCircle className="animate-spin h-8 w-8 text-white" />
            </div>
          ) : (
            <>
              <Image
                src={category.attributes?.icon?.data[0]?.attributes?.url}
                width={50}
                height={50}
                alt="icon"
                className="group-hover:scale-125 transition-all ease-in-out"
              />
              <h2
                className={`text-green-800 text-center group-hover:text-white ${
                  selectedCategory == category.attributes.name && "text-white"
                }`}
              >
                {category.attributes.name}
              </h2>
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;
