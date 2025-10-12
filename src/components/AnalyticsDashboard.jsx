'use client'
import React from 'react'

export default function AnalyticsDashboard() {
  // Dummy data for now
  const stats = [
    { name: 'Total Users', stat: '1,200' },
    { name: 'Total Posts', stat: '560' },
    { name: 'Total Comments', stat: '2,300' },
    { name: 'Likes', stat: '10,500' },
  ]

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Site Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => (
                <div key={item.name} className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{item.name}</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{item.stat}</dd>
                </div>
            ))}
        </div>
    </div>
  )
}
