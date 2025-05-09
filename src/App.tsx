import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./page/productsPage/Products";
import ProductDetails from "./component/productDetails/ProductDetails";
import { CartProvider } from "./context/CartContext";
import LandingPage from "./page/landing/LandingPage";

function App() {
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
