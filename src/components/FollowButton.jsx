'use client'
import { useState } from 'react'
import { UserPlus, UserCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <motion.button
      onClick={() => setIsFollowing(!isFollowing)}
      className={`flex items-center justify-center rounded-full font-medium text-sm overflow-hidden focus:outline-none`}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: isFollowing ? '#4f46e5' : '#f3f4f6',
        color: isFollowing ? 'white' : '#374151',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isFollowing ? (
          <motion.div
            key="following"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
            className="flex items-center gap-2"
          >
            <UserCheck size={16} />
            <span>Following</span>
          </motion.div>
        ) : (
          <motion.div
            key="follow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
            className="flex items-center gap-2"
          >
            <UserPlus size={16} />
            <span>Follow</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default FollowButton
