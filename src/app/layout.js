
'use client'
import './globals.css'
import { AppProvider } from '../context/AppContext'
import { ThemeProvider } from 'next-themes'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children, session }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white transition-colors">
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <AppProvider>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
              </div>
              <Footer />
            </AppProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
