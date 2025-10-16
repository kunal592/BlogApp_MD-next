
import { NextResponse } from "next/server";
import { getBlogs, createBlog } from "@/app/actions/blog.actions";

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newBlog = await createBlog(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.message === "Unauthorized" ? 401 : 500 });
  }
}
