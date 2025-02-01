import { cloudinaryUpload } from "../../lib/cloudinary";
import prisma from "../../lib/prisma";

interface CreateBlogBody {
    title: string;
    description: string;
    category: string;
    content: string;
}

export const createBlogService = async (
  body: CreateBlogBody,
  thumbnail: Express.Multer.File,
  userId: number
) => {
  try {
    const { title, description, category, content } = body;

    const blog = await prisma.blog.findFirst({
      where: { title },
    });

    if(blog){
      throw new Error("Blog already exists");
    }

    const {secure_url} = await cloudinaryUpload(thumbnail);

    await prisma.blog.create({
      data: {
        ...body,
        thumbnail: secure_url,
        userId: userId
      },
    })
  } catch (error) {
    throw error;
  }
};
