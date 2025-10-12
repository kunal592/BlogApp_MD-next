
'use client';
import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';

const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-end gap-2 mb-4">
      <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-300'}`}>
        <LayoutGrid size={20} />
      </button>
      <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-300'}`}>
        <List size={20} />
      </button>
    </div>
  );
};

export default ViewToggle;
