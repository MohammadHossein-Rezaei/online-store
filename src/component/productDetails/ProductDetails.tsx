import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../services/types/IProduct";
import { fetchProducts } from "../../services/procutsApi";
import HeaderComponent from "../header/HeaderComponent";
import { useCartStore } from "../../context/CartZustand";

const ProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts();
        const foundProduct = products.find((p) => p.id.toString() === id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("خطا در دریافت محصول:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const { addToCart } = useCartStore();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <HeaderComponent />
        <p className="text-red-500">محصول یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <HeaderComponent />
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="flex items-center mb-6">
                <span className="text-xl font-bold text-indigo-600">
                  {product.price.toLocaleString()} تومان
                </span>
                <div
                  className="w-6 h-6 rounded-full border border-gray-300 ml-4"
                  style={{ backgroundColor: product.color }}
                  title={product.color}
                />
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
