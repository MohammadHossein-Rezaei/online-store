import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cartIcon from "/public/images/icons8-cart-50.png";
import { useCart } from "../../context/CartContext";
import Cart from "../cart/Cart";

const HeaderComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cartItems, toggleCart, isCartOpen } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/products?search=${encodeURIComponent(searchQuery.trim())}&page=1`
      );
    }
  };
  const [clickCount, setClickCount] = useState(0);

  const messages = [
    "سولی این لوگوعه محصولات پایینه",
    "بقران این فروشی نیس ",
    "خدایا بسه دیگه",
  ];

  const handleClick = () => {
    if (clickCount < messages.length - 1) {
      setClickCount(clickCount + 1);
    } else {
      setClickCount(0); // بازگشت به حالت اول پس از کلیک سوم
    }
    alert(messages[clickCount]);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <h1
          onClick={handleClick}
          className=" cursor-pointer text-2xl font-bold text-indigo-600"
        >
          فروشگاه آنلاین
        </h1>

        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
          <input
            type="search"
            placeholder="جستجوی محصولات..."
            className="w-full px-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <nav className="hidden md:block">
          <ul className="flex space-x-6 space-x-reverse">
            <li
              onClick={() => navigate(`/`)}
              className="cursor-pointer px-3 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              صفحه اصلی
            </li>
            <li
              onClick={() => navigate(`/products`)}
              className=" cursor-pointer px-3 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              محصولات
            </li>
            <li className="cursor-pointer px-3 py-2 text-gray-600 hover:text-indigo-600 transition-colors">
              تماس با ما
            </li>
          </ul>
        </nav>

        <button
          onClick={toggleCart}
          className="p-2 relative hover:bg-gray-100 rounded-full transition-colors"
        >
          <img src={cartIcon} alt="سبد خرید" className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            </span>
          )}
        </button>
      </div>
      {isCartOpen && <Cart />}
    </header>
  );
};

export default HeaderComponent;
