import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/procutsApi";
import { IProduct } from "../../services/types/IProduct";
import Product from "../../component/product/Product";

const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();

        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            به فروشگاه آنلاین ما خوش آمدید
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            بهترین محصولات با کیفیت عالی و قیمت مناسب
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            مشاهده محصولات
          </Link>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">محصولات ویژه</h2>

        {isLoading ? ( // TODO: تغییر لودینگ
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block border border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-indigo-500 text-3xl mb-4">🚚</div>
              <h3 className="font-bold mb-2">ارسال سریع</h3>
              <p className="text-gray-600">تحویل در کمتر از 48 ساعت در تهران</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-indigo-500 text-3xl mb-4">🔒</div>
              <h3 className="font-bold mb-2">پرداخت امن</h3>
              <p className="text-gray-600">تراکنش‌های مطمئن با درگاه بانکی</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-indigo-500 text-3xl mb-4">🔄</div>
              <h3 className="font-bold mb-2">ضمانت بازگشت</h3>
              <p className="text-gray-600">7 روز ضمانت بازگشت وجه</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
