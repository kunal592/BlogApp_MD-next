// src/app/admin/page.js
'use client'
import DashboardStats from '../../components/DashboardStats'
import { useApp } from '../../context/AppContext'

export default function AdminPage() {
  const { blogs, users } = useApp()

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h4 className="font-semibold">Recent Blogs</h4>
          <ul className="mt-3 space-y-2">
            {blogs.slice(0,5).map(b => <li key={b.id} className="text-sm">{b.title} — {b.createdAt}</li>)}
          </ul>
        </div>

        <div className="card">
          <h4 className="font-semibold">Recent Users</h4>
          <ul className="mt-3 space-y-2">
            {users.slice(0,5).map(u => <li key={u.id} className="text-sm">{u.name} — {u.followers} followers</li>)}
          </ul>
        </div>
      </div>

      <div className="card">
        <h4 className="font-semibold">Analytics (placeholder)</h4>
        <p className="text-sm text-slate-500 mt-2">Placeholder chart — integrate charting library (recharts / chart.js) later.</p>
      </div>
    </section>
  )
}
