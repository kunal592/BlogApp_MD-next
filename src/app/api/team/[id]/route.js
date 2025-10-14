
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const member = await prisma.teamMember.findUnique({ where: { id } });
    if (!member) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (error) {
    console.error(`Error fetching team member ${id}:`, error);
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, role, bio, avatar } = await req.json();
  try {
    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: { name, role, bio, avatar },
    });
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error(`Error updating team member ${id}:`, error);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.teamMember.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`Error deleting team member ${id}:`, error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
