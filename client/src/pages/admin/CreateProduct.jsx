import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import AdminLayout from "./AdminLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AdminLayout>
      <div className="">
        <h1 className="text-2xl font-semibold mb-6">Create Product</h1>

        <div className="flex flex-col space-y-2">
          {/* Add product form */}
          <form className="space-y-4 py-4" onSubmit={handleCreate}>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Select categories */}
              <select
                id="select"
                name="category"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">--Select Category--</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* Product name */}
              <input
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
              />
            </div>

            {/* Photo Upload Section */}
            <div className="flex justify-center rounded-xl border bg-white border-dashed border-gray-light p-6">
              <div className="text-center">
                {photo ? (
                  <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="w-36 h-36 object-cover rounded-md shadow-md"
                    />
                    {/* Button to remove photo */}
                    <button
                      onClick={() => setPhoto(null)}
                      className="text-red-500 text-sm"
                    >
                      Remove Photo
                    </button>
                  </div>
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
            </div>

            {/* Description Editor and Preview */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6 h-60">
              {/* Rich Text Editor */}
              <div className="w-full lg:w-1/2 ">
                <ReactQuill
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  placeholder="Enter product description"
                  className="h-48 bg-white"
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
              {/* Price */}
              <input
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
              />
              {/* Quantity */}
              <input
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter product quantity"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
              />
              {/* Shipping */}
              <select
                id="shipping"
                name="shipping"
                className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                <option value="">--Shipping--</option>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
            <button
              type="submit"
              className="flex w-full lg:w-fit justify-center rounded-md bg-red-600 py-3 lg:py-2 px-4 font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
            >
              Add Product
            </button>
          </form>
          {/* Add product form end */}
        </div>
      </div>
    </AdminLayout>
  );
}
