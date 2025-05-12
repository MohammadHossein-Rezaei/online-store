import { Routes, Route, HashRouter } from "react-router-dom";
import Products from "./page/productsPage/Products";
import ProductDetails from "./component/productDetails/ProductDetails";
import LandingPage from "./page/landing/LandingPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </HashRouter>
  );
}
export default App;
