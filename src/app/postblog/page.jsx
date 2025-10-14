'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useApp } from '../../context/AppContext'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { api } from '@/lib/axios'

export default function PostBlogPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [showPreview, setShowPreview] = useState(true)
  const [showSEOResult, setShowSEOResult] = useState(false)
  const [seoData, setSeoData] = useState(null)
  const { addBlog } = useApp()

  const handlePublish = async () => {
    await addBlog({ title, content, tags })
  }

  const handleAIOptimize = async () => {
    const res = await api.post('/ai/seo-optimize', { title, content });
    setSeoData(res.data)
    setShowSEOResult(true)
  }

  return (
    <main className="max-w-7xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <section className="flex-1 space-y-4">
          <input
            type="text"
            placeholder="Enter your blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border p-4"
          />
          <textarea
            className="w-full min-h-[300px] rounded-xl border p-4 font-mono"
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-between items-center mt-6">
            <button onClick={() => {}} className="btn-secondary">Save Draft</button>
            <div className="flex gap-3">
              <button onClick={handleAIOptimize} className="btn-outline flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Optimize for SEO (AI)
              </button>
              <button onClick={handlePublish} className="btn-primary">Publish</button>
            </div>
          </div>

          {showSEOResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-neutral-100 dark:bg-neutral-900 rounded-xl p-4 shadow-inner"
            >
              <h3 className="font-semibold text-lg mb-2">AI SEO Suggestions</h3>
              <p><strong>Optimized Title:</strong> {seoData.title}</p>
              <p><strong>Meta Description:</strong> {seoData.meta}</p>
              <p><strong>Keywords:</strong> {seoData.keywords.join(", ")}</p>
            </motion.div>
          )}
        </section>

        <aside className="flex-1 bg-neutral-50 dark:bg-neutral-900 rounded-2xl shadow-inner p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Preview</h2>
            <button
              className="btn-xs btn-outline lg:hidden"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Hide" : "Show"}
            </button>
          </div>
          {showPreview && (
            <div className="prose dark:prose-invert max-w-none border-t pt-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "_Start writing to see preview..._"}
              </ReactMarkdown>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
