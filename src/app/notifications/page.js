'use client'
import { useApp } from '../../context/AppContext'
import NotificationItem from '../../components/NotificationItem'

export default function NotificationsPage() {
  const { notifications, markAllNotificationsRead } = useApp()
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700" onClick={markAllNotificationsRead}>Mark all as read</button>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map(n => <NotificationItem key={n.id} notification={n} />)
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400">You have no new notifications.</p>
          </div>
        )}
      </div>
    </section>
  )
}
