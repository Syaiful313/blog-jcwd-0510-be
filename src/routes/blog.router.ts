import { Router } from "express";
import {
  createBlogController,
  getBlogsController,
} from "../controllers/blog.controller";
import { fileFilter } from "../lib/fileFilter";
import { uploader } from "../lib/multer";
import { validateCreateBlog } from "../types/blog.validator";
import { verifyToken } from "../lib/jwt";

const router = Router();

router.get("/", getBlogsController);
router.post(
  "/",
  verifyToken,
  uploader().fields([{ name: "thumbnail", maxCount: 1 }]),
  fileFilter,
  validateCreateBlog,
  createBlogController
);

export default router;
