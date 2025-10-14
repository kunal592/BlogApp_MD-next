'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/lib/axios'
import { Users, Target, Zap, Heart } from 'lucide-react'

export default function AboutPage() {
  const [team, setTeam] = useState([])

  useEffect(() => {
    const fetchTeam = async () => {
        const res = await api.get('/team');
        setTeam(res.data)
    }
    fetchTeam()
  }, [])

  const FeatureCard = ({ icon, title, children }) => (
    <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-3">
        {icon}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-neutral-400 leading-relaxed">{children}</p>
    </div>
  );

  return (
    <div className="min-h-screen">
        <main className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-20">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-600 mb-4"
                >
                    About DevDoc’s
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg text-neutral-400 max-w-2xl mx-auto"
                >
                    Empowering developers to share knowledge and build vibrant communities through exceptional tools.
                </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-24">
                <FeatureCard icon={<Target className="w-8 h-8 text-purple-400" />} title="Our Mission">
                    DevDoc’s empowers developers, writers, and creators to share their knowledge through powerful markdown blogs and collaborative documentation tools. We aim to simplify technical storytelling and create a vibrant hub for modern tech communities.
                </FeatureCard>
                <FeatureCard icon={<Zap className="w-8 h-8 text-indigo-400" />} title="What We Offer">
                    We provide a seamless markdown-based blogging experience with a beautiful, responsive editor, developer-focused profiles, an integrated AI assistant for SEO, and secure authentication with Google OAuth.
                </FeatureCard>
            </div>

            <div className="text-center mb-24">
                <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500 mb-4 inline-block">Why Developers Love DevDoc’s</h2>
                <p className="text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                    DevDoc's is built by developers, for developers. We understand the importance of a clean, efficient, and powerful platform for sharing technical knowledge. Our platform is designed to get out of your way and let you focus on what you do best: writing great content.
                </p>
            </div>
            
            <section className="text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-12">Meet Our Team</h2>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {team.map((member) => (
                        <motion.div
                            key={member.id}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative overflow-hidden rounded-2xl bg-neutral-900/60 p-6 text-center border-2 border-neutral-800 backdrop-blur-lg shadow-xl"
                        >
                            <div className="absolute top-0 left-0 -w-1/2 -h-1/2 bg-gradient-to-br from-purple-600/20 to-transparent blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 -w-1/2 -h-1/2 bg-gradient-to-tl from-indigo-600/20 to-transparent blur-3xl"></div>
                            <img src={member.avatar || 'https://i.pravatar.cc/150'} alt={member.name} className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-neutral-700" />
                            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                            <p className="text-sm text-indigo-300 font-medium">{member.role}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </main>
    </div>
  )
}
