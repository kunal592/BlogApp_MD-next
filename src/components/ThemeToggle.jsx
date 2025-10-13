'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <motion.div 
      className="w-16 h-8 flex items-center bg-gray-200 dark:bg-neutral-800 rounded-full p-1 cursor-pointer"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-6 h-6 rounded-full flex items-center justify-center bg-white dark:bg-neutral-700 shadow-md"
          layout
          style={{ marginLeft: theme === 'dark' ? 'auto' : '0' }}
        >
          {theme === 'dark' ? 
            <Moon size={16} className="text-yellow-400" /> : 
            <Sun size={16} className="text-yellow-500" />
          }
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default ThemeToggle
