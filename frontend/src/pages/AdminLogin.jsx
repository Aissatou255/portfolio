import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://127.0.0.1:8000/api'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [erreur, setErreur] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur(null)
    try {
      const res = await axios.post(`${API_URL}/login`, form)
      localStorage.setItem('admin_token', res.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setErreur('Email ou mot de passe incorrect.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center mb-2">
          Espace <span className="text-pink-500">admin</span>
        </h1>
        <input
          type="email" placeholder="Email" required
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <input
          type="password" placeholder="Mot de passe" required
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        {erreur && <p className="text-red-600 text-sm text-center">{erreur}</p>}
        <button type="submit" className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition">
          Se connecter
        </button>
      </form>
    </div>
  )
}