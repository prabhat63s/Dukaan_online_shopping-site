import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://dukaan-online-shopping-site.onrender.com/api/v1/blog/all-blog"
      );
      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to fetch blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          {/* <Spinner /> */}
        </div>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="w-full hover:opacity-80">
              <img
                src={`https://dukaan-online-shopping-site.onrender.com/api/v1/blog/photo-blog/${blog._id}`}
                alt="Blog Cover"
                className="rounded-xl w-full h-44 object-cover"
                style={{ minHeight: "250px" }}
              />
              <h2 className="text-lg font-medium pt-4">{blog.title}</h2>
              <div className="flex justify-between items-center">
                <Link
                  to={`/blog-detail/${blog._id}`}
                  className="px-4 py-3 w-fit gap-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Read more
                </Link>
                <p className="text-xs text-neutral-400">
                  {new Date(blog.createdAt).toLocaleDateString()}{" "}
                  {new Date(blog.createdAt).toLocaleTimeString()}{" "}
                </p>{" "}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
