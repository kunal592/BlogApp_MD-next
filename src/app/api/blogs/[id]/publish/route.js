
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        status: "published",
      },
    });
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error publishing blog:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
