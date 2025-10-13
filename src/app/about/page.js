
// src/app/about/page.js
import { Code, Users, Target, GitBranch, Zap, Palette, Search } from 'lucide-react';

const features = [
    {
      name: 'AI-Powered Summaries',
      description: 'Automatically generate concise summaries of your blog posts using the power of Google\'s Gemini AI.',
      icon: Zap,
    },
    {
      name: 'Full CRUD Functionality',
      description: 'Create, read, update, and delete your blog posts and comments with ease.',
      icon: Code,
    },
    {
      name: 'User Authentication',
      description: 'Secure sign-up and login with credentials or social providers like Google.',
      icon: Users,
    },
    {
      name: 'Interactive Profiles',
      description: 'Showcase your work, track your publishing progress, and connect with other developers.',
      icon: Users,
    },
     {
      name: 'Light & Dark Mode',
      description: 'Seamlessly switch between light and dark themes for a comfortable reading experience.',
      icon: Palette,
    },
    {
      name: 'Advanced Search (Coming Soon)',
      description: 'A sneak peek into our next big feature: a powerful search to find exactly what you need.',
      icon: Search,
    },
  ]

  const team = [
    {
      name: 'John Doe',
      role: 'Lead Developer',
      bio: 'John is a full-stack developer with a passion for creating beautiful and functional web applications. He is the mastermind behind the DevDoc\'s architecture.',
    },
    {
      name: 'Jane Smith',
      role: 'Frontend Developer',
      bio: 'Jane is a frontend wizard who specializes in React and Tailwind CSS. She is responsible for the stunning user interface of DevDoc\'s.',
    },
    {
        name: 'Peter Jones',
        role: 'Backend Developer',
        bio: 'Peter is a backend guru who loves working with Node.js and Prisma. He ensures that the DevDoc\'s API is fast, reliable, and secure.',
    },
  ]

  const roadmap = [
    {
      name: 'Team Collaboration',
      description: 'Work together with other developers on draft posts.',
      icon: Users,
    },
    {
      name: 'Custom Domain Mapping',
      description: 'Host your DevDoc\'s blog on your own custom domain.',
      icon: GitBranch,
    },
    {
      name: 'Enhanced Analytics',
      description: 'Get detailed insights into your blog\'s performance.',
      icon: Target,
    },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <div className="relative pt-14 pb-24 sm:pb-32">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">About DevDoc's</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              DevDoc's is a developer-focused blogging and documentation platform. This frontend is built with Next.js (App Router), Tailwind CSS, and uses local mock data to simulate full interactivity (likes, comments, bookmarks, follows).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What We Offer</h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                      Everything you need to create and share your technical knowledge.
                  </p>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col bg-gray-50/50 dark:bg-white/5 p-8">
                  <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">{feature.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      <feature.icon className="h-8 w-8 mx-auto" />
                  </dd>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
                  </div>
              ))}
              </dl>
          </div>
      </div>

      {/* Team section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Meet Our Team</h2>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  We’re a dynamic group of individuals who are passionate about what we do.
              </p>
          </div>
          <ul
              role="list"
              className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
              {team.map((person) => (
              <li key={person.name} className="card p-6">
                  <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={`https://i.pravatar.cc/150?u=${person.name}`} alt="" />
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900 dark:text-white">{person.name}</h3>
                  <p className="text-base leading-7 text-indigo-600 dark:text-indigo-400">{person.role}</p>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">{person.bio}</p>
              </li>
              ))}
          </ul>
      </div>

      {/* Roadmap section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 bg-gray-50 dark:bg-neutral-900 rounded-lg">
          <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What's Next?</h2>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  We are constantly working on improving DevDoc's. Here's what we have in store for you.
              </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {roadmap.map((item) => (
              <div key={item.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <item.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {item.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{item.description}</p>
                  </dd>
              </div>
              ))}
          </dl>
          </div>
      </div>
    </>
  )
}
