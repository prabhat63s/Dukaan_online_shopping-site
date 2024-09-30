import React, { useState } from "react";
import AdminLayout from "../AdminLayout";
import axios from "axios";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!title || !content) {
      toast.error("Title and content are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/blog/create-blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/dashboard/all-blog");

      // Reset form fields
      setTitle("");
      setContent("");
      setPhoto(null);
    } catch (err) {
      toast.error(err.response?.data?.error || "Error creating blog.");
    }
  };

  return (
    <AdminLayout>
      <div >
        <h1 className="text-2xl font-semibold mb-6">Create Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium pb-4">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md w-full p-2"
              required
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:min-h-60">
            {/* Rich Text Editor */}
            <div className="w-full lg:w-1/2">
              <label htmlFor="content" className="block font-medium pb-4">
                Content
              </label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Enter blog content here"
                className="h-56 bg-white pb-5"
              />
            </div>
            {/* Description Preview */}
            <div className="w-full lg:w-1/2">
              <h3 className=" mb-4">Preview</h3>
              <div className="w-full h-56 border bg-white p-4 overflow-auto">
                {content ? (
                  <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <p className="text-gray-400">
                    Content preview will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="photo" className="block font-medium py-4">
              Upload Image
            </label>
            <input
              type="file"
              id="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="border rounded-md w-full p-2"
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="flex w-full lg:w-fit justify-center rounded-md bg-red-600 py-3 lg:py-2 px-4 font-semibold leading-6 text-white shadow-sm hover:bg-red-500"
          >
            Create Blog
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
