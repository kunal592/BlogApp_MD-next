'use client'
import React from 'react'

export default function Settings() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Site Settings</h2>
      <form>
        <div className="space-y-6">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Name</label>
            <input
              type="text"
              id="siteName"
              defaultValue="My Awesome Blog"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="postsPerPage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Posts Per Page</label>
            <input
              type="number"
              id="postsPerPage"
              defaultValue={10}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center">
            <input
              id="allowComments"
              name="allowComments"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-neutral-700 rounded"
            />
            <label htmlFor="allowComments" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Allow comments on posts</label>
          </div>
        </div>
        <div className="mt-8 pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
