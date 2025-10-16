'use client'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function SignupPage() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
      <div className="flex max-w-4xl w-full bg-white dark:bg-neutral-900 shadow-md rounded-lg overflow-hidden">
        <div className={`w-1/2 p-8 bg-indigo-600 text-white flex flex-col justify-center transition-all duration-1000 ease-in-out ${animate ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-full'}`}>
          <h2 className="text-4xl font-extrabold mb-4">Welcome to DevDoc’s</h2>
          <p className="mb-8">Where Developers Share, Learn & Grow Together.</p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-xl mr-4">&#10003;</span>
              <span><strong>AI-Powered Summaries:</strong> Get the gist of any article instantly.</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-4">&#10003;</span>
              <span><strong>Markdown Editor:</strong> Write and format your posts with ease.</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-4">&#10003;</span>
              <span><strong>Community Driven:</strong> Connect with other developers and share your knowledge.</span>
            </li>
          </ul>
        </div>
        <div className={`w-1/2 p-8 transition-all duration-1000 ease-in-out ${animate ? 'opacity-100 transform-none' : 'opacity-0 translate-x-full'}`}>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Create an Account</h2>
          </div>
          <div className="mt-8">
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
            >
              Continue with Google
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
