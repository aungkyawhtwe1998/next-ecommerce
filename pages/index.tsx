import { GetServerSideProps, NextPage } from "next";
import { prisma } from "../lib/prisma";
import Header from "../components/Header";
import ProductItem from "../components/ProductItem";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
// import { decrement, increment, selectValue } from "../features/counter/CounterSlice";

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
  // const count = useSelector(selectValue) 
  const dispatch = useDispatch()

  return (
    <ShoppingCartProvider>
      <Header />
      {/* <h1>The vallue of count is {count}</h1>
      <button onClick={()=>dispatch(increment())} className="w-full h-10 bg-green-400">increment</button>

      <button onClick={()=>dispatch(decrement())} className="w-full h-10 bg-red-400">decrement</button> */}


      <div className="container mx-auto">
        <h1 className="text-center font-bold text-2xl mt-2">Products</h1>

        <div className="w-auto min-w-[100%] h-max overflow-y-scroll max-w-min mt-2 mx-auto flex-col items-start">
          <div className="grid grid-cols-5 gap-5 h-[150px]">
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
