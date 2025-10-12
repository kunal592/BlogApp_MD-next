'use client'

export default function Sidebar({ tags = [], onTagClick }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-6">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Filter by Tag</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <button 
                key={t} 
                onClick={() => onTagClick(t)}
                className="px-3 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
