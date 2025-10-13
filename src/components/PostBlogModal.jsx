
// src/components/PostBlogModal.jsx
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { X } from 'lucide-react'

export default function PostBlogModal({ onClose }) {
  const { postBlog } = useApp()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState('')
  const [status, setStatus] = useState('published')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const tagsArray = tags.split(',').map((tag) => tag.trim())
    await postBlog({ title, content, image, tags: tagsArray, status })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">New Blog Post</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
              rows="6"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Image URL (Optional)
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 dark:border-neutral-700 rounded-md p-2"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
