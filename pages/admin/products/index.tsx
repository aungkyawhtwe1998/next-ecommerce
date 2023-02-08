import { GetServerSideProps, NextPage } from "next";
// import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useState } from "react";
import Header from "../../../components/Header";
import Link from "next/link";
import { Categories, Category, Product, Products } from "../../../type";
import apiInstance from "../../../lib/url";
import Image from "next/image";
interface Props {
  products: Products;
  categories: Categories;
}
const Home: NextPage<Props> = ({ products, categories }) => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  async function hadleDelete(id: number) {
    try {
      const deleteRes = await apiInstance.delete(`/products/${id}`);
      if (deleteRes) {
        console.log(deleteRes.data);
        refreshData();
      }
      // fetch(`http://localhost:3000/api/products/${id}`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   method: "DELETE",
      // }).then(() => {
      // });
    } catch (error) {
      console.log(error);
    }
  }

  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if (!previewUrl && !file) {
    //   return;
    // }
    setName("");
    setPrice(null);
    setFile(null);
    setPreviewUrl(null);
  };

  const onUploadFile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    try {
      var formData = new FormData();
      formData.append("media", file);
      formData.append("name", name);
      formData.append("price", price+"");
      formData.append("quantity", quantity+"");
      formData.append("categoryId", categoryId+"");
      formData.append("imageUrl", "");
      const res = await apiInstance.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const {
        data,
        error,
      }: {
        data: {
          url: string | string[];
        } | null;
        error: string | null;
      } = await res.data;

      if (error || !data) {
        alert(error || "Sorry! something went wrong.");
        return;
      }
      setName("");
      setPrice(null);
      setFile(null);
      setPreviewUrl(null);

      console.log("File was uploaded successfylly:", data);
      refreshData();
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleViewDetail = (id: number) => {
    router.push(`/admin/products/edit?product_id=${id}`);
  };
  return (
    <>
      <Header />

      <div className="container mx-auto">
        <div className="flex justify-between mb-2">
          <h1 className="w- text-center font-bold text-2xl">Products</h1>

          <button className="rounded text-green-900 px-2">
            <Link
              href="/admin/product-categories"
              className="text-sm">
              Categories Management
            </Link>
          </button>
          <button className="rounded text-yellow-900 px-2">
            <Link
              href="/admin/orders"
              className="text-sm">
              Order Management
            </Link>
          </button>
        </div>

        <div className="flex items-start justify-center">
          <form
            className="w-full p-3 border border-gray-500 border-dashed"
            onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5 md:py-4">
              <h1>Add New Product</h1>
              <div className="mb-5">
                {previewUrl ? (
                  <div className="mx-auto w-80">
                    <Image
                      alt="file uploader preview"
                      objectFit="cover"
                      src={previewUrl}
                      width={320}
                      height={218}
                      layout="fixed"
                    />
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-14 h-14"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                    <strong className="text-sm font-medium">
                      Select an image
                    </strong>
                    <input
                      className="block w-0 h-0"
                      name="file"
                      type="file"
                      onChange={onFileUploadChange}
                    />
                  </label>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Category</label>
                <select
                  placeholder="Category"
                  value={categoryId ? categoryId : 0}
                  onChange={(e) => setCategoryId(parseInt(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {categories.map((cate: Category) => (
                    <option
                      key={cate.id}
                      value={cate.id}>
                      {cate.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price ? price : 0}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label
                  htmlFor="qty"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Quantity
                </label>
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  value={quantity ? quantity : 0}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="flex mt-5 justify-center gap-1.5">
                <button
                  onClick={onCancelFile}
                  className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600">
                  Cancel
                </button>
                <button
                  disabled={!previewUrl}
                  onClick={onUploadFile}
                  className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600">
                  Upload
                </button>
              </div>
            </div>
          </form>
          <div className="w-auto bg-gray-800 ml-5 p-3 min-w-[70%] h-[80vh] overflow-y-scroll max-w-min mx-auto space-y-6 flex-col items-start">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-5 text-left">Product</th>
                  <th className="px-6 py-5 text-left">Price</th>
                  <th className="px-6 py-5 text-left">Qty</th>
                  <th className="px-6 py-5 text-left">Control</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: Product) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 "
                    key={product.id}>
                    <td
                      scope="row"
                      className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img
                        className="w-10 h-10 rounded-full"
                        width={50}
                        height={50}
                        src={product.imageUrl}
                        alt="Jese image"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {product.name}
                        </div>
                        <div className="font-normal text-gray-500">
                          {product.category?.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-left">{product.price}</td>
                    <td className="p-3 text-left">{product.quantity}</td>
                    <td className="p-3 text-left whitespace-nowrap">
                      <button
                        onClick={() => {
                          handleViewDetail(Number(product.id));
                        }}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Detail
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
                        onClick={() => hadleDelete(Number(product.id))}>
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
      imageUrl: true,
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
  return {
    props: { products, categories },
  };
};

// import { GetServerSideProps, NextPage } from "next";
// // import { Prisma } from "@prisma/client";
// import { prisma } from "../../../lib/prisma";
// import { useRouter } from "next/router";
// import { useState } from "react";
// import Header from "../../../components/Header";
// import Link from "next/link";
// import { Categories, Category, Product, Products } from "../../../type";
// interface Props {
//   products: Products;
//   categories: Categories;
// }
// const Home: NextPage<Props> = ({ products, categories }) => {
//   const [form, setForm] = useState<Product>({
//     name: "",
//     price: 0,
//     quantity: 0,
//     categoryId: 0,
//   });
//   const router = useRouter();

//   const refreshData = () => {
//     router.replace(router.asPath);
//   };

//   async function create(data: Product) {
//     console.log(data);

//     try {
//       fetch("http://localhost:3000/api/products/create", {
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//       }).then(() => {
//         setForm({ name: "", quantity: 1, price: 0, categoryId: 0 });
//         refreshData();
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function update(data: Product) {
//     console.log("update", data);

//     try {
//       fetch(`http://localhost:3000/api/products/update`, {
//         body: JSON.stringify(data),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "PUT",
//       }).then(() => {
//         setForm({ name: "", quantity: 1, price: 0, categoryId: 0 });
//         refreshData();
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function deleteProduct(id: number) {
//     try {
//       fetch(`http://localhost:3000/api/products/${id}`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "DELETE",
//       }).then(() => {
//         refreshData();
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const handleSubmit = async (data: Product) => {
//     try {
//       if (data.id) {
//         update(data);
//       } else {
//         create(data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <Header />

//       <div className="container px-4 mx-auto">
//         <div className="flex justify-between mb-2">
//           <h1 className="w- text-center font-bold text-2xl">Products</h1>

//           <button className="bg-blue-700 rounded px-2">
//             <Link
//               href="/product-categories"
//               className="text-sm">
//               Categories Management
//             </Link>
//           </button>
//         </div>

//         <div className="flex items-start justify-center">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSubmit(form);
//             }}
//             className="w-[30%] h-[80vh] bg-gray-800 p-3 space-y-6 flex flex-col items-stretch">
//             <label className="">Name</label>
//             <input
//               type="text"
//               placeholder="Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="border-2 rounded border-gray-600 p-1"
//             />
//             <label>Price</label>
//             <input
//               type="text"
//               placeholder="Price"
//               value={form.price}
//               onChange={(e) =>
//                 setForm({ ...form, price: parseInt(e.target.value) })
//               }
//               className="border-2 rounded border-gray-600 p-1"
//             />
//             <label>Category</label>
//             <select
//               placeholder="Category"
//               value={form.categoryId}
//               onChange={(e) =>
//                 setForm({ ...form, categoryId: parseInt(e.target.value) })
//               }
//               className="border-2 rounded border-gray-600 p-1">
//               {categories.map((cate: Category) => (
//                 <option
//                   key={cate.id}
//                   value={cate.id}>
//                   {cate.name}
//                 </option>
//               ))}
//             </select>
//             <label>Quantity</label>
//             <input
//               type="text"
//               placeholder="Quantity"
//               value={form.quantity}
//               onChange={(e) =>
//                 setForm({ ...form, quantity: parseInt(e.target.value) })
//               }
//               className="border-2 rounded border-gray-600 p-1"
//             />

//             <button
//               type="submit"
//               className="bg-blue-500 text-white rounded p-1">
//               {form.id ? "Update" : "Add"}
//             </button>
//           </form>
//           <div className="w-auto bg-gray-800 ml-5 p-3 min-w-[70%] h-[80vh] overflow-y-scroll max-w-min mx-auto space-y-6 flex-col items-start">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="border-b  bg-gray-700 leading-4 tracking-wider text-base text-yellow-50">
//                   <th className="px-6 py-5 text-left">Name</th>
//                   <th className="px-6 py-5 text-left">Price</th>
//                   <th className="px-6 py-5 text-left">Category</th>
//                   <th className="px-6 py-5 text-left">Qty</th>
//                   <th className="px-6 py-5 text-left">Control</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product: Product) => (
//                   <tr
//                     className="border-b bg-gray-600 text-yellow-50"
//                     key={product.id}>
//                     <td className="p-3 text-left">{product.name}</td>
//                     <td className="p-3 text-left">{product.price}</td>
//                     <td className="p-3 text-left">{product.category?.name}</td>
//                     <td className="p-3 text-left">{product.quantity}</td>
//                     <td className="p-3 text-left whitespace-nowrap">
//                       <button
//                         onClick={() =>
//                           setForm({
//                             id: product.id,
//                             name: product.name,
//                             price: product.price,
//                             quantity: product.quantity,
//                             categoryId: product.categoryId,
//                           })
//                         }
//                         className="bg-blue-500 px-3 text-center rounded mr-2">
//                         Update
//                       </button>
//                       <button
//                         onClick={() => deleteProduct(Number(product.id))}
//                         className="bg-red-500 px-3 text-center rounded">
//                         x
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <ul></ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;
// export const getServerSideProps: GetServerSideProps = async () => {
//   const products = await prisma.product.findMany({
//     select: {
//       name: true,
//       id: true,
//       price: true,
//       quantity: true,
//       categoryId: true,
//       category: {
//         select: {
//           name: true,
//           id: true,
//         },
//       },
//     },
//   });
//   const categories = await prisma.category.findMany({
//     select: {
//       name: true,
//       id: true,
//     },
//   });
//   console.log(categories);
//   return {
//     props: { products, categories },
//   };
// };
