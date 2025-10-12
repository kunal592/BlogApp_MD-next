// src/lib/mockData.js
export const users = [
  { id: 'u1', name: 'Kunal Daharwal', avatar: '/default-user.png', bio: 'MERN + ML engineer', followers: 1200, following: 180 },
  { id: 'u2', name: 'Asha Verma', avatar: '/default-user.png', bio: 'Frontend dev & writer', followers: 420, following: 50 },
  { id: 'u3', name: 'Ravi Kumar', avatar: '/default-user.png', bio: 'Backend & infra', followers: 300, following: 90 }
]

export const blogs = [
  {
    id: 'b1',
    title: 'Mastering Next.js 14',
    authorId: 'u1',
    excerpt: 'A modern guide to building apps with Next.js 14 (App Router).',
    content: `# Mastering Next.js 14

Next.js 14 introduced many improvements for the App Router. This is demo content to show markdown rendering.

## Features
- App Router
- Server Components
- Edge functions

\`\`\`js
export default function Page() {
  return <div>Hello World</div>
}
\`\`\`
`,
    tags: ['Next.js','React','WebDev'],
    createdAt: '2025-10-06',
    likes: 35,
    comments: 5,
    bookmarks: 12
  },
  {
    id: 'b2',
    title: 'Building Fast UIs with Tailwind',
    authorId: 'u2',
    excerpt: 'Design system with Tailwind CSS.',
    content: `## Building Fast UIs with Tailwind

Tailwind makes it fast to iterate on UI and keep styles consistent.

> Tip: Use utility classes and components.

- Utility-first
- Rapid prototyping
`,
    tags: ['CSS','Design','Tailwind'],
    createdAt: '2025-09-20',
    likes: 20,
    comments: 2,
    bookmarks: 3
  },
  {
    id: 'b3',
    title: 'Intro to Prisma Migrations',
    authorId: 'u3',
    excerpt: 'How to manage schema changes with Prisma.',
    content: `Prisma migrations allow controlled schema changes. This is a demo article.`,
    tags: ['Prisma','Database','Backend'],
    createdAt: '2025-08-15',
    likes: 8,
    comments: 1,
    bookmarks: 0
  }
]

export const comments = [
  { id: 'c1', blogId: 'b1', authorId: 'u2', content: 'Great writeup!', createdAt: '2025-10-07', likes: 2, replies: [] },
  { id: 'c2', blogId: 'b1', authorId: 'u3', content: 'Loved the code examples.', createdAt: '2025-10-08', likes: 1, replies: [] }
]

export const notifications = [
  { id: 'n1', text: 'Asha liked your blog "Mastering Next.js 14"', read: false, createdAt: '2025-10-07' },
  { id: 'n2', text: 'Ravi commented on "Mastering Next.js 14"', read: false, createdAt: '2025-10-08' }
]
