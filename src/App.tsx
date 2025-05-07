import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./page/productsPage/Products";
import ProductDetails from "./component/productDetails/ProductDetails";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen w-full bg-gray-50 font-sans">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
