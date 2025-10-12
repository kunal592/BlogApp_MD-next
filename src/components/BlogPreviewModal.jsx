'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { X } from 'lucide-react'

export default function BlogPreviewModal({ isOpen, onClose, blogData }) {
  if (!isOpen) return null

  const { title, content, featuredImage, author } = blogData

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-4xl w-full h-full max-h-[90vh] overflow-hidden flex flex-col">
        <header className="p-4 sm:p-6 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Preview</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
            <X size={24} className="text-gray-500 dark:text-gray-400" />
          </button>
        </header>
        
        <div className="overflow-y-auto flex-grow p-4 sm:p-6 md:p-8">
          <article>
            <header className="mb-8">
              {featuredImage && (
                <img src={featuredImage} alt={title} className="w-full h-64 object-cover rounded-lg mb-8" />
              )}
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">{title}</h1>
              {author && (
                <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  <img src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <span>by {author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </header>

            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          </article>
        </div>

        <footer className="p-4 sm:p-6 border-t border-gray-200 dark:border-neutral-800 flex-shrink-0">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">This is a preview. The final post may look slightly different.</p>
        </footer>
      </div>
    </div>
  )
}
