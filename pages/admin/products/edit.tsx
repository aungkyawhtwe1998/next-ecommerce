import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Header from "../../../components/Header";
import apiInstance from "../../../lib/url";
import { Product, Category, OrderItem } from "../../../type";
export interface Data {
  name: string;
  id: number;
  quantity: number;
  price: number;
  imageUrl: string;
  categor: Category;
  orderItem: OrderItem;
}
const EditProduct = () => {
  const route = useRouter();
  const { product_id } = route.query;
  const form = useRef<HTMLFormElement>(null!);

  const [product, setProduct] = useState<Data>();
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

  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if (!previewUrl && !file) {
    //   return;
    // }
    setFile(null);
    setPreviewUrl(null);
  };

  const handleUpdate = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    try {
      let formData = new FormData(form.current);
      if (file) {
        formData.append("media", file);
      }
      let payload = {
        ...Object.fromEntries(formData.entries()),
      };
      formData.append("imageUrl", "");
      console.log(payload)
      const res = await apiInstance.put("/products/create", payload, {
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
      setPreviewUrl(null);

      console.log("File was uploaded successfylly:", data);
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };
  useEffect(() => {
    if (product_id) getProduct();
  }, [product_id]);
  const getProduct = async () => {
    const result = await apiInstance.get(
      `/products/getProduct?product_id=${product_id}`
    );
    if (result) setProduct(result.data);
  };
  return (
    <>
      <Header />
      <div className="container m-auto">
        <div className="">
          <div className="grid w-[50%] m-auto">
            {product ? (
              <form
                ref={form}
                className="w-full p-3 border border-gray-500 border-dashed"
                onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-1.5 md:py-6">
                  <h1>Add New Product</h1>
                  <div className=" flex justify-between">
                    <div className="">
                      {previewUrl ? (
                        <div className="">
                          <Image
                            alt="file uploader preview"
                            objectFit="cover"
                            src={previewUrl}
                            className="object-cover w-50 h-50"
                            width={100}
                            height={100}
                            layout="fixed"
                          />
                        </div>
                      ) : (
                        <img
                          alt="file uploader preview"
                          src={product.imageUrl}
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <label className="flex flex-col items-center justify-center transition-colors duration-150 cursor-pointer hover:text-gray-600">
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
                          Change new image
                        </strong>
                        <input
                          className="block w-0 h-0"
                          name="file"
                          type="file"
                          onChange={onFileUploadChange}
                        />
                      </label>
                    </div>
                    <button
                      onClick={onCancelFile}
                      className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600">
                      Cancel
                    </button>
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
                      value={product.name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => {}}
                    />
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
                      value={product.price}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => {}}
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
                      value={product.quantity}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => {}}
                    />
                  </div>
                  <div className="flex mt-5 justify-center gap-1.5">
                    <button
                      disabled={!previewUrl}
                      onClick={handleUpdate}
                      className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
