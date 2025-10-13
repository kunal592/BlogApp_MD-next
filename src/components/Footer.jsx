
import Link from 'next/link';
import { Twitter, Github, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">DevDoc’s</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              A premium, elegant, and powerful blogging platform for developers.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Navigate</h3>
              <ul className="mt-4 space-y-4">
                <li><Link href="/" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Home</Link></li>
                <li><Link href="/feed" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Feed</Link></li>
                <li><Link href="/bookmarks" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Bookmarks</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Platform</h3>
              <ul className="mt-4 space-y-4">
                  <li><Link href="/about" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About</Link></li>
                  <li><Link href="/contact" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact</Link></li>
                  <li><Link href="/admin" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Admin</Link></li>
              </ul>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Stay up to date</h3>
                <p className="mt-4 text-base text-gray-500 dark:text-gray-400">Sign up for our newsletter to get the latest news and updates.</p>
                <form className="mt-4 sm:flex sm:max-w-md">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input type="email" name="email-address" id="email-address" autoComplete="email" required className="w-full px-4 py-2 min-w-0 text-base text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm appearance-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your email" />
                    <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                        <button type="submit" className="w-full bg-indigo-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-neutral-800 pt-8">
          <p className="text-base text-gray-400 text-center">&copy; {new Date().getFullYear()} DevDoc’s. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
