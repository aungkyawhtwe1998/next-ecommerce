import { useShoppingCart } from "../context/ShoppingCartContext";

type CartItemProps = {
  id: number;
  quantity: number;
};
const CartItem = ({ id, quantity }: CartItemProps) => {
  //   const [products, setProducts] = useState<Product[]>([]);
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();
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
    <div className="bg-gray-800 mb-1 rounded shadow p-3 ">
      <div className="w-[300] flex flex-col ">
        <div className="flex-1 my-3">
          <h3 className="font-bold text-xl">{id}</h3>
          {/* <span className="font-bold mt-2 text-orange-400 text-sm">
            {formatCurrency(item.price)}
          </span> */}
        </div>

        <div className="flex align-middle justify-between">
          <button
            className="bg-blue-500 px-3 text-center rounded"
            onClick={() => decreaseCartQuantity(id)}>
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            className="bg-blue-500 px-3 text-center rounded"
            onClick={() => increaseCartQuantity(id)}>
            +
          </button>
        </div>
        <button
          className="bg-red-500 px-3 mt-2 text-center rounded"
          onClick={() => removeFromCart(id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
