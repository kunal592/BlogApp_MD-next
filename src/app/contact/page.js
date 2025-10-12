// src/app/contact/page.js
'use client'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e?.preventDefault()
    setLoading(true)
    // simulate send
    setTimeout(() => {
      setLoading(false)
      toast.success('Message sent successfully')
      setName(''); setEmail(''); setMessage('')
    }, 700)
  }

  return (
    <section>
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Contact</h1>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm">Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 rounded border" required/>
          </div>

          <div>
            <label className="text-sm">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 rounded border" required type="email"/>
          </div>

          <div>
            <label className="text-sm">Message</label>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} className="w-full p-2 rounded border" rows="6" required/>
          </div>

          <div className="flex justify-end">
            <button className="btn" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
          </div>
        </form>
      </div>
    </section>
  )
}
