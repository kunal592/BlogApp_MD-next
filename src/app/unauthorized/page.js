
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Unauthorized</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">You do not have permission to access this page.</p>
      <Link href="/">
        <a className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Go to Homepage
        </a>
      </Link>
    </div>
  );
}
