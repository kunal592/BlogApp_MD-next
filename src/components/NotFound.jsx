
import React from 'react';

export default function NotFound({ message }) {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{message}</p>
    </div>
  );
}
