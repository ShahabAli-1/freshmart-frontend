"use client";
import { useState, useEffect } from "react";
import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import { Loader } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [contentVisible, setContentVisible] = useState(false); // State for visibility

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const sliders = await GlobalApi.getSliders();
      const categories = await GlobalApi.getCategoryList();
      const products = await GlobalApi.getAllProducts();

      setSliderList(sliders);
      setCategoryList(categories);
      setProductList(products);
      setLoading(false);

      // Trigger the fade-in effect after data is loaded
      setTimeout(() => setContentVisible(true), 100);
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 md:p-10 px-16">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div
          className={`transition-opacity duration-1 ease-in-out transform ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          {/* All content */}
          <Slider sliderList={sliderList} />
          <CategoryList categoryList={categoryList} />
          <ProductList productList={productList} />
          <Footer />
        </div>
      )}
    </div>
  );
}
