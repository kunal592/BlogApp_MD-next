
import { NextResponse } from 'next/server'
import { getBlog, updateBlog, deleteBlog } from "@/app/actions/blog.actions";
import { errorHandler } from '@/lib/errorHandler'

export async function GET(request, { params }) {
  try {
    const blog = await getBlog(params.id);
    return new NextResponse(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    if (error.message === 'Blog not found') {
      return new NextResponse(JSON.stringify({ error: 'Blog not found' }), { status: 404 })
    }
    return errorHandler(error)
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const updatedBlog = await updateBlog(params.id, body);
    return new NextResponse(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    if (error.message === 'Blog not found') {
      return new NextResponse(JSON.stringify({ error: 'Blog not found' }), { status: 404 })
    } else if (error.message === 'Forbidden') {
      return new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
    } else if (error.message === 'Unauthorized') {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
    return errorHandler(error)
  }
}

export async function DELETE(request, { params }) {
  try {
    await deleteBlog(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error.message === 'Blog not found') {
      return new NextResponse(JSON.stringify({ error: 'Blog not found' }), { status: 404 })
    } else if (error.message === 'Forbidden') {
      return new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403 })
    } else if (error.message === 'Unauthorized') {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }
    return errorHandler(error)
  }
}
