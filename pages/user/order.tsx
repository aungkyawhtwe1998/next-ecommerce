import { GetServerSideProps, NextPage } from "next";
// import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Categories, Category, Product, Products } from "../../type";
import apiInstance from "../../lib/url";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../features/customer/CustomerSlice";

interface Order {
  orderId: string;
  customerId: number;
  id: number;
  createdAt: string;
  order_item: Item[];
  customer: Customer;
  status: string;
}
interface Item {
  productCount: number;
  productName: string;
  productPrice: number;
}

interface Customer {
  email: string;
  id: number;
  name: string;
}
const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { data, status } = useSession();
  const customerId = useSelector(selectCustomer);
  console.log("customer", customerId);
  useEffect(() => {
    getOrder();
  }, []);
  async function getOrder() {
    try {
      let result = await apiInstance.get<Order[]>(
        `http://localhost:3000/api/orders/get`,
        { params: { customerId: 2 } }
      );
      console.log(result.data);
      setOrders(result.data);
      console.log("orders", orders);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />

      <div className="container px-4 mx-auto">
        <div className="flex justify-between mb-2">
          <h1 className="w- text-center font-bold text-2xl">Orders</h1>
        </div>

        <div className="flex items-start justify-center">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    Product
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-32 p-4">
                      {/* <img
                        width={30}
                        height={30}
                        alt="Apple Watch"
                      /> */}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <ul>
                        {order.order_item.map((item, i) => (
                          <li key={i}>
                            {item.productName} x {item.productCount}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4">{order.status}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {order.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-red-600 dark:text-red-500 hover:underline">
                        Cancel
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderPage;
