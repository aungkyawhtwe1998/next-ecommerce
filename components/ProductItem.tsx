import { useDispatch, useSelector } from "react-redux";
import {
  selectItems,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  addToCart,
} from "../features/cart/CartSlice";
import { Product } from "../type";
import { formatCurrency } from "../utils/formatCurrenc";

const ProductItem = ({ id, name, price, categoryId, quantity }: Product) => {
  // const {
  //   getItemQuantity,
  //   increaseCartQuantity,
  //   decreaseCartQuantity,
  //   removeFromCart,
  // } = useShoppingCart();
  // const quantity = getItemQuantity(id);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const item = items.find((item) => item.id === id);

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

        {item?.count == undefined ? (
          <button
            className="bg-blue-500 px-3 mt-2 text-center rounded"
            onClick={() =>
              dispatch(
                addToCart({
                  id,
                  name,
                  price,
                  quantity,
                  categoryId,
                })
              )
            }>
            + Add To Cart
          </button>
        ) : (
          <>
            <div className="flex align-middle justify-between">
              <button
                className="bg-blue-500 px-3 text-center rounded"
                onClick={() => dispatch(decrementQuantity(id))}>
                -
              </button>
              <span className="px-4">{item?.count}</span>
              <button
                className="bg-blue-500 px-3 text-center rounded"
                onClick={() => dispatch(incrementQuantity(id))}>
                +
              </button>
            </div>
            <button
              className="bg-red-500 px-3 mt-2 text-center rounded"
              onClick={() => dispatch(removeItem(id))}>
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
