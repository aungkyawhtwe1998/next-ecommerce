import { GetServerSideProps, NextPage } from "next";
// import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../comps/Header";
import Link from "next/link";
import { Categories, Category, Product, Products } from "../../type";
interface Props {
  products: Products;
  categories: Categories;
}
const Home: NextPage<Props> = ({ products, categories }) => {
  const [form, setForm] = useState<Product>({
    name: "",
    price: 0,
    quantity: 0,
    categoryId: 0,
  });
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: Product) {
    try {
      fetch("http://localhost:3000/api/products/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        if (data.id) {
          deleteProduct(data.id);
          setForm({ name: "", quantity: 1, price: 0, categoryId: 0 });
          refreshData();
        } else {
          setForm({ name: "", quantity: 1, price: 0, categoryId: 0 });
          refreshData();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id: number) {
    try {
      fetch(`http://localhost:3000/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: Product) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />

      <div className="container px-4 mx-auto">
        <div className="flex justify-between mb-2">
          <h1 className="w- text-center font-bold text-2xl">Products</h1>

          <button className="bg-blue-700 rounded px-2">
            <Link
              href="/product-categories"
              className="text-sm">
              Categories Management
            </Link>
          </button>
        </div>

        <div className="flex items-start justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(form);
            }}
            className="w-[30%] h-[80vh] bg-gray-800 p-3 space-y-6 flex flex-col items-stretch">
            <label className="">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border-2 rounded border-gray-600 p-1"
            />
            <label>Price</label>
            <input
              type="text"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: parseInt(e.target.value) })
              }
              className="border-2 rounded border-gray-600 p-1"
            />
            <label>Category</label>
            <select
              placeholder="Category"
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: parseInt(e.target.value) })
              }
              className="border-2 rounded border-gray-600 p-1">
              {categories.map((cate: Category) => (
                <option
                  key={cate.id}
                  value={cate.id}>
                  {cate.name}
                </option>
              ))}
            </select>
            <label>Quantity</label>
            <input
              type="text"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: parseInt(e.target.value) })
              }
              className="border-2 rounded border-gray-600 p-1"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-1">
              Add +
            </button>
          </form>
          <div className="w-auto bg-gray-800 ml-5 p-3 min-w-[70%] h-[80vh] overflow-y-scroll max-w-min mx-auto space-y-6 flex-col items-start">
            <table className="min-w-full">
              <thead>
                <tr className="border-b  bg-gray-700 leading-4 tracking-wider text-base text-yellow-50">
                  <th className="px-6 py-5 text-left">Name</th>
                  <th className="px-6 py-5 text-left">Price</th>
                  <th className="px-6 py-5 text-left">Category</th>
                  <th className="px-6 py-5 text-left">Qty</th>
                  <th className="px-6 py-5 text-left">Control</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr
                    className="border-b bg-gray-600 text-yellow-50"
                    key={product.id}>
                    <td className="p-3 text-left">{product.name}</td>
                    <td className="p-3 text-left">{product.price}</td>
                    <td className="p-3 text-left">{product.category?.name}</td>
                    <td className="p-3 text-left">{product.quantity}</td>
                    <td className="p-3 text-left whitespace-nowrap">
                      <button
                        onClick={() =>
                          setForm({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: product.quantity,
                            categoryId: product.categoryId,
                          })
                        }
                        className="bg-blue-500 px-3 text-center rounded mr-2">
                        Update
                      </button>
                      <button
                        onClick={() => deleteProduct(Number(product.id))}
                        className="bg-red-500 px-3 text-center rounded">
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul></ul>
          </div>
        </div>
      </div>
    </>
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
      category: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  console.log(categories);
  return {
    props: { products, categories },
  };
};
