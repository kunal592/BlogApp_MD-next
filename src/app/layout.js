'use client'
import './globals.css'
import { AppProvider } from '../context/AppContext'
import { ThemeProvider } from 'next-themes'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white transition-colors">
        <ThemeProvider attribute="class">
          <AppProvider>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
            <Footer />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
