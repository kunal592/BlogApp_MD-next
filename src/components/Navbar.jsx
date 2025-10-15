
'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import ThemeToggle from './ThemeToggle'
import { Menu, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen)

  const handlePostBlogClick = () => {
    if (session) {
      router.push('/postblog')
    } else {
      router.push('/login')
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownOpen && !event.target.closest('.profile-dropdown-container')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [dropdownOpen])

  return (
    <nav className="bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">DevDoc’s</Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/feed" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Feed</Link>
                <button onClick={handlePostBlogClick} className="btn-premium">Post Blog</button>
                <Link href="/about" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <Link href="/contact" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {mounted && <ThemeToggle />}
              {session ? (
                <div className="ml-3 relative profile-dropdown-container">
                  <div>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="max-w-xs bg-white dark:bg-neutral-900 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={session.user.image || '/default-avatar.png'} alt="User avatar" />
                       <span className="hidden sm:inline ml-2 text-sm text-gray-900 dark:text-white">{session.user.name.split(" ")[0]}</span>
                    </button>
                  </div>
                  {dropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5">
                      <Link href={`/profile/${session.user.id}`} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700" onClick={() => setDropdownOpen(false)}>Profile</Link>
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
                      <Link href="/bookmarks" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700" onClick={() => setDropdownOpen(false)}>Bookmarks</Link>
                      {session.user.role === 'ADMIN' && (
                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700" onClick={() => setDropdownOpen(false)}>Admin</Link>
                      )}
                      <button onClick={() => { signOut(); setDropdownOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button onClick={() => signIn()} className="btn-secondary">Login</button>
                  <Link href="/signup" className="btn-primary">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={handleMobileMenuToggle} className="bg-white dark:bg-neutral-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/feed" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">Feed</Link>
            <button onClick={handlePostBlogClick} className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">Post Blog</button>
            <Link href="/about" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {session ? (
              <div className="px-5">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={session.user.image || '/default-avatar.png'} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-gray-800 dark:text-white">{session.user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">{session.user.email}</div>
                    </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                    <Link href={`/profile/${session.user.id}`} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">Profile</Link>
                    <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">Dashboard</Link>
                    <Link href="/bookmarks" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">Bookmarks</Link>
                    {session.user.role === 'ADMIN' && (
                      <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">Admin</Link>
                    )}
                    <button onClick={() => signOut()} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">
                        Logout
                    </button>
                </div>
              </div>
            ) : (
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button onClick={() => signIn()} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">Login</button>
                <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800">Sign Up</Link>
              </div>
            )}
             <div className="mt-3 px-2 space-y-1">
              {mounted && <ThemeToggle />}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
