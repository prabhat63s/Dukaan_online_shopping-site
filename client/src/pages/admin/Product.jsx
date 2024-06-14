import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="lg:w-[85%] p-4 lg:p-0  mx-auto flex flex-col lg:flex-row gap-4 mb-6">
        <div className="lg:w-1/4 w-full ">
          <div className="flex flex-col bg-white lg:border rounded-md gap-4 lg:p-4 lg:px-6">
            <AdminMenu />
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="  mt-4 lg:mt-0 lg:border lg:p-4 rounded-md">
            <h1 className="font-semibold text-xl border-b pb-2">
              Admin Poduct
            </h1>
            <div className="w-full flex flex-col space-y-2">
              <div className=" overflow-x-auto ">
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="text-xs uppercase bg-gray-50">
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
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr className="divide-y hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt={p._id}
                            className="w-14 h-14 rounded-md"
                          />
                        </td>

                        <td className="px-6 py-4">{p.name}</td>
                        <td className="px-6 py-4">{p.price}</td>
                        <td className="px-6 py-4 ">
                          {" "}
                          <p className="truncate w-40"> {p.description}</p>{" "}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="border py-1 px-2 text-white rounded-md bg-emerald-500"
                            onClick={() =>
                              navigate(`/dashboard/admin/product/${p.slug}`)
                            }
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
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
