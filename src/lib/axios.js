// src/lib/axios.js
// Placeholder axios instance. When backend is added, set NEXT_PUBLIC_API_URL in .env.local
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  withCredentials: true
})
