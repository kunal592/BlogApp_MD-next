'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useApp } from '../../context/AppContext'
import { motion } from 'framer-motion'
import { Sparkles, Tags, Eye, Code } from 'lucide-react'
import { api } from '@/lib/axios'

export default function PostBlogPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [showSEOResult, setShowSEOResult] = useState(false)
  const [seoData, setSeoData] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const { addBlog } = useApp()

  const handlePublish = async () => {
    await addBlog({ title, content, tags: tags.split(',').map(t => t.trim()) })
  }

  const handleSaveDraft = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 2000) // Simulate save
  }

  const handleAIOptimize = async () => {
    const res = await api.post('/ai/seo-optimize', { title, content });
    setSeoData(res.data)
    setShowSEOResult(true)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-neutral-900/80 backdrop-blur-sm shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Create New Post</h1>
          <div className="flex items-center gap-4">
            <button onClick={handleSaveDraft} className="btn-secondary text-sm">
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            <button onClick={handlePublish} className="btn-primary text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all">
              Publish
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Section */}
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Enter your blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-neutral-900/70 border-2 border-neutral-800 rounded-lg p-4 text-2xl font-bold text-white placeholder-neutral-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300"
          />
          <textarea
            className="w-full min-h-[500px] bg-neutral-900/70 border-2 border-neutral-800 rounded-lg p-4 font-mono text-gray-300 placeholder-neutral-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300"
            placeholder="// Start your masterpiece here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex items-center gap-2 text-neutral-400">
            <Tags className="w-5 h-5" />
            <input 
              type="text"
              placeholder="Add tags, separated by commas..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Preview and SEO Section */}
        <div className="space-y-6">
          {/* Live Preview */}
          <div className="bg-neutral-900/70 border-2 border-neutral-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-neutral-700 pb-2 flex items-center gap-2">
              <Eye className="w-6 h-6 text-indigo-400"/> Live Preview
            </h2>
            <div className="prose prose-invert max-w-none prose-pre:bg-neutral-800 prose-pre:text-white">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "_Your content will appear here..._"}</ReactMarkdown>
            </div>
          </div>

          {/* SEO Optimization */}
          <div className="bg-neutral-900/70 border-2 border-neutral-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-neutral-700 pb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400"/> SEO Optimization
            </h2>
            <button onClick={handleAIOptimize} className="btn-outline w-full flex items-center justify-center gap-2 mb-4">
              Analyze & Optimize (AI)
            </button>
            {showSEOResult && (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2 text-sm"
              >
                  <p className="text-purple-300"><strong>Optimized Title:</strong> <span className="text-white">{seoData.title}</span></p>
                  <p className="text-purple-300"><strong>Meta Description:</strong> <span className="text-white">{seoData.meta}</span></p>
                  <p className="text-purple-300"><strong>Keywords:</strong> <span className="text-white">{seoData.keywords.join(", ")}</span></p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
