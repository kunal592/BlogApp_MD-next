'use client'
import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useApp } from '../../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/axios'
import { Heading1, Heading2, Heading3, Quote, Code, List, Image, Sparkles } from 'lucide-react'

const commands = [
  { label: "Heading 1", insert: "# ", icon: Heading1 },
  { label: "Heading 2", insert: "## ", icon: Heading2 },
  { label: "Heading 3", insert: "### ", icon: Heading3 },
  { label: "Quote", insert: "> ", icon: Quote },
  { label: "Code Block", insert: "```js\n// your code here\n```", icon: Code },
  { label: "Image", insert: "![alt text](image-url)", icon: Image },
  { label: "List", insert: "- ", icon: List },
  { label: "AI Rewrite", action: "ai-rewrite", icon: Sparkles },
];

export default function PostBlogPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [showPreview, setShowPreview] = useState(true)
  const [showSEOResult, setShowSEOResult] = useState(false)
  const [seoData, setSeoData] = useState(null)
  const [showCommandMenu, setShowCommandMenu] = useState(false)
  const [commandPos, setCommandPos] = useState({ x: 0, y: 0 })
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null)
  const { addBlog } = useApp()

  const handlePublish = async () => {
    await addBlog({ title, content, tags })
  }

  const handleAIOptimize = async () => {
    const res = await api.post('/ai/seo-optimize', { title, content });
    setSeoData(res.data)
    setShowSEOResult(true)
  }

  const handleInput = (e) => {
    const text = e.target.value;
    setContent(text);

    if (text.endsWith('/')) {
        const textarea = editorRef.current;
        const { x, y, height } = textarea.getBoundingClientRect();
        const cursorPosition = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPosition);
        const lines = textBeforeCursor.split('\n');
        const currentLine = lines.length - 1;
        const currentLineEl = document.createElement('div');
        currentLineEl.style.cssText = `position: absolute; top: -9999px; left: -9999px; white-space: pre; font: ${getComputedStyle(textarea).font};`;
        currentLineEl.textContent = lines[currentLine];
        document.body.appendChild(currentLineEl);
        const cursorX = currentLineEl.offsetWidth;
        document.body.removeChild(currentLineEl);
        setCommandPos({ x: x + cursorX + 10, y: y + (currentLine + 1) * 24 + height/lines.length });
        setShowCommandMenu(true);
    } else {
        setShowCommandMenu(false);
    }
  };

  const insertCommand = async (cmd) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    setShowCommandMenu(false);

    if (cmd.action === 'ai-rewrite') {
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      const selectedText = content.substring(selectionStart, selectionEnd);
      if (selectedText) {
        const { data } = await api.post('/api/ai/rewrite', { content: selectedText });
        const newContent = content.substring(0, selectionStart) + data.improved + content.substring(selectionEnd);
        setContent(newContent);
      }
      return;
    }

    const newContent = content.slice(0, content.length - 1) + cmd.insert;
    setContent(newContent);
    textarea.focus();
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000); // Simulate save
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            handleSaveDraft();
        }
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            handlePublish();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [title, content, tags]);


  return (
    <main className="max-w-7xl mx-auto py-10 px-6 space-y-6">
    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">Create a Masterpiece</h1>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-neutral-950/70 text-white placeholder-neutral-400 rounded-xl border-2 border-neutral-800 p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-300 shadow-lg focus:shadow-indigo-500/30"
            />
            <div className="relative">
                <textarea
                    ref={editorRef}
                    value={content}
                    onChange={handleInput}
                    className="w-full min-h-[400px] bg-neutral-950/70 text-gray-200 font-mono rounded-2xl border-2 border-neutral-800 p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 shadow-lg focus:shadow-indigo-500/30"
                    placeholder="Start writing... Type / for commands"
                />
                <AnimatePresence>
                    {showCommandMenu && (
                        <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl p-2 w-60 z-50"
                        style={{ top: commandPos.y, left: commandPos.x }}
                        >
                        {commands.map((cmd, i) => (
                            <button
                            key={i}
                            onClick={() => insertCommand(cmd)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-800 flex items-center gap-3 text-neutral-200"
                            >
                            <cmd.icon className="w-5 h-5 text-indigo-400" />
                            <span>{cmd.label}</span>
                            </button>
                        ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        <div className="bg-neutral-950/70 border-2 border-neutral-800 rounded-2xl p-6 shadow-lg h-full">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-neutral-700 pb-2">Live Preview</h2>
            <div className="prose prose-invert max-w-none prose-pre:bg-neutral-800 prose-pre:text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "_Start writing to see preview..._"}</ReactMarkdown>
            </div>
        </div>
    </div>

    <div className="flex justify-between items-center mt-6">
        <div className="relative">
            {isSaving && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="text-green-400 text-sm">
                    Draft saved!
                </motion.div>
            )}
            <span className='text-gray-400 text-xs'>Ctrl+S to save</span>
        </div>
        <div className="flex gap-4">
            <button onClick={handleAIOptimize} className="btn-outline flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-fuchsia-500" />
                AI SEO Optimizer
            </button>
            <button onClick={handlePublish} className="btn-primary bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:opacity-90 transition-opacity">
                Publish
                <span className='text-gray-300 text-xs ml-2'>Ctrl+Enter</span>
            </button>
        </div>
    </div>

    {showSEOResult && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-neutral-900/80 border border-neutral-700 rounded-xl p-6 shadow-xl backdrop-blur-sm"
        >
            <h3 className="font-bold text-xl text-white mb-3 flex items-center gap-2">
                <Sparkles className="text-fuchsia-400" /> AI SEO Suggestions
            </h3>
            <p className="text-indigo-300"><strong>Optimized Title:</strong> <span className="text-white">{seoData.title}</span></p>
            <p className="text-indigo-300"><strong>Meta Description:</strong> <span className="text-white">{seoData.meta}</span></p>
            <p className="text-indigo-300"><strong>Keywords:</strong> <span className="text-white">{seoData.keywords.join(", ")}</span></p>
        </motion.div>
    )}
    </main>
  )
}
