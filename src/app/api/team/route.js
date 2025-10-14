
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany();
    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, role, bio, avatar } = await req.json();
    if (!name || !role || !bio) {
      return NextResponse.json({ error: "Name, role, and bio are required" }, { status: 400 });
    }
    const newMember = await prisma.teamMember.create({
      data: { name, role, bio, avatar },
    });
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
