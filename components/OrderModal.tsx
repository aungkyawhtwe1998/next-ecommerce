import { useDispatch, useSelector } from "react-redux";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { closeCart, removeAllItems, selectItems } from "../features/cart/CartSlice";
import { selectCustomer } from "../features/customer/CustomerSlice";
import apiInstance from "../lib/url";
import CartItem from "./CartItem";
// import {toast} from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
type ShoppingCartProps = {
  isOpen: boolean;
};

const OrderModal = ({ isOpen }: ShoppingCartProps) => {
  // const { cartItems, closeCart } = useShoppingCart();
  const cartItems = useSelector(selectItems);
  const customer = useSelector(selectCustomer);
  const dispatch = useDispatch();
  const handleOrder = async () => {
    const orderId = uuidv4();
    try {
      // for await (const item of cartItems) {
        
      // }
      const res = await apiInstance.post(`/orders/create`, {
        customerId: customer,
        orderId: orderId,
        orderItems:cartItems
      });
      if (res.data) {
        dispatch(removeAllItems());
        alert("order success")
        // toast.success('Order success');
        console.log("order success");
        dispatch(closeCart())
      }
      // if(res?.error){
      //   toast.error(res.error)
      // }
    } catch (error) {
      console.log(error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="top-0 right-0 fixed bg-slate-300 dark:bg-gray-700 min-w-[25vw] min-h-full p-3">
      <div className="flex justify-between mb-3 align-middle overflow-y-scroll py-5">
        <span className="text-xl ">Cart Items</span>

        <button
          className="text-yellow-600"
          onClick={() => dispatch(closeCart())}>
          Close
        </button>
      </div>
      <div className="divide-y list-none divide-gray-200 dark:divide-gray-700">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            {...item}
          />
        ))}
      </div>
      <div>
        <button
          className="w-full bg-gray-300 rounded text-black p-2"
          onClick={handleOrder}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
