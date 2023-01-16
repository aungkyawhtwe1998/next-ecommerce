import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
type ShoppingCartProps = {
  isOpen: boolean;
};
const OrderModal = ({ isOpen }: ShoppingCartProps) => {
  const { cartItems, closeCart } = useShoppingCart();
  if (!isOpen) return null;
  return (
    <div className="top-0 right-0 fixed bg-gray-700 min-w-[25vw] min-h-full p-3">
      <div className="flex justify-between mb-3 align-middle overflow-y-scroll py-5">
        <span className="text-xl text-gray-100">Cart Items</span>

        <button
          className="text-red-300"
          onClick={closeCart}>
          Close
        </button>
      </div>
      <div>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderModal;
