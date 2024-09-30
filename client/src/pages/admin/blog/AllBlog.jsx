import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import axios from "axios";

export default function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://dukaan-online-shopping-site.onrender.com/api/v1/blog/all-blog"
        );
        setBlogs(response.data.blogs);
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Function to delete a blog
  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(
          `https://dukaan-online-shopping-site.onrender.com/api/v1/blog/delete-blog/${id}`
        );
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } catch (err) {
        setError("Error deleting blog. Please try again.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="">
        <h1 className="text-2xl font-semibold mb-6">All Blogs</h1>
        {loading && <p className="text-gray-500">Loading blogs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full flex flex-col space-y-2">
          <div className=" overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs uppercase border bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Content
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr className="divide-y hover:bg-white border">
                    <td className="px-4 py-2">
                      <img
                        src={`https://dukaan-online-shopping-site.onrender.com/api/v1/blog/photo-blog/${b._id}`}
                        alt={b._id}
                        className="w-14 h-14 rounded-md"
                      />
                    </td>

                    <td className="px-6 py-4">{b.title}</td>
                    <td className="px-6 py-4">{b.content.substring(0, 100)}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => deleteBlog(b._id)}
                      >
                        Delete
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
