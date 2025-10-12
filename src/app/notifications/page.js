// src/app/notifications/page.js
'use client'
import { useApp } from '../../context/AppContext'

export default function NotificationsPage() {
  const { notifications, markAllNotificationsRead } = useApp()
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button className="btn bg-gray-600" onClick={markAllNotificationsRead}>Mark all as read</button>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`card ${n.read ? '' : 'border-l-4 border-indigo-600'}`}>
            <div className="flex items-center justify-between">
              <div>{n.text}</div>
              <div className="text-xs text-slate-500">{new Date(n.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
