import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react"; // Assuming you're using lucide-react for the loader

const CategoryList = ({ categoryList }) => {
  const [loadingIndex, setLoadingIndex] = useState(null); // Track which category is loading
  const router = useRouter();

  const handleClick = (categoryName, index) => {
    setLoadingIndex(index);
    router.push(`/products-category/${categoryName}`);
  };

  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Shop by Category</h2>
      <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5">
        {categoryList.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-3 rounded-lg bg-green-50 gap-2 group cursor-pointer hover:bg-green-200 relative"
            onClick={() => handleClick(category.attributes.name, index)}
          >
            {loadingIndex === index ? (
              <div className="flex justify-center items-center w-full h-full">
                <LoaderCircle className="animate-spin h-8 w-8 text-green-600" />
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
                <h2 className="text-green-800">{category.attributes.name}</h2>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
