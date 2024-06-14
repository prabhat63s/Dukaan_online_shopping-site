import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

export default function AdminOrder() {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="lg:w-[85%] min-h-screen p-4 lg:p-0  mx-auto flex flex-col lg:flex-row gap-4 mb-6">
        <div className="lg:w-1/4 w-full ">
          <div className="flex flex-col bg-white lg:border rounded-md gap-4 lg:p-4 lg:px-6">
            <AdminMenu />
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="  lg:border lg:p-4 rounded-md">
            <h1 className="font-semibold text-xl border-b pb-2">All Orders</h1>
            <div className="w-full flex flex-col space-y-2">
              <div className=" overflow-x-auto ">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs uppercase bg-gray-50">
                    <tr>
                      <div className="flex justify-between items-center col">
                        <th scope="col" className="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                      </div>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Buyer's name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total items
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Payment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((o, i) => {
                      return (
                        <tr className="bg-white border-b divide-y hover:bg-gray-50">
                          {o?.products?.map((p, i) => (
                            <div className="flex justify-between" key={p._id}>
                              <th
                                scope="row"
                                className="flex items-center px-4 py-2 font-medium  whitespace-nowrap"
                              >
                                <img
                                  src={`/api/v1/product/product-photo/${p._id}`}
                                  alt={p._id}
                                  className="w-auto h-8 mr-3 rounded-md"
                                />
                              </th>
                              <td className="w-60">{p.name}</td>
                              <td className="px-6 py-4">₹{p.price}</td>
                            </div>
                          ))}
                          <td className="px-6 py-4">
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td className="px-6 py-4">{o?.buyer?.name}</td>

                          <td className="px-6 py-4 ">{o?.products?.length}</td>
                          <td className="px-6 py-4 ">
                            {o?.payment.success ? "Success" : "Failed"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
