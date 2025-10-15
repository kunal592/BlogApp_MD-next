
import axios from './axios'

export const toggleLike = async (blogId) => {
  const response = await axios.post(`/blogs/${blogId}/like`)
  return response.data
}

export const toggleBookmark = async (blogId) => {
  const response = await axios.post(`/blogs/${blogId}/bookmark`)
  return response.data
}

export const toggleFollow = async (userId) => {
  const response = await axios.post(`/users/${userId}/follow`)
  return response.data
}
