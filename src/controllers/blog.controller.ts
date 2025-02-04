import { NextFunction, Request, Response } from "express";
import { createBlogService } from "../services/blog/create-blog.service";
import { getBlogService } from "../services/blog/get-blog.service";
import { getBlogsService } from "../services/blog/get-blogs.service";
import { deleteBlogService } from "../services/blog/delete-blog.service";

export const getBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = {
      take: parseInt(req.query.take as string) || 6,
      page: parseInt(req.query.page as string) || 1,
      sortBy: (req.query.sortBy as string) || "createdAt",
      sortOrder: (req.query.sortOrder as string) || "desc",
      search: (req.query.search as string) || "",
    };
    const result = await getBlogsService(query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const getBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = parseInt(req.params.id);
    const result = await getBlogService(blogId);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};


export const createBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const result = await createBlogService(
      req.body,
      files.thumbnail?.[0],
      res.locals.user.id
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = Number(req.params.id);
    const userId = Number(res.locals.user.id);
    const result = await deleteBlogService(blogId, userId);
    res.status(204).send(result);
  } catch (error) {
    next(error);
  }
};

