import { useDispatch, useSelector } from "react-redux";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { closeCart, selectItems } from "../features/cart/CartSlice";
import CartItem from "./CartItem";
type ShoppingCartProps = {
  isOpen: boolean;
};
type CartItemProps = {
  id: number;
  price:number;
  name:string;
  count:number;
};
const OrderModal = ({ isOpen }: ShoppingCartProps) => {
  // const { cartItems, closeCart } = useShoppingCart();
  const cartItems = useSelector(selectItems);
  const dispatch = useDispatch();
  if (!isOpen) return null;
  return (
    <div className="top-0 right-0 fixed bg-gray-700 min-w-[25vw] min-h-full p-3">
      <div className="flex justify-between mb-3 align-middle overflow-y-scroll py-5">
        <span className="text-xl text-gray-100">Cart Items</span>

        <button
          className="text-red-300"
          onClick={() => dispatch(closeCart())}>
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
      <div>
        <button className="w-full bg-blue-900 p-2">Order Now</button>
      </div>
    </div>
  );
};

export default OrderModal;
