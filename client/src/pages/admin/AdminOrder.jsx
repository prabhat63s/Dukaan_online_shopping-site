import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
import AdminLayout from "./AdminLayout";
import { toast } from "sonner";

const { Option } = Select;

export default function AdminOrder() {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // Fetch orders from API
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/auth/all-orders"
      );
      setOrders(data);
      // console.log({ data });
      toast.success("Orders successfully fetched")
    } catch (error) {
      console.log(error);
      toast.error("Orders failed to be fetched")
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Handle status change
  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `https://dukaan-online-shopping-site.onrender.com/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="">
        <h1 className="text-2xl font-semibold mb-6">All Orders</h1>
        <div className="w-full flex flex-col space-y-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs uppercase bg-white border">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Buyer's Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Items
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id} className="hover:bg-white border">
                    <td className="px-6 py-4">
                      {order?.products?.map((product) => (
                        <div
                          key={product._id}
                          className="flex items-center"
                        >
                          <img
                            src={`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            className="w-14 h-14 rounded-md object-cover m-1"
                          />
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {order?.products.map((product) => (
                        <div key={product._id}>
                          <p className="">{product.name}</p>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      ₹
                      {order?.products.reduce(
                        (total, product) => total + product.price,
                        0
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Select
                        bordered={false}
                        onChange={(value) => handleChange(order._id, value)}
                        defaultValue={order?.status}
                      >
                        {status.map((s) => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td className="px-6 py-4">{order?.buyer?.name}</td>
                    <td className="px-6 py-4">{order?.products?.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order?.payment?.success ? "Success" : "Cash on Delivery"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
