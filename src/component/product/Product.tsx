import { FC } from "react";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  color: string;
}

const Product: FC<ProductProps> = ({
  name,
  price,
  image,
  description,
  color,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[75%]">
        <img
          src={image}
          alt={name}
          className="absolute h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-indigo-600">
            {price.toLocaleString()} تومان
          </span>
          <div
            className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
            style={{ backgroundColor: color }}
            title={color}
          />
        </div>

        <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
};

export default Product;
