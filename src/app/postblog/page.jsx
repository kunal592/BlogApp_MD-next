
'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useApp } from '../../context/AppContext'
import { motion } from 'framer-motion'
import { Sparkles, Tags, Eye, Code, Save, Send } from 'lucide-react'
import { api } from '@/lib/axios'
import CodeBlock from '@/components/CodeBlock'
import toast from 'react-hot-toast'

export default function PostBlogPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [showSEOResult, setShowSEOResult] = useState(false)
  const [seoData, setSeoData] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const { addBlog } = useApp()

  const handlePublish = async () => {
    const notification = toast.loading('Publishing your post...')
    try {
      await addBlog({ title, content, tags: tags.split(',').map(t => t.trim()), status: 'published' })
      toast.success('Your post has been published!', { id: notification })
      setTitle('')
      setContent('')
      setTags('')
    } catch (error) {
      toast.error('Failed to publish your post.', { id: notification })
    }
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    const notification = toast.loading('Saving your draft...')
    try {
      await addBlog({ title, content, tags: tags.split(',').map(t => t.trim()), status: 'draft' })
      toast.success('Your draft has been saved!', { id: notification })
    } catch (error) {
      toast.error('Failed to save your draft.', { id: notification })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAIOptimize = async () => {
    if (!title || !content) {
        toast.error('Please add a title and some content before optimizing.');
        return;
    }
    const notification = toast.loading('Optimizing your post with AI...')
    try {
        const res = await api.post('/ai/seo-optimize', { title, content });
        setSeoData(res.data)
        setShowSEOResult(true)
        toast.success('SEO optimization complete!', { id: notification })
    } catch (error) {
        toast.error('Failed to optimize your post.', { id: notification })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <header className="bg-neutral-950/50 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">Create New Post</h1>
          <div className="flex items-center gap-4">
            <button onClick={handleSaveDraft} className="btn-secondary text-sm flex items-center gap-2" disabled={isSaving}>
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            <button onClick={handlePublish} className="btn-primary text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center gap-2">
              <Send className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <input
              type="text"
              placeholder="Enter your blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-800/60 border-2 border-neutral-700 rounded-lg p-4 text-2xl font-bold placeholder-neutral-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <textarea
              className="w-full min-h-[500px] bg-neutral-800/60 border-2 border-neutral-700 rounded-lg p-4 font-mono text-gray-300 placeholder-neutral-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 resize-y"
              placeholder="// Your markdown masterpiece starts here...\n// Use code blocks for snippets."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 bg-neutral-800/60 border-2 border-neutral-700 rounded-lg p-3">
            <Tags className="w-5 h-5 text-neutral-400" />
            <input 
              type="text"
              placeholder="Add tags, separated by commas (e.g., react, nextjs, tailwind)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-neutral-300 placeholder-neutral-500"
            />
          </motion.div>
        </div>

        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <div className="bg-neutral-800/60 border-2 border-neutral-700 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold text-white p-4 border-b border-neutral-700 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-indigo-400"/> Live Preview
                    </h2>
                    <div className="p-6 prose prose-invert max-w-none prose-pre:bg-neutral-900 prose-pre:rounded-md prose-headings:text-indigo-400">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]} 
                            components={{
                                pre: CodeBlock,
                            }}
                        >
                            {content || "_Your content will appear here..._"}
                        </ReactMarkdown>
                    </div>
                </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <div className="bg-neutral-800/60 border-2 border-neutral-700 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-neutral-700 pb-3 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-purple-400"/> SEO Optimization
                    </h2>
                    <button onClick={handleAIOptimize} className="btn-outline w-full flex items-center justify-center gap-2 mb-4 transition-all hover:bg-purple-500/10">
                        Analyze & Optimize with AI
                    </button>
                    {showSEOResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 text-sm mt-4"
                    >
                        <p className="text-purple-300"><strong>Optimized Title:</strong> <span className="text-white font-semibold">{seoData.title}</span></p>
                        <p className="text-purple-300"><strong>Meta Description:</strong> <span className="text-white italic">{seoData.meta}</span></p>
                        <p className="text-purple-300"><strong>Keywords:</strong> <span className="text-white">{seoData.keywords.join(", ")}</span></p>
                    </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
      </main>
    </div>
  )
}
