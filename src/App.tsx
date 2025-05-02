import { BrowserRouter } from "react-router-dom";
import Products from "./page/productsPage/Products";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-gray-50 font-sans">
        <Products />
      </div>
    </BrowserRouter>
  );
}

export default App;
