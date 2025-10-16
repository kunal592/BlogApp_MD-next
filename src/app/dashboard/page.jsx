'use client'
import { useEffect, useState } from 'react'
import { useApp } from '@/context/AppContext'
import { api } from '@/lib/axios'
import Dashboard from '@/components/Dashboard'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { currentUser } = useApp()
  const [userBlogs, setUserBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    } else {
      fetchUserBlogs()
    }
  }, [currentUser])

  const fetchUserBlogs = async () => {
    try {
      const res = await api.get(`/blogs?authorId=${currentUser.id}`)
      setUserBlogs(res.data)
    } catch (error) {
      console.error("Failed to fetch user blogs", error)
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>
  }

  return <Dashboard userBlogs={userBlogs} />
}
