// src/app/layout.js
import './globals.css'
import { AppProvider } from '../context/AppContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: "DevDoc's",
  description: "Developer blog & documentation"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white transition-colors">
        <AppProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}
