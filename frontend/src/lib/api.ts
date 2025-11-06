import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const register = async (data: any) => {
  const response = await api.post('/auth/register', data)
  if (response.data.token) {
    Cookies.set('token', response.data.token, { expires: 7 })
  }
  return response.data
}

export const login = async (email: string, senha: string) => {
  const response = await api.post('/auth/login', { email, senha })
  if (response.data.token) {
    Cookies.set('token', response.data.token, { expires: 7 })
  }
  return response.data
}

export const logout = async () => {
  await api.post('/auth/logout')
  Cookies.remove('token')
}

export const getMe = async () => {
  const response = await api.get('/auth/me')
  return response.data.data
}

// Products
export const getProducts = async () => {
  const response = await api.get('/products')
  return response.data.data
}

export const getProductBySlug = async (slug: string) => {
  const response = await api.get(`/products/${slug}`)
  return response.data.data
}

// Services
export const getServices = async () => {
  const response = await api.get('/services')
  return response.data.data
}

// Orders
export const createOrder = async (data: any) => {
  const response = await api.post('/orders', data)
  return response.data.data
}

export const getMyOrders = async () => {
  const response = await api.get('/orders/my')
  return response.data.data
}

export const getOrder = async (id: string) => {
  const response = await api.get(`/orders/${id}`)
  return response.data.data
}

// Payment
export const checkout = async (orderId: string) => {
  const response = await api.post('/payment/checkout', { orderId })
  return response.data
}

export default api
