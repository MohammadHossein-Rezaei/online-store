import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../services/types/IProduct";
import { fetchProducts } from "../../services/procutsApi";

const ProductDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts();

        console.log("تمام محصولات:", products);
        console.log("ID دریافت شده از URL:", id, "نوع:", typeof id);

        const foundProduct = products.find((p) => {
          console.log(
            `مقایسه: ${p.id} (${typeof p.id}) با ${id} (${typeof id})`
          );
          return p.id.toString() === id;
        });

        console.log("محصول یافت شده:", foundProduct);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("خطا در دریافت محصول:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          محصول با شناسه {id} یافت نشد. لطفاً از صحت URL مطمئن شوید.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-contain mb-4"
        />
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">
            {product.price.toLocaleString()} تومان
          </span>
          <div
            className="w-6 h-6 rounded-full border border-gray-300"
            style={{ backgroundColor: product.color }}
            title={product.color}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
