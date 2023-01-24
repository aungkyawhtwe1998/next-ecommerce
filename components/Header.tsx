import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartQuantity, openCart, isOpen } from "../features/cart/CartSlice";
import OrderModal from "./OrderModal";
import { signIn, useSession, signOut } from "next-auth/react";

const Header = () => {
  // const { openCart } = useShoppingCart();
  const dispatch = useDispatch();
  const cartQty = useSelector(cartQuantity);
  const isOpened = useSelector(isOpen);
  const { data, status } = useSession();
  console.log(data, status);
  const handleSignIn =async () => {
    await signIn('github', {
      callbackUrl:'http://localhost:3000/products',
    })
  }

  const handleLogout = async ()=>{
    await signOut({
      callbackUrl:'http://localhost:3000/',
    })
  }
  return (
    <div className=" bg-gray-800">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between flex-wrap py-5 px-2 mb-2">
          <div className="flex items-center flex-shrink-0 text-white">
            <span className="font-semibold text-blue-300 text-xl tracking-tight">
              Ecommerce
            </span>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <Link href="/">
                <span className="block mt-4 p-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                  Home
                </span>
              </Link>
              {
                status === 'authenticated'?(
                  <Link href="/products">
                  <span className="block mt-4 p-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Admin Dashboard
                  </span>
                </Link>
                ):(<></>)
              }
             
            </div>
          </div>
          <div className="bg-gray-900 bg-opacity-30">
            {status === "authenticated" ? (
              <button
                className="bg-yellow-700 mr-2 text-white px-3 py-2 rounded hover:scale-95 transition text-xl"
                onClick={()=>handleLogout()}
                >
                Logout
              </button>
            ) : (
              <button
                className="bg-yellow-500 mr-2 text-white px-3 py-2 rounded hover:scale-95 transition text-xl"
                onClick={() =>handleSignIn()}>
                Admin Login
              </button>
            )}

            <button
              className="bg-blue-600 text-white px-3 py-2 rounded hover:scale-95 transition text-xl"
              onClick={() => dispatch(openCart())}>
              Cart
              <span className="p-1 text-lime-200">{cartQty}</span>
            </button>
          </div>
        </nav>
        <OrderModal isOpen={isOpened} />
      </div>
    </div>
  );
};

export default Header;
