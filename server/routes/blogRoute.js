import express from "express";
import {
  blogPhoto,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingle,
} from "../controllers/blogController.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

router.post("/create-blog", formidable(), createBlog);
router.get("/all-blog", getAllBlogs);
router.get("/single-blog/:id", getSingle);
router.get("/photo-blog/:id", blogPhoto);
router.delete("/delete-blog/:id", deleteBlog);

export default router;
