
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { id } = req.query

  if (req.method === 'DELETE') {
    const notification = await prisma.notification.findUnique({
        where: { id },
    });

    if (!notification || notification.userId !== session.user.id) {
        return res.status(404).json({ message: 'Notification not found' });
    }

    await prisma.notification.delete({
      where: { id },
    })

    return res.status(204).end()
  }

  res.setHeader('Allow', ['DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
