import fs from "fs";
import Blog from "../models/blogModel.js";

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.fields;
    const { photo } = req.files;

    // Validation
    if (!title || !content) {
      return res.status(400).send({ error: "Title and content are required." });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Image should be less than 1MB." });
    }

    const blog = new Blog({
      title,
      content,
      photo: {},
    });

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }

    await blog.save();

    res.status(201).send({
      success: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating blog",
    });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).select("-photo").sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: blogs.length,
      message: "All Blogs found successfully",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting blogs",
      error: error.message,
    });
  }
};

// Get single blog
export const getSingle = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).select("-photo");

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single blog fetched",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single blog",
      error,
    });
  }
};

// Get blog photo
export const blogPhoto = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select("photo");
    if (blog.photo.data) {
      res.set("Content-type", blog.photo.contentType);
      return res.status(200).send(blog.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting blog photo",
      error,
    });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};