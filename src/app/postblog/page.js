
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function PostBlogPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState('')
  const [blogStatus, setBlogStatus] = useState('draft')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const notification = toast.loading('Creating your post...')
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          image,
          tags: tags.split(',').map(t => t.trim()),
          status: blogStatus,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        toast.success('Post created successfully!', { id: notification })
        router.push(`/blog/${data.id}`)
      } else {
        throw new Error('Failed to create post.')
      }
    } catch (error) {
      toast.error(error.message, { id: notification })
    }
  }

  if (status === 'loading') return <div className="text-center p-10">Loading...</div>
  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-lg p-3 mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300">Excerpt</label>
            <textarea
              id="excerpt"
              rows="3"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-lg p-3 mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300">Content</label>
            <textarea
              id="content"
              rows="15"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-lg p-3 mt-1 font-mono"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">Image URL</label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-lg p-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300">Tags (comma-separated)</label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-lg p-3 mt-1"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300">Status</label>
            <select
              id="status"
              value={blogStatus}
              onChange={(e) => setBlogStatus(e.target.value)}
              className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-lg p-3 mt-1"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-premium">Create Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}
