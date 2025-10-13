'use client'
import { useState, useCallback } from 'react'
import { Hand } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ClapButton = ({ initialClaps = 0 }) => {
  const [clapCount, setClapCount] = useState(initialClaps)
  const [isClapping, setIsClapping] = useState(false)

  const handleClap = useCallback(() => {
    setClapCount(prev => prev + 1)
    setIsClapping(true)
  }, [])

  return (
    <div className="flex items-center space-x-4">
      <motion.button
        onClick={handleClap}
        onAnimationComplete={() => setIsClapping(false)}
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500 text-white shadow-lg focus:outline-none"
        whileTap={{ scale: 1.1 }}
      >
        {isClapping && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0 }}
              animate={{ opacity: 0, y: -40, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className="absolute text-2xl font-bold"
            >
              +1
            </motion.div>
          </AnimatePresence>
        )}
        <Hand size={32} />
      </motion.button>
      <div className="relative">
        <AnimatePresence>
          <motion.span
            key={clapCount}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-gray-800 dark:text-gray-200"
          >
            {clapCount}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ClapButton;