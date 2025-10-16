
'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Sidebar = ({ tags, onTagClick, selectedTag, className }) => {
    return (
        <motion.div 
            className={cn("w-full md:w-1/4 p-4 bg-gray-50 dark:bg-neutral-900 rounded-lg shadow-md", className)}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-lg font-bold mb-4">Filter by Tag</h3>
            <ul className="flex flex-wrap gap-2">
                <li>
                        <button 
                            onClick={() => onTagClick(null)} 
                            className={cn(
                                "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                                !selectedTag ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600'
                            )}
                        >
                            All
                        </button>
                    </li>
                {tags.map(tag => (
                    <li key={tag}>
                        <button 
                            onClick={() => onTagClick(tag)} 
                            className={cn(
                                "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                                selectedTag === tag ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600'
                            )}
                        >
                            {tag}
                        </button>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}

export default Sidebar
