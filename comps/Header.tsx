import Link from "next/link";
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import OrderModal from "./OrderModal";

const Header = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 py-5 px-2 mb-2">
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
          <Link href="/products">
            <span className="block mt-4 p-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Admin
            </span>
          </Link>
        </div>
      </div>
      <div className="bg-gray-900 bg-opacity-30">
        <button
          className="bg-blue-600 text-white px-3 py-2 rounded hover:scale-95 transition text-xl"
          onClick={openCart}>
          Cart
          <span className="p-1 text-lime-200">{cartQuantity}</span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
