'use client'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Mail, Phone, MapPin, Send, Loader } from 'lucide-react'
import { api } from '@/lib/axios'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e?.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      await api.post('/contact', { name, email, message });
      toast.success('Message sent successfully! We will get back to you soon.')
      setName(''); setEmail(''); setMessage('')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            We'd love to hear from you! Whether you have a question about our blog, feedback, or just want to say hello, please don't hesitate to reach out.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 shadow-xl rounded-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="px-6 py-10 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Get in Touch</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Fill in the form to send us a message.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-neutral-700 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-neutral-600 focus:ring-0 text-gray-900 dark:text-white"
                  placeholder="Your Name"
                  required
                  type="text"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-neutral-700 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-neutral-600 focus:ring-0 text-gray-900 dark:text-white"
                  placeholder="Your Email"
                  required
                  type="email"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-neutral-700 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-neutral-600 focus:ring-0 text-gray-900 dark:text-white"
                  rows="5"
                  placeholder="Your Message"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                  {loading ? <Loader className="animate-spin h-5 w-5 mr-3" /> : <Send className="h-5 w-5 mr-3" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
          <div className="px-6 py-10 sm:p-10 bg-indigo-50 dark:bg-indigo-900/20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Contact Information</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Alternatively, you can contact us via one of the following methods:
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
                  <a href="mailto:contact@myblog.com" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                    contact@myblog.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">Phone</h3>
                  <a href="tel:+1234567890" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">123 Blog Street, Webville, Internet</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
