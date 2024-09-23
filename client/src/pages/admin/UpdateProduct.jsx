import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import AdminLayout from "./AdminLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://dukaan-online-shopping-site.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://dukaan-online-shopping-site.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `https://dukaan-online-shopping-site.onrender.com/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      await axios.delete(`https://dukaan-online-shopping-site.onrender.com/api/v1/product/delete-product/${id}`);
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AdminLayout>
      <div className="w-fullmt-4 lg:mt-0">
        <h1 className="text-2xl font-semibold mb-6">Update Product</h1>
        <div className="flex flex-col space-y-2">
          {/* add product form */}
          <form className="space-y-4 py-4 ">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* select categories  */}
              <select
                id="select"
                name="category"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>--select product--</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* product name */}

              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
              />
            </div>
            {/* add photo  */}
            <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
              <div className="text-center flex flex-col items-center justify-center rounded-md shadow-sm border border-dashed w-full lg:w-[50%] bg-white">
                {photo ? (
                  <>
                    {photo && (
                      <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          className="w-36 rounded-md shadow-md"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <MdOutlinePhotoSizeSelectActual className="mx-auto h-12 w-12 text-gray-light" />
                    <div className="mt-2 flex text-[12px] text-gray">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-gray"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 1MB
                    </p>
                  </>
                )}
              </div>
              <div className="text-center flex items-center justify-center rounded-md shadow-sm border border-dashed w-full lg:w-[50%] bg-white">
                <img
                  src={`https://dukaan-online-shopping-site.onrender.com/api/v1/product/product-photo/${id}`}
                  alt="product_photo"
                  className="h-40"
                />
              </div>
            </div>

            {/* Description Editor and Preview */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6 h-60">
              {/* Rich Text Editor */}
              <div className="w-full lg:w-1/2 bg-white">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder="Enter product description"
                  className="h-48"
                />
              </div>
              {/* Description Preview */}
              <div className="w-full lg:w-1/2 border rounded-xl bg-white p-4 overflow-auto">
                <h3 className="text-lg font-semibold mb-2">Preview</h3>
                {description ? (
                  <div
                    className=" max-w-none"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                ) : (
                  <p className="text-gray-400">
                    Description preview will appear here...
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* price */}
              <input
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
              />
              {/* quantity */}
              <input
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter product quantity"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
              />
              {/* shipping */}
              <select
                id="select"
                name="shipping"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 "
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                <option>--Shipping--</option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex w-full lg:w-fit justify-center rounded-md bg-red-600 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-white shadow-sm hover:bg-red-500 "
                onClick={handleUpdate}
              >
                Update product
              </button>
              <button
                type="submit"
                className="flex w-full lg:w-fit justify-center rounded-md border border-red-600 py-3 lg:py-2 px-2 text-[14px] font-semibold leading-6 text-black shadow-sm hover:bg-red-600 hover:text-white"
                onClick={() => {
                  window.confirm("Are you sure to delete?") && handleDelete();
                }}
              >
                Delete
              </button>
            </div>
          </form>
          {/* add product form end*/}
        </div>
      </div>
    </AdminLayout>
  );
}
