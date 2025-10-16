
'use client'
import { motion } from 'framer-motion'

const Sidebar = ({ tags, onTagClick }) => {
    return (
        <motion.div 
            className="w-1/4 p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg shadow-md mr-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-lg font-bold mb-4">Filter by Tag</h3>
            <ul>
                {tags.map(tag => (
                    <li key={tag} className="mb-2">
                        <button 
                            onClick={() => onTagClick(tag)} 
                            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
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
