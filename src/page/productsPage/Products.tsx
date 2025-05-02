import { useSearchParams } from "react-router-dom";
import Filters from "../../component/filter/Filters";
import HeaderComponent from "../../component/header/HeaderComponent";
import Product from "../../component/product/Product";
import { IProduct } from "../../services/types/IProduct";
import { fetchProducts } from "../../services/procutsApi";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const productList = await fetchProducts();
      setProducts(productList);
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
    const colors = searchParams.get("colors")?.split(",") || [];
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    const priceMatch = product.price >= minPrice && product.price <= maxPrice;
    const colorMatch = colors.length === 0 || colors.includes(product.color);
    const searchMatch = product.name.toLowerCase().includes(searchQuery);

    return priceMatch && colorMatch && searchMatch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <HeaderComponent />

      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">محصولات</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Product key={product.id} {...product} />
              ))}
            </div>
          </div>

          <div className="lg:w-1/4">
            <Filters
              products={products}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
