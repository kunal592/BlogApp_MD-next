'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/axios'
import toast from 'react-hot-toast'
import { Trash2, MessageSquare, Mail, User } from 'lucide-react'

export default function QueriesManager() {
  const [queries, setQueries] = useState([])

  useEffect(() => {
    fetchQueries()
  }, [])

  const fetchQueries = async () => {
    try {
      const res = await api.get('/contact')
      setQueries(res.data)
    } catch (error) {
      toast.error('Failed to fetch queries.')
    }
  }

  const resolveQuery = async (id) => {
    try {
      await api.delete(`/contact/${id}`)
      setQueries(queries.filter((query) => query.id !== id))
      toast.success('Query resolved successfully.')
    } catch (error) {
      toast.error('Failed to resolve query.')
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">User Queries</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead className="bg-gray-50 dark:bg-neutral-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Message</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Resolve</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-neutral-800 divide-y divide-gray-200 dark:divide-neutral-700">
            {queries.map((query) => (
              <tr key={query.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{query.name}</div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Mail className="h-4 w-4 mr-1.5" />
                            {query.email}
                        </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-start">
                        <MessageSquare className="h-5 w-5 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{query.message}</p>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => resolveQuery(query.id)} 
                    className="flex items-center text-red-600 hover:text-red-900 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Resolve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
