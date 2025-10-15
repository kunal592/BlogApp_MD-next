
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(res => res.json())

export default function EditBlogPage({ params }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { data: blog, error } = useSWR(`/api/blogs/${params.id}`, fetcher)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '')
      setContent(blog.content || '')
      setExcerpt(blog.excerpt || '')
      setImage(blog.image || '')
      setTags(blog.tags ? blog.tags.join(', ') : '')
    }
  }, [blog])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const notification = toast.loading('Updating your post...')
    try {
      const res = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          image,
          tags: tags.split(',').map(t => t.trim()),
        }),
      })
      if (res.ok) {
        const updatedBlog = await res.json();
        toast.success('Post updated successfully!', { id: notification })
        router.push(`/blog/${updatedBlog.id}`)
      } else {
        throw new Error('Failed to update post.')
      }
    } catch (error) {
      toast.error(error.message, { id: notification })
    }
  }

  if (status === 'loading') return <div className="text-center p-10">Loading session...</div>
  if (!session) {
    router.push('/login')
    return null
  }
  if (error) return <div className="text-center p-10 text-red-500">Failed to load blog data.</div>
  if (!blog) return <div className="text-center p-10">Loading blog...</div>

  if (blog && session.user.id !== blog.authorId) {
      return <div className="text-red-500 font-bold text-center mt-10">You are not authorized to edit this post.</div>
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-neutral-800 border-2 border-neutral-700 rounded-lg p-3 mt-1"
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
          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => router.back()} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-premium">Update Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}
