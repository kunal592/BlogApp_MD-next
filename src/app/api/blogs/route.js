
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content, image, tags, status } = await req.json();

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

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
