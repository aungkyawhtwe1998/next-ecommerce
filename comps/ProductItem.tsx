import { useShoppingCart } from "../context/ShoppingCartContext";
import { Product } from "../type";
import { formatCurrency } from "../utils/formatCurrenc";

const ProductItem = ({ id, name, price }: Product) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <div
      key={id}
      className="bg-gray-600 rounded shadow p-3 ">
      <div className="w-[300] flex flex-col ">
        <div className="flex-1 my-3">
          <h3 className="font-bold text-xl">{name}</h3>
          <span className="font-bold mt-2 text-orange-400 text-sm">
            {formatCurrency(price)}
          </span>
        </div>

        {quantity === 0 ? (
          <button
            className="bg-blue-500 px-3 mt-2 text-center rounded"
            onClick={() => increaseCartQuantity(id)}>
            + Add To Cart
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
