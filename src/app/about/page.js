// src/app/about/page.js
export default function AboutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">About DevDoc's</h1>
      <div className="card">
        <p>
          DevDoc's is a developer-focused blogging and documentation platform. This frontend is built with Next.js (App Router), Tailwind CSS, and uses local mock data to simulate full interactivity (likes, comments, bookmarks, follows).
        </p>
      </div>
    </section>
  )
}
