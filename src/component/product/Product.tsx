import { FC } from "react";
import { IProduct } from "../../services/types/IProduct";

interface ProductCardProps {
  product: IProduct;
}

const Product: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative pb-[75%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-bold text-indigo-600">
              {product.price.toLocaleString()} تومان
            </span>
            <div
              className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
              style={{ backgroundColor: product.color }}
              title={product.color}
            />
          </div>

          <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
