import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await prisma.contactMessage.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "Message deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
