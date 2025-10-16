'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import QueriesManager from '@/components/QueriesManager'

const TeamManager = () => {
  const [team, setTeam] = useState([])
  const [newMember, setNewMember] = useState({ name: '', role: '', bio: '', avatar: '', socialLink: '' })
  const [editingMember, setEditingMember] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    const res = await api.get('/users');
    setTeam(res.data)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingMember) {
      setEditingMember({ ...editingMember, [name]: value })
    } else {
      setNewMember({ ...newMember, [name]: value })
    }
  }

  const handleAddMember = async (e) => {
    e.preventDefault();
    await api.post('/users', newMember);
    setNewMember({ name: '', role: '', bio: '', avatar: '', socialLink: '' });
    fetchTeam();
  }

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    await api.put(`/users/${editingMember.id}`, editingMember);
    setEditingMember(null);
    fetchTeam();
  }

  const handleDeleteMember = async (id) => {
    await api.delete(`/users/${id}`);
    fetchTeam()
  }

  const handleCardClick = (link) => {
    if (link) {
      router.push(link)
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Team Manager</h2>
      
      <form onSubmit={editingMember ? handleUpdateMember : handleAddMember} className="mb-6 space-y-4">
        <input type="text" name="name" value={editingMember ? editingMember.name : newMember.name} onChange={handleInputChange} placeholder="Name" className="w-full rounded-xl border p-2" required />
        <input type="text" name="role" value={editingMember ? editingMember.role : newMember.role} onChange={handleInputChange} placeholder="Role" className="w-full rounded-xl border p-2" required />
        <textarea name="bio" value={editingMember ? editingMember.bio : newMember.bio} onChange={handleInputChange} placeholder="Bio" className="w-full rounded-xl border p-2" required />
        <input type="text" name="image" value={editingMember ? editingMember.image : newMember.image} onChange={handleInputChange} placeholder="Avatar URL" className="w-full rounded-xl border p-2" />
        <input type="text" name="socialLink" value={editingMember ? editingMember.socialLink : newMember.socialLink} onChange={handleInputChange} placeholder="Social Link" className="w-full rounded-xl border p-2" />
        <div className="flex justify-end gap-3">
            {editingMember && <button type="button" onClick={() => setEditingMember(null)} className="btn-secondary">Cancel</button>}
            <button type="submit" className="btn-primary">{editingMember ? 'Update Member' : 'Add Member'}</button>
        </div>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-3">Current Team</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.id} className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg cursor-pointer" onClick={() => handleCardClick(member.socialLink)}>
              <img src={member.image || 'https://i.pravatar.cc/150'} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-3" />
              <h4 className="font-bold text-center">{member.name}</h4>
              <p className="text-sm text-gray-500 text-center">{member.role}</p>
              <p className="text-xs mt-2">{member.bio}</p>
              <div className="flex justify-center gap-2 mt-3">
                <button onClick={(e) => {e.stopPropagation(); setEditingMember(member)}} className="btn-xs btn-outline">Edit</button>
                <button onClick={(e) => {e.stopPropagation(); handleDeleteMember(member.id)}} className="btn-xs btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
    return (
        <main className="max-w-7xl mx-auto py-10 space-y-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TeamManager />
              <QueriesManager />
            </div>
        </main>
    )
}
