import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import CategoryForm from "../../components/form/CategoryForm";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("somthing went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
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

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout>
      <div className="lg:w-[85%] p-4 lg:p-0  mx-auto flex flex-col lg:flex-row gap-4 mb-6">
        <div className="lg:w-1/4 w-full ">
          <div className="flex flex-col bg-white lg:border rounded-md gap-4 lg:p-4 lg:px-6">
            <AdminMenu />
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 lg:w-3/4">
          <div className=" border p-4 rounded-md">
            <h1 className="font-semibold text-xl border-b pb-2">
              Add Category
            </h1>
            <div className="flex flex-col space-y-2">
              <div className="">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                  actions="Add Category"
                />
              </div>
            </div>
          </div>
          <div className="border rounded-md">
            <table className="w-[100%] mb-2 text-[14px]">
              <thead className=" font-medium rounded-md bg-gray-50 border-b">
                <tr className="flex justify-between">
                  <th className="px-6 py-4">Category name</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr
                    key={cat.name}
                    className="flex justify-between border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4"> {cat.name} </td>
                    <td className="flex space-x-2 px-4 py-4">
                      <button
                        title="Delete"
                        onClick={() => {
                          window.confirm("Are you sure to delete?") &&
                            handleDelete(cat._id);
                        }}
                        className="hover:text-red-400"
                      >
                        <MdOutlineDelete size={24} />
                      </button>
                      <button
                        title="Edit"
                        className="hover:text-emerald-400"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(cat.name);
                          setSelected(cat);
                        }}
                      >
                        <MdOutlineEdit size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
            >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
              actions="Update"
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}
