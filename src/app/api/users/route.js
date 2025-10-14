
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { errorHandler } from '@/lib/errorHandler'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req) {
  try {
    const body = await req.json()
    validate(createUserSchema, body)

    const { name, email, password } = body

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
    if (error.code === 'P2002') {
      return new NextResponse(JSON.stringify({ error: 'Email already exists' }), { status: 409 })
    }
    return errorHandler(error)
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      // Exclude password from the result
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return new NextResponse(JSON.stringify(users), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}
