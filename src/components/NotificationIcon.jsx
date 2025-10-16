
'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Bell } from 'lucide-react'

const NotificationIcon = () => {
    const { data: session } = useSession()
    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        if (session) {
            const fetchUnreadCount = async () => {
                try {
                    const res = await fetch('/api/notifications/unread-count')
                    if (res.ok) {
                        const data = await res.json()
                        setUnreadCount(data.count)
                    }
                } catch (error) {
                    console.error('Failed to fetch unread notification count:', error)
                }
            }

            fetchUnreadCount()
            const interval = setInterval(fetchUnreadCount, 60000) // Poll every minute

            return () => clearInterval(interval)
        }
    }, [session])

    return (
        <Link href="/notifications" className="relative mr-4">
            <Bell className="text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {unreadCount}
                </span>
            )}
        </Link>
    )
}

export default NotificationIcon
