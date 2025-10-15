
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import NotificationsContainer from '@/components/NotificationsContainer'

async function getNotifications(userId) {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return JSON.parse(JSON.stringify(notifications));
}

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const notifications = await getNotifications(session.user.id);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <NotificationsContainer initialNotifications={notifications} />
    </section>
  )
}
