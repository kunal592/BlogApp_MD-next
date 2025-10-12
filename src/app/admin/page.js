'use client'
import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import UserList from '../../components/UserList'
import BlogManager from '../../components/BlogManager'
import AnalyticsDashboard from '../../components/AnalyticsDashboard'
import Settings from '../../components/Settings'
import { Shield, Users, FileText, Settings as SettingsIcon } from 'lucide-react'

export default function AdminPage() {
  const { users, blogs, currentUser } = useApp()
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!currentUser?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Access Denied</h1>
          <p className="mt-4">You do not have permission to view this page.</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <AnalyticsDashboard /> },
    { id: 'users', name: 'Users', icon: <Users /> },
    { id: 'blogs', name: 'Blogs', icon: <FileText /> },
    { id: 'settings', name: 'Settings', icon: <SettingsIcon /> },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AnalyticsDashboard />
      case 'users':
        return <UserList users={users} />
      case 'blogs':
        return <BlogManager blogs={blogs} />
      case 'settings':
        return <Settings />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-950">
      <header className="bg-white dark:bg-neutral-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <Shield className="mr-3" />
            Admin Control Center
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          <aside className="w-1/4">
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-6">
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-2 text-left text-lg font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-500 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="w-3/4">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  )
}
