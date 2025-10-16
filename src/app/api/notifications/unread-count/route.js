
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'

export async function GET(request) {
  try {
    const session = await verifySession()
    const unreadCount = await prisma.notification.count({
      where: {
        toUserId: session.user.id,
        isRead: false,
      },
    })
    return new NextResponse(JSON.stringify({ count: unreadCount }), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}
