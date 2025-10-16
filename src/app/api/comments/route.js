
import { NextResponse } from "next/server";
import { createComment, getComments } from "@/app/actions/comment.actions";
import { errorHandler } from '@/lib/errorHandler'

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const blogId = searchParams.get('blogId');

  try {
    const comments = await getComments(blogId);
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newComment = await createComment(body);
    return new NextResponse(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
