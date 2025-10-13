'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '../../context/AppContext'
import { signIn } from 'next-auth/react'

export default function SignupPage() {
  const { signup } = useApp()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      await signup(name, email, password)
      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      setError(err.message || 'An error occurred during signup.')
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Signup Successful!</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">Create Account</h1>
      <div className="mt-8">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            Sign up with Google
          </button>
        </div>

        <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-neutral-700"></div>
            <span className="flex-shrink mx-4 text-gray-400">Or continue with</span>
            <div className="flex-grow border-t border-gray-300 dark:border-neutral-700"></div>
        </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:text-white"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:text-white"
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:text-white"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full px-4 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account? <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
      </p>
    </div>
  )
}
