import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./page/productsPage/Products";
import ProductDetails from "./component/productDetails/ProductDetails";
import { CartProvider } from "./context/CartContext";
import LandingPage from "./page/landing/LandingPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const originalTitle = document.title;
    const originalUrl = window.location.href;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "🔥 نرو سمیه";
        history.replaceState({}, "", "/?special_offer=50%25");
      } else {
        document.title = originalTitle;
        history.replaceState({}, "", originalUrl);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
      history.replaceState({}, "", originalUrl);
    };
  }, []);
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
export default App;
