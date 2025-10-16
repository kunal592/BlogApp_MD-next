import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany();
        return NextResponse.json(messages, { status: 200 });
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
    const { name, email, message } = body;

    const newContactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json(newContactMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
