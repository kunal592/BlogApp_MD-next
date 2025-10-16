
'use client'
import { motion } from 'framer-motion'
import { LayoutGrid, List } from 'lucide-react'
import { cn } from '@/lib/utils'

const ViewToggle = ({ layout, setLayout }) => {
    return (
        <div className="flex items-center gap-2">
            <motion.button
                onClick={() => setLayout('grid')}
                className={cn(
                    "p-2 rounded-md transition-colors",
                    layout === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <LayoutGrid />
            </motion.button>
            <motion.button
                onClick={() => setLayout('list')}
                className={cn(
                    "p-2 rounded-md transition-colors",
                    layout === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <List />
            </motion.button>
        </div>
    )
}

export default ViewToggle
