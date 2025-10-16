
'use client'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import ThemeToggle from './ThemeToggle'
import { Home, PenSquare, Info, Mail, User, LogIn, LogOut, Bookmark, Bell, Grid, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navLinks = [
    { href: '/feed', label: 'Feed', icon: <Grid size={20} /> },
    { href: '/studios', label: 'Studios', icon: <PenSquare size={20} /> },
    { href: '/explores', label: 'Explores', icon: <Info size={20} /> },
    { href: '/about', label: 'About', icon: <Info size={20} /> },
    { href: '/contact', label: 'Contact', icon: <Mail size={20} /> },
  ]

  return (
    <aside className="bg-white dark:bg-neutral-950 border-r border-gray-200 dark:border-neutral-800 w-64 p-4 flex-shrink-0 hidden md:block">
      <div className="flex items-center mb-8">
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">DevDoc’s</Link>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${pathname === link.href ? 'bg-gray-100 dark:bg-neutral-800' : ''} text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white`}>
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="mb-4">
          <ThemeToggle />
        </div>
        {session ? (
          <div className="space-y-2">
            <Link href={`/profile/${session.user.id}`} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <User size={20} />
              Profile
            </Link>
            <Link href="/bookmarks" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <Bookmark size={20} />
              Bookmarks
            </Link>
            <Link href="/notifications" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <Bell size={20} />
              Notifications
            </Link>
            <button onClick={() => signOut()} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button onClick={() => signIn()} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <LogIn size={20} />
              Login
            </button>
            <Link href="/signup" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              <User size={20} />
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}
