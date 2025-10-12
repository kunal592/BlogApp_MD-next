'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useApp } from '../../context/AppContext'
import { UploadCloud, CheckCircle, Eye } from 'lucide-react'
import 'react-quill/dist/quill.snow.css'
import BlogPreviewModal from '../../components/BlogPreviewModal'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function PostBlog() {
  const { addBlog, currentUser } = useApp()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [featuredImage, setFeaturedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isPublished, setIsPublished] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFeaturedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !content || !currentUser) return

    const newBlog = {
      title,
      content,
      authorId: currentUser.id,
      tags: tags.split(',').map(tag => tag.trim()),
      featuredImage: imagePreview,
      createdAt: new Date().toISOString(),
    }

    addBlog(newBlog)
    setIsPublished(true)
    setTimeout(() => {
      router.push(`/blog/${newBlog.id}`)
    }, 2000)
  }

  const handlePreview = () => {
    setIsPreviewOpen(!isPreviewOpen)
  }

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  if (isPublished) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
        <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Post Published!</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Your new blog post is live. Redirecting...</p>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Create New Post</h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Share your knowledge with the community</p>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-xl p-8">
            <div className="mb-6">
              <label htmlFor="title" className="block text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl px-4 py-3 border-b-2 border-gray-200 dark:border-neutral-700 bg-transparent focus:outline-none focus:border-indigo-500 dark:text-white transition-colors"
                placeholder="Your post title..."
                required
              />
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Content</label>
              <div className="quill-container bg-white dark:bg-neutral-900 rounded-lg">
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  className="dark:text-white"
                  placeholder="Start writing your amazing story..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Post Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:text-white"
                  placeholder="e.g., react, javascript, webdev"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Featured Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-neutral-700 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-auto rounded-md" />
                    ) : (
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-neutral-900 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 space-x-4">
            <button
              type="button"
              onClick={handlePreview}
              className="w-full md:w-auto inline-flex justify-center items-center px-8 py-4 border border-gray-300 dark:border-neutral-700 text-lg font-semibold rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              <Eye size={20} className="mr-2"/>
              Preview
            </button>
            <button
              type="submit"
              className="w-full md:w-auto inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
      <BlogPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={handlePreview} 
        blogData={{
          title,
          content,
          featuredImage: imagePreview,
          author: currentUser
        }}
      />
    </>
  )
}
