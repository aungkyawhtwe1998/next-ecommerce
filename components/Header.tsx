import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartQuantity, openCart, isOpen } from "../features/cart/CartSlice";
import OrderModal from "./OrderModal";
import { signIn, useSession, signOut, getSession } from "next-auth/react";
import { useState } from "react";
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid'
const Header = () => {
  // const { openCart } = useShoppingCart();
  const dispatch = useDispatch();
  const cartQty = useSelector(cartQuantity);
  const isOpened = useSelector(isOpen);
  const { data, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  // const session = getSession();
  const handleShowDropdown = () => {
    showDropdown ? setShowDropdown(false) : setShowDropdown(true);
    console.log(showDropdown);
  };

  // const handleSignIn = async () => {
  //   await signIn("github", {
  //     callbackUrl: "http://localhost:3000/products",
  //   });
  // };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
    });
  };
  return (
    // <div className=" bg-gray-800">
    //   <div className="container mx-auto">
    //     <nav className="flex items-center justify-between flex-wrap py-5 px-2 mb-2">
    //       <div className="flex items-center flex-shrink-0 text-white">
    //         <span className="font-semibold text-blue-300 text-xl tracking-tight">
    //           Ecommerce
    //         </span>
    //       </div>
    //       <div className="block lg:hidden">
    //         <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
    //           <svg
    //             className="fill-current h-3 w-3"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg">
    //             <title>Menu</title>
    //             <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    //           </svg>
    //         </button>
    //       </div>
    //       <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    //         <div className="text-sm lg:flex-grow">
    //           <Link href="/">
    //             <span className="block mt-4 p-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
    //               Home
    //             </span>
    //           </Link>
    //           {
    //             status === "authenticated" && data?.user?.email==="aungkyawhtwe.mdy49@gmail.com"?(
    //               <Link href="/products">
    //               <span className="block mt-4 p-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
    //                 Admin Dashboard
    //               </span>
    //             </Link>
    //             ):(<></>)
    //           }

    //         </div>
    //       </div>
    //       <div className="bg-gray-900 bg-opacity-30">
    //         {status === "authenticated" ? (
    //           <button
    //             className="bg-yellow-700 mr-2 text-white px-3 py-2 rounded hover:scale-95 transition text-xl"
    //             onClick={()=>handleLogout()}
    //             >
    //             Logout
    //           </button>
    //         ) : (
    //           <button
    //             className="bg-yellow-500 mr-2 text-white px-3 py-2 rounded hover:scale-95 transition text-xl"
    //             onClick={() =>handleSignIn()}>
    //             Admin Login
    //           </button>
    //         )}

    //       </div>
    //     </nav>
    //     <OrderModal isOpen={isOpened} />
    //   </div>
    // </div>

    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a
          href="https://flowbite.com/"
          className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />

          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Ecommerce
          </span>
        </a>

       
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto"
          id="mobile-menu-2">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Contact
              </a>
            </li>
          </ul>
          <div className="dropdown mx-4 flex items-center">
          <div className="flex">
            <button
              onClick={handleShowDropdown}
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom">
              <span className="sr-only">Open user menu</span>
              <UserIcon className="w-8 h-8"/>
              
            </button>
          </div>
          <OrderModal isOpen={isOpened} />
          <div
            className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
              showDropdown ? "block" : "hidden"
            }`}
            id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {data?.user?.name}
              </span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {data?.user?.email}
              </span>
            </div>
            <ul
              className="py-2"
              aria-labelledby="user-menu-button">
              {status === "authenticated" ? (
                <>
                  {data?.user?.email === "aungkyawhtwe.mdy49@gmail.com" ? (
                    <>
                      <li>
                        <Link
                          href="/admin/products"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          Admin Dashboard
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/user/order"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          Your Orders
                        </Link>
                      </li>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

              <li>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
          <button
            className="flex p-1 rounded hover:scale-95 transition text-xl"
            onClick={() => dispatch(openCart())}>
            <ShoppingCartIcon className="h-6 w-6 dark:text-gray-100 "/>
            <span className=" text-gray-600">{cartQty}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
