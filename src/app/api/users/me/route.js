
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  bio: z.string().optional(),
  image: z.string().url().optional(),
})

export async function GET(request) {
  try {
    const session = await verifySession()
    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    return new NextResponse(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}

export async function PUT(request) {
  try {
    const session = await verifySession()
    const body = await request.json()
    validate(updateUserSchema, body)

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: body,
    })
    return new NextResponse(JSON.stringify(updatedUser), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}
