import { Router } from "express";
import {
  createBlogController,
  deleteBlogController,
  getBlogController,
  getBlogsController,
} from "../controllers/blog.controller";
import { fileFilter } from "../lib/fileFilter";
import { uploader } from "../lib/multer";
import { validateCreateBlog } from "../types/blog.validator";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.get("/", getBlogsController);
router.get("/:id", getBlogController);
router.post(
  "/",
  verifyToken,
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter,
  validateCreateBlog,
  createBlogController
);
router.delete("/:id", verifyToken, deleteBlogController);

export default router;
