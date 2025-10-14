'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/lib/axios'

export default function AboutPage() {
  const [team, setTeam] = useState([])

  useEffect(() => {
    const fetchTeam = async () => {
        const res = await api.get('/team');
        setTeam(res.data)
    }
    fetchTeam()
  }, [])

  return (
    <div className="bg-[url('/assets/devdocs-bg.svg')] bg-cover bg-fixed bg-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">About DevDoc’s</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">Empowering developers to share knowledge and build communities.</p>
        </div>

        <section className="space-y-6 max-w-5xl mx-auto py-10">
          <h2 className="text-3xl font-bold text-center">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            DevDoc’s empowers developers, writers, and creators to share their knowledge through
            powerful markdown blogs and collaborative documentation tools. We aim to simplify
            technical storytelling and create a vibrant hub for modern tech communities.
          </p>

          <h2 className="text-3xl font-bold text-center mt-10">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Seamless markdown-based blogging experience</li>
            <li>Beautiful, responsive editor and live preview</li>
            <li>Developer-focused profiles and follower network</li>
            <li>Integrated AI assistant for SEO and content polishing</li>
            <li>Secure authentication with Google OAuth</li>
          </ul>

          <h2 className="text-3xl font-bold text-center mt-10">Why Developers Love DevDoc’s</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                DevDoc's is built by developers, for developers. We understand the importance of a clean, efficient, and powerful platform for sharing technical knowledge. Our platform is designed to get out of your way and let you focus on what you do best: writing great content.
            </p>

          <h2 className="text-3xl font-bold text-center mt-10">Join Our Community</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Whether you’re documenting APIs, publishing tutorials, or writing developer journals,
            DevDoc’s provides a platform that celebrates clarity, collaboration, and creativity.
            Start writing today — your next great post begins here.
          </p>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Meet Our Team</h2>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    We’re a dynamic group of individuals who are passionate about what we do.
                </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
            >
              {team.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-md text-center"
                >
                  <img src={member.avatar || 'https://i.pravatar.cc/150'} alt={member.name} className="w-24 h-24 rounded-full mx-auto" />
                  <h3 className="text-lg font-semibold mt-4 text-center">{member.name}</h3>
                  <p className="text-sm text-gray-500 text-center">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </div>
    </div>
  )
}
