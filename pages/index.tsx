import { GetServerSideProps, NextPage } from "next";
import { prisma } from "../lib/prisma";
import Header from "../comps/Header";
import ProductItem from "../comps/ProductItem";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";

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
    <ShoppingCartProvider>
      <Header />

      <div className="container px-4 mx-auto">
        <h1 className="text-center font-bold text-2xl mt-4">Products</h1>

        <div className="w-auto min-w-[60%] h-max overflow-y-scroll max-w-min mt-20 mx-auto space-y-6 flex-col items-start">
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </div>
      </div>
    </ShoppingCartProvider>
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
