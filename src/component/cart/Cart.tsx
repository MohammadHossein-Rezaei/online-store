import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isCartOpen,
    toggleCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={toggleCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 border-b">
              <h2 className="text-lg font-medium">
                سبد خرید (
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
              <button
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">سبد خرید شما خالی است</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-indigo-600 mt-1">
                            {item.price.toLocaleString()} تومان
                          </p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-8 h-8 border rounded flex items-center justify-center"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="w-8 h-8 border rounded flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-4"
                        >
                          حذف
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between mb-4">
                  <span>جمع کل:</span>
                  <span className="font-medium">
                    {totalPrice.toLocaleString()} تومان
                  </span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                  >
                    پاک کردن سبد
                  </button>
                  <button
                    onClick={() => alert("پرداخت انجام شد!")}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    پرداخت
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
