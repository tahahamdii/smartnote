import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const authAPI = {
  login: (email: string, password: string) => api.post("/auth/login", { email, password }),

  register: (username: string, email: string, password: string) =>
    api.post("/auth/register", { username, email, password }),

  getCurrentUser: () => api.get("/auth/me"),
}

export const notesAPI = {
  getNotes: (search?: string, sortBy?: string, order?: string) =>
    api.get("/notes", { params: { search, sortBy, order } }),

  getNote: (id: string) => api.get(`/notes/${id}`),

  createNote: (note: { title: string; content: string; tags?: string[]; isPinned?: boolean }) =>
    api.post("/notes", note),

  updateNote: (id: string, note: { title: string; content: string; tags?: string[]; isPinned?: boolean }) =>
    api.put(`/notes/${id}`, note),

  deleteNote: (id: string) => api.delete(`/notes/${id}`),

  togglePin: (id: string) => api.patch(`/notes/${id}/pin`),
}

export default api
