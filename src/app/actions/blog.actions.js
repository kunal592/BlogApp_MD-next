
'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { z } from 'zod'
import { validate } from '@/lib/validation'

const updateBlogSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  image: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['published', 'draft']).optional(),
})

export async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Something went wrong");
  }
}

export async function createBlog(data) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const { title, content, image, tags, status } = data;

    const newBlog = await prisma.blog.create({
      data: {
        title,
        content,
        image,
        tags,
        status,
        author: { connect: { id: session.user.id } },
      },
    });

    return newBlog;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Something went wrong");
  }
}

export async function getBlog(id) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: { author: true },
    })
    if (!blog) {
      throw new Error('Blog not found')
    }
    return blog
  } catch (error) {
    throw error
  }
}

export async function updateBlog(id, data) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    validate(updateBlogSchema, data)

    const blog = await prisma.blog.findUnique({ where: { id } })

    if (!blog) {
      throw new Error('Blog not found')
    }

    if (blog.authorId !== session.user.id) {
      throw new Error('Forbidden')
    }

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data,
    })
    return updatedBlog
  } catch (error) {
    throw error
  }
}

export async function deleteBlog(id) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const blog = await prisma.blog.findUnique({ where: { id } })

    if (!blog) {
      throw new Error('Blog not found')
    }

    if (blog.authorId !== session.user.id) {
      throw new Error('Forbidden')
    }

    await prisma.blog.delete({ where: { id } })
  } catch (error) {
    throw error
  }
}
