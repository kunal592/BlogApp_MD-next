// src/components/Sidebar.jsx
'use client'
import { useState } from 'react'

export default function Sidebar({ tags = [], onSearch }) {
  const [q, setQ] = useState('')
  return (
    <aside className="hidden lg:block">
      <div className="card sticky top-24 space-y-4">
        <div>
          <input
            value={q}
            onChange={e => { setQ(e.target.value); onSearch?.(e.target.value) }}
            placeholder="Search blogs..."
            className="w-full p-2 rounded-md border"
          />
        </div>
        <div>
          <h4 className="font-semibold mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => <span key={t} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-neutral-800 text-sm">{t}</span>)}
          </div>
        </div>
      </div>
    </aside>
  )
}
