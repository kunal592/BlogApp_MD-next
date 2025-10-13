
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { errorHandler } from '@/lib/errorHandler'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return new NextResponse(JSON.stringify(users), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return new NextResponse(JSON.stringify({ error: 'Name, email, and password are required' }), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return new NextResponse(JSON.stringify(newUser), { status: 201 })
  } catch (error) {
    return errorHandler(error)
  }
}
