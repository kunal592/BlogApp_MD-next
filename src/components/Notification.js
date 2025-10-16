
'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const Notification = () => {
    const [notifications, setNotifications] = useState([])
    const { data: session } = useSession()

    useEffect(() => {
        if (session) {
            axios.get('/api/notifications').then(response => {
                setNotifications(response.data)
            })
        }
    }, [session])

    if (!session) {
        return <div>Please log in to see your notifications.</div>
    }

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Notifications</h2>
            {notifications.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">You have no new notifications.</p>
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id} className="mb-4 p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg">
                            <p className="text-gray-800 dark:text-gray-200">{notification.message}</p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(notification.createdAt).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Notification
