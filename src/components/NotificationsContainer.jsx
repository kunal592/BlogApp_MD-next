'use client'
import { useState } from 'react'
import NotificationItem from './NotificationItem'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'

const NotificationsContainer = ({ initialNotifications = [] }) => {
    const [notifications, setNotifications] = useState(initialNotifications)
    const { data: session } = useSession()

    const handleDelete = async (id) => {
        // Optimistically remove the notification from the UI
        const optimisticNotifications = notifications.filter(n => n.id !== id)
        setNotifications(optimisticNotifications)

        // Make an API call to delete the notification from the server
        try {
            await fetch(`/api/notifications/${id}`, {
                method: 'DELETE',
            })
        } catch (error) {
            // If the API call fails, revert the UI to its original state
            setNotifications(notifications)
            console.error('Failed to delete notification:', error)
        }
    }

    const handleReply = (id, message) => {
        // Implement reply functionality here
        console.log(`Replying to notification ${id} with message: ${message}`)
    }

    if (!session) {
        return (
            <div className="text-center">
                <p className="text-lg text-gray-500 dark:text-gray-400">Please log in to view your notifications.</p>
            </div>
        )
    }

    if (notifications.length === 0) {
        return (
            <div className="text-center">
                <p className="text-lg text-gray-500 dark:text-gray-400">You have no new notifications.</p>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
        >
            <AnimatePresence>
                {notifications.map(notification => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                    >
                        <NotificationItem
                            notification={notification}
                            onDelete={handleDelete}
                            onReply={handleReply}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    )
}

export default NotificationsContainer