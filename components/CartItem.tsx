import { TrashIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useShoppingCart } from "../context/ShoppingCartContext";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../features/cart/CartSlice";
import { formatCurrency } from "../utils/formatCurrenc";

// type CartItemProps = {
//   id: number;
//   price:number;
//   name:string;
//   count:number;
// };
const CartItem = ({ id, name, imageUrl, price, count }: any) => {
  const { status } = useSession();
  const dispatch = useDispatch();
  //   const [products, setProducts] = useState<Product[]>([]);
  // const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
  //   useShoppingCart();
  //   const getProducts = async () => {
  //     const data = await prisma.product.findMany({
  //       select: {
  //         name: true,
  //         id: true,
  //         price: true,
  //         quantity: true,
  //         categoryId: true,
  //         createdAt: true,
  //       },
  //     });
  //     setProducts(data);
  //   };
  //   useEffect(() => {
  //     getProducts();
  //   }, []);

  //   const item = products.find((i) => i.id === id);
  //   if (item == null) return null;
  return (
    <li className="pb-1">
      <div className="flex items-center space-x-3">
      <button
        className="p-2 w-100 mx-auto rounded"
        onClick={() => dispatch(removeItem(Number(id)))}>
        <TrashIcon className="h-6 w-6 text-gray-200" />
      </button>
        <div className="flex-shrink-0">
          
          <img
            className="p-8 rounded-t-lg w-28 h-28"
            src={imageUrl}
            alt="product image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {formatCurrency(price)}
          </p>
        </div>
        <div className="flex flex-col items-center text-base font-semibold text-gray-900 dark:text-white">
          <div className="flex  align-middle justify-between">
            <button
              className="bg-gray-500 px-3 text-center rounded"
              onClick={() => dispatch(decrementQuantity(id))}>
              -
            </button>
            <span className="px-4">{count}</span>
            <button
              className="bg-gray-500 px-3 text-center rounded"
              onClick={() => dispatch(incrementQuantity(id))}>
              +
            </button>
          </div>
        </div>
      </div>
      
    </li>
  );
};

export default CartItem;
