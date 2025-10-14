'use client'
import './globals.css'
import { AppProvider } from '../context/AppContext'
import { ThemeProvider } from 'next-themes'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children, session }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white transition-colors">
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <AppProvider>
              <div className="bg-[url('/assets/devdocs-bg.svg')] bg-cover bg-fixed bg-center">
                <Navbar />
                <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
                <Footer />
              </div>
            </AppProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
