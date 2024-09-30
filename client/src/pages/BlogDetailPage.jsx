import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout/Layout";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  // Fetch single blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!id) {
          throw new Error("Blog ID is missing in params");
        }

        const response = await axios.get(
          `https://dukaan-online-shopping-site.onrender.com/api/v1/blog/single-blog/${id}`
        );
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
        toast.error("Failed to fetch the blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Fetch all blogs
  const fetchAllBlogs = async () => {
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
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <Layout>
      <div className="w-full lg:max-w-7xl m-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <Spinner />
          </div>
        ) : blog ? (
          <>
            <p className="text-sm bg-red-50 text-center py-3 px-4 w-fit rounded-xl text-gray-500 my-8">
              Published on:{" "}
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
            <div className="w-full flex flex-col lg:flex-row gap-8">
              {/* Main Blog Content */}
              <div className="w-full lg:w-[70%] flex flex-col gap-6">
                <h1 className="text-2xl font-semibold m-0">{blog.title}</h1>
                <div className="w-full flex items-center justify-center">
                  <img
                    src={`https://dukaan-online-shopping-site.onrender.com/api/v1/blog/photo-blog/${blog._id}`}
                    alt="Blog Cover"
                    className="rounded-xl border border-neutral-800 w-full lg:h-fit object-cover"
                  />
                </div>
                <div
                  className="leading-6"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>
              </div>

              {/* Blog Sidebar */}
              <div className="w-full lg:w-[30%] space-y-6">
                <h3 className="text-xl font-semibold mb-4">Related Blogs</h3>
                <div className="flex flex-col gap-6">
                  {blogs.map((relatedBlog) => (
                    <Link
                      to={`/blog-detail/${relatedBlog._id}`}
                      key={relatedBlog._id}
                      className="flex gap-4 items-center bg-gray-50 hover:bg-red-50 rounded-xl p-4"
                    >
                      <img
                        src={`https://dukaan-online-shopping-site.onrender.com/api/v1/blog/photo-blog/${relatedBlog._id}`}
                        alt="Blog Cover"
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{relatedBlog.title}</h4>
                        <p className="text-xs m-0">
                          {new Date(relatedBlog.createdAt).toLocaleDateString()} -{" "}
                          {new Date(relatedBlog.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Blog not found.</p>
        )}
      </div>
    </Layout>
  );
}
