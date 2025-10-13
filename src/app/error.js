'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Something went wrong!</h2>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        Try again
      </button>
    </div>
  )
}
