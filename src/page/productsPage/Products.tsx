import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IProduct } from "../../services/types/IProduct";
import { fetchProducts } from "../../services/procutsApi";
import HeaderComponent from "../../component/header/HeaderComponent";
import Product from "../../component/product/Product";
import Filters from "../../component/filter/Filters";
import Pagination from "../../component/pagination/Pagination";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = Number(searchParams.get("page")) || 1;
  const productsPerPage = 10;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productList = await fetchProducts();
        setProducts(productList);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
    const colors = searchParams.get("colors")?.split(",") || [];
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    return (
      product.price >= minPrice &&
      product.price <= maxPrice &&
      (colors.length === 0 || colors.includes(product.color)) &&
      product.name.toLowerCase().includes(searchQuery)
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <HeaderComponent />

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="lg:w-3/4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              محصولات ({filteredProducts.length})
            </h2>

            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  totalItems={filteredProducts.length}
                  itemsPerPage={productsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  className="mt-8"
                />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">محصولی یافت نشد</p>
              </div>
            )}
          </main>

          <aside className="lg:w-1/4">
            <Filters
              products={products}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
