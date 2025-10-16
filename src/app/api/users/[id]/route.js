import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        followers: true,
        following: true,
        bookmarks: {
          include: {
            blog: true,
          },
        },
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
