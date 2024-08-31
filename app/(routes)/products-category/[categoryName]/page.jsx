import React from "react";
import GlobalApi from "../../../_utils/GlobalApi";
import TopCategoryList from "./_components/TopCategoryLIst";
import ProductList from "@/app/_components/ProductList";
const ProductCategory = async ({ params }) => {
  const productList = await GlobalApi.getProductsByCategory(
    params.categoryName
  );
  const categoryName = params.categoryName.replace(/%20/g, " ");
  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div>
      <h2 className="p-4 bg-primary text-white text-3xl text-center">
        {categoryName}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.categoryName}
      />
      <div className="p-5 md:p-10">
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default ProductCategory;
