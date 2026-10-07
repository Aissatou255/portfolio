import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://127.0.0.1:8000/api'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const token = localStorage.getItem('admin_token')
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

  const [onglet, setOnglet] = useState('profil')

  const [profil, setProfil] = useState(null)
  const [skills, setSkills] = useState([])
  const [realisations, setRealisations] = useState([])
  const [messages, setMessages] = useState([])

  const [nouveauSkill, setNouveauSkill] = useState({ titre: '', description: '' })
  const [nouvelleRealisation, setNouvelleRealisation] = useState({ titre: '', description: '', image: '', lien: '' })

  useEffect(() => {
    if (!token) {
      navigate('/admin/login')
      return
    }
    chargerTout()
  }, [])

  const chargerTout = () => {
    axios.get(`${API_URL}/profile`).then((res) => setProfil(res.data))
    axios.get(`${API_URL}/skills`).then((res) => setSkills(res.data))
    axios.get(`${API_URL}/achievements`).then((res) => setRealisations(res.data))
    axios.get(`${API_URL}/contact-messages`, authHeaders).then((res) => setMessages(res.data))
  }

  const sauvegarderProfil = async (e) => {
    e.preventDefault()
    const res = await axios.put(`${API_URL}/profile`, profil, authHeaders)
    setProfil(res.data)
    alert('Profil mis à jour')
  }

  const ajouterSkill = async (e) => {
    e.preventDefault()
    await axios.post(`${API_URL}/skills`, nouveauSkill, authHeaders)
    setNouveauSkill({ titre: '', description: '' })
    chargerTout()
  }

  const supprimerSkill = async (id) => {
    await axios.delete(`${API_URL}/skills/${id}`, authHeaders)
    chargerTout()
  }

  const ajouterRealisation = async (e) => {
    e.preventDefault()
    await axios.post(`${API_URL}/achievements`, nouvelleRealisation, authHeaders)
    setNouvelleRealisation({ titre: '', description: '', image: '', lien: '' })
    chargerTout()
  }

  const supprimerRealisation = async (id) => {
    await axios.delete(`${API_URL}/achievements/${id}`, authHeaders)
    chargerTout()
  }

  const deconnexion = async () => {
    await axios.post(`${API_URL}/logout`, {}, authHeaders)
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  const onglets = [
    { id: 'profil', label: 'Profil' },
    { id: 'competences', label: 'Compétences' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'messages', label: 'Messages' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tableau de bord <span className="text-pink-500">admin</span></h1>
          <button onClick={deconnexion} className="text-sm text-gray-500 hover:text-pink-600">Se déconnecter</button>
        </div>

        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {onglets.map((o) => (
            <button
              key={o.id}
              onClick={() => setOnglet(o.id)}
              className={
                onglet === o.id
                  ? 'px-4 py-2 text-sm font-semibold text-pink-600 border-b-2 border-pink-500'
                  : 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-pink-500'
              }
            >
              {o.label}
            </button>
          ))}
        </div>

        {onglet === 'profil' && profil && (
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Mes informations</h2>
            <form onSubmit={sauvegarderProfil} className="grid sm:grid-cols-2 gap-3">
              <input placeholder="Nom complet" value={profil.nom || ''}
                onChange={(e) => setProfil({ ...profil, nom: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2" />
              <input placeholder="Titre (ex: Développeuse Web Full Stack)" value={profil.titre || ''}
                onChange={(e) => setProfil({ ...profil, titre: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2" />
              <input placeholder="URL de la photo" value={profil.photo || ''}
                onChange={(e) => setProfil({ ...profil, photo: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2" />
              <textarea placeholder="Bio / présentation" rows="3" value={profil.bio || ''}
                onChange={(e) => setProfil({ ...profil, bio: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2" />
              <input placeholder="Sous-titre (ex: Créative - Curieuse...)" value={profil.sous_titre || ''}
                onChange={(e) => setProfil({ ...profil, sous_titre: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2" />
              <input placeholder="Email" value={profil.email || ''}
                onChange={(e) => setProfil({ ...profil, email: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2" />
              <input placeholder="Téléphone" value={profil.telephone || ''}
                onChange={(e) => setProfil({ ...profil, telephone: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2" />
              <input placeholder="Ville" value={profil.ville || ''}
                onChange={(e) => setProfil({ ...profil, ville: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2" />
              <input placeholder="Lien GitHub" value={profil.github || ''}
                onChange={(e) => setProfil({ ...profil, github: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2" />
              <input placeholder="Lien LinkedIn" value={profil.linkedin || ''}
                onChange={(e) => setProfil({ ...profil, linkedin: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2" />
              <button type="submit" className="bg-pink-500 text-white rounded-lg py-2 sm:col-span-2 hover:bg-pink-600 transition">
                Enregistrer
              </button>
            </form>
          </section>
        )}

        {onglet === 'competences' && (
          <section className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">Ajouter une compétence</h2>
              <form onSubmit={ajouterSkill} className="grid sm:grid-cols-2 gap-3">
                <input placeholder="Titre" required value={nouveauSkill.titre}
                  onChange={(e) => setNouveauSkill({ ...nouveauSkill, titre: e.target.value })}
                  className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2" />
                <textarea placeholder="Description" required rows="2" value={nouveauSkill.description}
                  onChange={(e) => setNouveauSkill({ ...nouveauSkill, description: e.target.value })}
                  className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2" />
                <button type="submit" className="bg-pink-500 text-white rounded-lg py-2 sm:col-span-2 hover:bg-pink-600 transition">
                  Ajouter
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">Compétences existantes</h2>
              <ul className="divide-y divide-gray-100">
                {skills.map((s) => (
                  <li key={s.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{s.titre}</p>
                      <p className="text-sm text-gray-500">{s.description}</p>
                    </div>
                    <button onClick={() => supprimerSkill(s.id)} className="text-red-500 text-sm hover:underline shrink-0 ml-4">
                      Supprimer
                    </button>
                  </li>
                ))}
                {skills.length === 0 && <p className="text-gray-400 text-sm">Aucune compétence pour l'instant.</p>}
              </ul>
            </div>
          </section>
        )}

        {onglet === 'realisations' && (
          <section className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">Ajouter une réalisation</h2>
              <form onSubmit={ajouterRealisation} className="grid sm:grid-cols-2 gap-3">
                <input placeholder="Titre" required value={nouvelleRealisation.titre}
                  onChange={(e) => setNouvelleRealisation({ ...nouvelleRealisation, titre: e.target.value })}
                  className="border border-gray-200 rounded-lg px-3 py-2" />
                <input placeholder="Lien (optionnel)" value={nouvelleRealisation.lien}
                  onChange={(e) => setNouvelleRealisation({ ...nouvelleRealisation, lien: e.target.value })}
                  className="border border-gray-200 rounded-lg px-3 py-2" />
                <input placeholder="URL de l'image (optionnel)" value={nouvelleRealisation.image}
                  onChange={(e) => setNouvelleRealisation({ ...nouvelleRealisation, image: e.target.value })}
                  className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2" />
                <textarea placeholder="Description" required rows="3" value={nouvelleRealisation.description}
                  onChange={(e) => setNouvelleRealisation({ ...nouvelleRealisation, description: e.target.value })}
                  className="border border-gray-200 rounded-lg px-3 py-2 sm:col-span-2" />
                <button type="submit" className="bg-pink-500 text-white rounded-lg py-2 sm:col-span-2 hover:bg-pink-600 transition">
                  Ajouter
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">Réalisations existantes</h2>
              <ul className="divide-y divide-gray-100">
                {realisations.map((r) => (
                  <li key={r.id} className="py-3 flex justify-between items-center">
                    <span>{r.titre}</span>
                    <button onClick={() => supprimerRealisation(r.id)} className="text-red-500 text-sm hover:underline">
                      Supprimer
                    </button>
                  </li>
                ))}
                {realisations.length === 0 && <p className="text-gray-400 text-sm">Aucune réalisation pour l'instant.</p>}
              </ul>
            </div>
          </section>
        )}

        {onglet === 'messages' && (
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Messages reçus</h2>
            <ul className="divide-y divide-gray-100">
              {messages.map((m) => (
                <li key={m.id} className="py-3">
                  <p className="font-medium">{m.nom} <span className="text-gray-400 font-normal">— {m.email}</span></p>
                  <p className="text-sm text-gray-600">{m.message}</p>
                </li>
              ))}
              {messages.length === 0 && <p className="text-gray-400 text-sm">Aucun message pour l'instant.</p>}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}