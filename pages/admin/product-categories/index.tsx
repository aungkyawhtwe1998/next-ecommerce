import { GetServerSideProps } from "next";
// import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../../components/Header";
import { Categories, Category } from "../../../type";
import apiInstance from "../../../lib/url";

const ProuctCategories = ({ categories }: Categories) => {
  const [form, setForm] = useState<Category>({ name: "" });
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: Category) {
    try {
      const res = await apiInstance.post(`/product-categories/create`, JSON.stringify(data));
      if(res.data){
        deleteProduct(res.data.id);
        setForm({ name: "" });
        refreshData();
      } else {
        setForm({ name: "" });
        refreshData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id: number) {
    try {
      const res = await apiInstance.delete(`/product-categories/${id}`);
      if(res){
        refreshData();

      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: Category) => {
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
        <div className="container px-4 mx-auto">
          <h1 className="text-center font-bold text-2xl mt-4">
            Product Category
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(form);
            }}
            className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch">
            <label className="">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border-2 rounded border-gray-600 p-1"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-1">
              Add +
            </button>
          </form>
          <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex-col items-start">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="border-b border-gray-600 p-1">
                  <div className="flex w-[300] justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold">{category.name}</h3>
                    </div>
                    <button
                      onClick={() =>
                        setForm({ id: category.id, name: category.name })
                      }
                      className="bg-blue-500 px-3 text-center rounded mr-2">
                      Update
                    </button>
                    <button
                      onClick={() => deleteProduct(Number(category.id))}
                      className="bg-red-500 px-3 text-center rounded">
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProuctCategories;
export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  console.log(categories);
  return {
    props: { categories },
  };
};
