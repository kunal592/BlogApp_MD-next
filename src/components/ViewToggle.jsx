
'use client';
import { LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';

const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="relative flex items-center bg-gray-200 dark:bg-neutral-800 rounded-full p-1">
      <motion.div
        className="absolute h-8 w-8 bg-indigo-600 rounded-full"
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ left: viewMode === 'grid' ? '0.25rem' : 'calc(100% - 2.25rem)' }}
      />
      <button
        onClick={() => setViewMode('grid')}
        className="relative z-10 p-2 rounded-full"
      >
        <LayoutGrid size={20} className={viewMode === 'grid' ? 'text-white' : 'text-gray-700 dark:text-gray-300'} />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className="relative z-10 p-2 rounded-full"
      >
        <List size={20} className={viewMode === 'list' ? 'text-white' : 'text-gray-700 dark:text-gray-300'} />
      </button>
    </div>
  );
};

export default ViewToggle;
