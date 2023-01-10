import { Inter } from "@next/font/google";
import { GetServerSideProps, NextPage } from "next";
// import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../comps/Header";

interface Products {
  products: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    categoryId: number;
  }[];
}

const Home = ({ products }: Products) => {
  return (
    <div className="container px-4 mx-auto">
      <Header />
      <h1 className="text-center font-bold text-2xl mt-4">Products</h1>

      <div className="w-auto min-w-[60%] h-max overflow-y-scroll max-w-min mt-20 mx-auto space-y-6 flex-col items-start">
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-600 rounded shadow p-3 ">
              <div className="w-[300] flex flex-col ">
                <div className="flex-1 my-3">
                  <h3 className="font-bold text-xl">{product.name}</h3>
                  <span className="font-bold mt-2 text-orange-400 text-sm">
                    {product.price.toLocaleString()} Ks
                  </span>
                </div>
                <button className="bg-blue-500 px-3 text-center rounded">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
export const getServerSideProps: GetServerSideProps = async () => {
  const products = await prisma.product.findMany({
    select: {
      name: true,
      id: true,
      price: true,
      quantity: true,
      categoryId: true,
    },
  });
  console.log(products);
  return {
    props: { products },
  };
};
