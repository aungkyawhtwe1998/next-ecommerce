import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
  const {status} = useSession();
  const items = useSelector(selectItems);
  const item = items.find((item) => item.id === id);
  const route = useRouter();
  const handleAddToCart = () =>{
    if(status === 'authenticated'){
      dispatch(
        addToCart({
          id,
          name,
          price,
          quantity,
          categoryId,
        })
      )
    }else{
      route.push('/signin')
    }
    
  }

  return (
    <>
      <div
        key={id}
        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="p-8 rounded-t-lg"
            src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/422992/sub/goods_422992_sub14.jpg?width=1600&impolicy=quality_75"
            alt="product image"
          />
        </a>
        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
          <div className="flex flex-col items-center justify-between">
            <span className="text-3xl mb-2 font-bold text-gray-900 dark:text-white">
              {formatCurrency(price)}
            </span>
            {item?.count == undefined ? (
              <a
                onClick={() => handleAddToCart()}
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add to cart
              </a>
            ) : (
              <div className="flex flex-col">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
