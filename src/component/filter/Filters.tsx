import { FC } from "react";
import { IProduct } from "../../services/types/IProduct";

interface FiltersProps {
  products: IProduct[];
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

const Filters: FC<FiltersProps> = ({
  products,
  searchParams,
  setSearchParams,
}) => {
  const minPrice =
    Number(searchParams.get("minPrice")) ||
    Math.min(...products.map((p) => p.price));
  const maxPrice =
    Number(searchParams.get("maxPrice")) ||
    Math.max(...products.map((p) => p.price));
  const selectedColors = searchParams.get("colors")?.split(",") || [];

  const availableColors = [...new Set(products.map((p) => p.color))];
  const priceRange = {
    min: Math.min(...products.map((p) => p.price)),
    max: Math.max(...products.map((p) => p.price)),
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("minPrice", minPrice.toString());
    newParams.set("maxPrice", e.target.value);
    setSearchParams(newParams);
  };

  const handleColorToggle = (color: string) => {
    const newParams = new URLSearchParams(searchParams);
    const colors = newParams.get("colors")?.split(",") || [];

    if (colors.includes(color)) {
      newParams.set("colors", colors.filter((c) => c !== color).join(","));
    } else {
      newParams.set("colors", [...colors, color].join(","));
    }

    setSearchParams(newParams);
  };

  const resetFilters = () => {
    const newParams = new URLSearchParams();
    newParams.set("minPrice", priceRange.min.toString());
    newParams.set("maxPrice", priceRange.max.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">فیلترها</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          ریست فیلترها
        </button>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-700 mb-3">محدوده قیمت</h4>
        <div className="flex items-center space-x-2 space-x-reverse mb-2">
          <span className="text-xs text-gray-500">
            {minPrice.toLocaleString()}
          </span>
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={maxPrice}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <span className="text-xs text-gray-500">
            {maxPrice.toLocaleString()}
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          رنگ‌ها ({availableColors.length})
        </h4>
        <div className="flex flex-wrap gap-3">
          {availableColors.map((color) => (
            <div key={color} className="flex flex-col items-center">
              <button
                onClick={() => handleColorToggle(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColors.includes(color)
                    ? "border-indigo-500 ring-2 ring-indigo-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
              <span className="text-xs mt-1 text-gray-500">
                {selectedColors.includes(color) && color}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
