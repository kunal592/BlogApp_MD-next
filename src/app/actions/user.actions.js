
'use server'
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function createUser(data) {
  try {
    validate(createUserSchema, data)

    const { name, email, password } = data

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return newUser
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('Email already exists')
    }
    throw error
  }
}

export async function getUsers() {
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
    return users
  } catch (error) {
    throw error
  }
}
