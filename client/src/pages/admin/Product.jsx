import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

export default function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("https://dukaan-online-shopping-site.onrender.com/api/v1/product/get-product");
      setProducts(data.products);
      // console.log({data});
      toast.success("Products successfully fetched")
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
    <AdminLayout>
      <div className="">
        <h1 className="text-2xl font-semibold mb-6">Admin Product</h1>
          <div className="w-full flex flex-col space-y-2">
            <div className=" overflow-x-auto ">
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs uppercase border bg-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
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
                    <tr className="divide-y hover:bg-white border">
                      <td className="px-4 py-2">
                        <img
                          src={`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-photo/${p._id}`}
                          alt={p._id}
                          className="w-14 h-14 rounded-md"
                        />
                      </td>

                      <td className="px-6 py-4">{p.name}</td>
                      <td className="px-6 py-4">{p.category.name}</td>
                      <td className="px-6 py-4">{p.price}</td>
                      <td className="px-6 py-4 ">
                        {" "}
                        <p className="truncate w-40"> {p.description}</p>{" "}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className="border py-1 px-2 text-white rounded-md bg-red-600 hover:bg-red-500"
                          onClick={() =>
                            navigate(`/dashboard/product/${p.slug}`)
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
    </AdminLayout>
  );
}
