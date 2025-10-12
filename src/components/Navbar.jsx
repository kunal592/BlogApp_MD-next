// src/components/Navbar.jsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Navbar(){
  const { currentUser } = useApp()
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-white dark:bg-neutral-900 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold">DevDoc's</Link>
          <Link href="/feed" className="hidden sm:inline text-sm text-slate-600 dark:text-slate-300">Feed</Link>
          <Link href="/admin" className="hidden sm:inline text-sm text-slate-600 dark:text-slate-300">Admin</Link>
          <Link href="/about" className="hidden sm:inline text-sm text-slate-600 dark:text-slate-300">About</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/notifications" className="text-sm text-slate-600 dark:text-slate-300">Notifications</Link>
          <Link href={`/profile/${currentUser.id}`} className="flex items-center gap-2">
            <img src={currentUser.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <span className="hidden sm:inline text-sm">{currentUser.name}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
