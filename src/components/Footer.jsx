
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">DevDoc’s</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              A premium developer blogging platform.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Navigate</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Home</Link></li>
              <li><Link href="/feed" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Feed</Link></li>
              <li><Link href="/profile/u1" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/notifications" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Notifications</Link></li>
              <li><Link href="/admin" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Admin</Link></li>
              <li><Link href="/about" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-neutral-800 pt-8 flex items-center justify-between">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} DevDoc’s. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
