import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const icons = {
  front: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>,
  git: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="6" r="3" /><path d="M6 9v6" /><path d="M18 9a6 6 0 0 1-6 6" /></svg>,
  css: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="19" cy="17" r="2.5" /><circle cx="7" cy="17" r="2.5" /><path d="M13.5 9v3.5M13.5 12.5l-4 3M13.5 12.5l4 3" /></svg>,
  design: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
  video: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="15" height="12" rx="2" /><polygon points="22 8 17 12 22 16 22 8" /></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /></svg>,
}

const competencesDefaut = [
  { titre: 'Développement Front-End', description: "HTML, CSS, JavaScript — création d'interfaces web modernes et responsives.", icone: 'front' },
  { titre: 'Développement Back-End', description: "PHP, Laravel, MySQL — construction d'API et de logique serveur robuste.", icone: 'back' },
  { titre: 'Git & GitHub', description: 'Gestion de versions et collaboration sur des projets de code.', icone: 'git' },
  { titre: 'Tailwind CSS', description: "Intégration rapide et propre d'interfaces avec des design systems modernes.", icone: 'css' },
  { titre: 'Design graphique', description: 'Création de logos et de cartes de visite sur mesure.', icone: 'design' },
  { titre: 'Vidéaste', description: 'Montage de vidéos publicitaires, du tournage à la version finale.', icone: 'video' },
]

const realisationsParDefaut = [
  { titre: 'AgriSn', description: "Plateforme d'opportunités agricoles connectant les jeunes Sénégalais (18-35 ans) à l'agriculture, l'élevage, la production locale et la transformation. Projet réalisé lors d'un hackathon avec l'équipe NextGen Coders.", image_url: null, lien: 'https://github.com/PaulPhilippe08/AgriSn.git' },
  { titre: 'Red Product', description: "Plateforme d'administration de gestion d'hôtels : backend Laravel, frontend React/Tailwind, authentification, upload d'images Cloudinary. Frontend déployé sur Vercel, backend sur Render.", image_url: null, lien: 'https://red-product-frontend-three.vercel.app' },
]

const profilParDefaut = {
  nom: 'Aïssatou Dia',
  titre: 'Développeuse Web Full Stack',
  bio: "Étudiante en Licence 2 Développement Web à AFI l'UE, je m'intéresse à la création de solutions numériques utiles, accessibles et adaptées aux besoins réels.",
  sous_titre: 'Créative • Curieuse • En constante progression',
  photo_url: '/photo.jpg',
  email: 'diaaicha2021@gmail.com',
  telephone: '+221 77 658 88 79',
  github: 'https://github.com/Aissatou255',
}

export default function Home() {
  const [profil, setProfil] = useState(profilParDefaut)
  const [competences, setCompetences] = useState(competencesDefaut)
  const [realisations, setRealisations] = useState(realisationsParDefaut)
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [statut, setStatut] = useState(null)

  useEffect(() => {
    axios.get(API_URL + '/profile')
      .then((res) => {
        if (res.data) {
          const donnees = Object.fromEntries(
            Object.entries(res.data).filter(([, valeur]) => valeur !== null && valeur !== '')
          )
          setProfil({ ...profilParDefaut, ...donnees })
        }
      })
      .catch(() => {})

    axios.get(API_URL + '/skills')
      .then((res) => {
        if (res.data && res.data.length > 0) setCompetences(res.data)
      })
      .catch(() => {})

    axios.get(API_URL + '/achievements')
      .then((res) => {
        if (res.data && res.data.length > 0) setRealisations(res.data)
      })
      .catch(() => {})
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatut('envoi')
    try {
      await axios.post(API_URL + '/contact', form)
      setStatut('succes')
      setForm({ nom: '', email: '', sujet: '', message: '' })
    } catch {
      setStatut('erreur')
    }
  }

  const contacts = [
    { texte: profil.email, lien: 'mailto:' + profil.email, externe: false, icone: 'mail' },
    { texte: profil.telephone, lien: 'tel:' + (profil.telephone || '').replace(/\s/g, ''), externe: false, icone: 'phone' },
    { texte: profil.github, lien: profil.github, externe: true, icone: 'github' },
  ].filter((c) => c.texte)

  const iconeContact = {
    mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>,
    phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    github: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>,
  }

  return (
    <div className="font-sans text-gray-900">
      <Navbar />

      <section id="accueil" className="relative min-h-screen flex items-center px-6 sm:px-12 pt-24 pb-16 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-white -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pink-100 blur-3xl opacity-60 -z-10" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="flex justify-center lg:justify-start">
            <img src={profil.photo_url || '/photo.jpg'} alt={profil.nom} className="w-full max-w-sm rounded-3xl shadow-2xl object-cover" />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl font-bold mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{profil.nom}</h1>
            <p className="text-3xl sm:text-4xl text-pink-500 font-bold italic mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>{profil.titre}</p>
            <p className="max-w-md mx-auto lg:mx-0 text-gray-500 text-sm mb-3 leading-relaxed">{profil.bio}</p>
            <p className="text-xs text-gray-400 tracking-[0.2em] uppercase mb-8">{profil.sous_titre}</p>
            <a href="#contact" className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition shadow-lg">Me contacter</a>
          </div>
        </div>
      </section>

      <section id="cequejefais" className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-pink-500 text-sm font-semibold tracking-widest uppercase text-center mb-2">Compétences</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Ce que je fais</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {competences.map((comp, i) => (
            <div key={comp.id || i} className="group rounded-2xl border border-pink-100 shadow-sm p-7 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 hover:border-pink-300 transition-all duration-300 bg-white">
              <div className="w-14 h-14 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mb-4 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                <div className="w-7 h-7">{icons[comp.icone] || icons.code}</div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{comp.titre}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{comp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="realisations" className="bg-black text-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase text-center mb-2">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">Mes réalisations</h2>

          <div className="relative">
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-pink-400 to-pink-500 -translate-x-1/2" />
            <div className="space-y-16">
              {realisations.map((r, i) => {
                const gauche = i % 2 === 0
                return (
                  <div key={r.id || i} className="relative sm:grid sm:grid-cols-2 sm:gap-10 items-center">
                    <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-pink-500 ring-4 ring-black items-center justify-center text-[10px] font-bold z-10">{i + 1}</div>
                    <div className={gauche ? 'sm:pr-14 sm:col-start-1' : 'sm:pl-14 sm:col-start-2'}>
                      <div className="group rounded-2xl overflow-hidden bg-white text-gray-900 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <div className="h-48 bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center text-pink-300 text-sm font-medium">
                          {r.image_url ? <img src={r.image_url} alt={r.titre} className="w-full h-full object-cover" /> : 'Photo à venir'}
                        </div>
                        <div className="p-6">
                          <span className="sm:hidden inline-block w-6 h-6 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center mb-2">{i + 1}</span>
                          <h3 className="font-semibold text-xl mb-2">{r.titre}</h3>
                          <p className="text-sm text-gray-500 mb-4 leading-relaxed">{r.description}</p>
                          {r.lien && <a href={r.lien} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-pink-600 text-sm font-semibold hover:gap-2 transition-all">Voir le projet →</a>}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="cv" className="max-w-4xl mx-auto px-6 py-24">
        <p className="text-pink-500 text-sm font-semibold tracking-widest uppercase text-center mb-2">Parcours</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Mon CV</h2>
        <p className="text-gray-500 mb-10 text-center leading-relaxed">Étudiante en Licence 2 en développement web à AFI l'UE, sérieuse, dynamique et motivée. Capable de gérer des situations imprévues et de travailler sous pression.</p>
        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-pink-500 font-semibold text-sm uppercase tracking-widest mb-3 border-b border-pink-100 pb-2">Formation</h3>
            <div className="flex justify-between text-sm mb-2"><span className="font-medium">Licence 2 en développement web — AFI l'UE</span><span className="text-gray-400">2026</span></div>
            <div className="flex justify-between text-sm"><span className="font-medium">Baccalauréat — David Diop Mendès</span><span className="text-gray-400">2024</span></div>
          </div>
          <div>
            <h3 className="text-pink-500 font-semibold text-sm uppercase tracking-widest mb-3 border-b border-pink-100 pb-2">Compétences</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside"><li>Développement web (bases)</li><li>Gestion du stress et des situations imprévues</li><li>Travail en équipe</li><li>Communication</li></ul>
          </div>
          <div>
            <h3 className="text-pink-500 font-semibold text-sm uppercase tracking-widest mb-3 border-b border-pink-100 pb-2">Expérience</h3>
            <div className="flex justify-between text-sm mb-1"><span className="font-medium">Participante — compétition nationale de débat</span><span className="text-gray-400 whitespace-nowrap ml-2">2023/2024</span></div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside"><li>Développement de la communication orale</li><li>Argumentation et esprit critique</li><li>Gestion du stress et des situations de tension</li></ul>
          </div>
          <div>
            <h3 className="text-pink-500 font-semibold text-sm uppercase tracking-widest mb-3 border-b border-pink-100 pb-2">Langues</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside"><li>Français</li><li>Anglais</li></ul>
          </div>
          <div>
            <h3 className="text-pink-500 font-semibold text-sm uppercase tracking-widest mb-3 border-b border-pink-100 pb-2">Objectifs</h3>
            <p className="text-sm text-gray-600">Acquérir une expérience professionnelle en développement web.</p>
          </div>
          <div>
            <h3 className="text-pink-500 font-semibold text-sm uppercase tracking-widest mb-3 border-b border-pink-100 pb-2">Centres d'intérêt</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside"><li>Débats</li><li>Technologie</li><li>Travail collaboratif</li></ul>
          </div>
        </div>
        <div className="text-center">
          <a href="/cv.pdf" download="CV_Aissatou_Dia.pdf" className="inline-block bg-pink-500 text-white px-10 py-4 rounded-full font-medium hover:bg-pink-600 hover:shadow-xl transition-all duration-300">Télécharger mon CV (PDF)</a>
        </div>
      </section>

      <section id="contact" className="relative py-24 overflow-hidden bg-black">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-600 blur-3xl opacity-20" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-500 blur-3xl opacity-20" />
        <div className="relative max-w-5xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-2">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Travaillons ensemble</h2>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">Une idée, un projet, une opportunité de stage ? N'hésite pas à me contacter, je réponds rapidement.</p>
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <a key={index} href={contact.lien} target={contact.externe ? '_blank' : '_self'} rel="noreferrer" className="group flex items-center gap-4 hover:text-pink-400 transition-colors">
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pink-500 transition-colors">
                    <span className="w-5 h-5">{iconeContact[contact.icone]}</span>
                  </span>
                  <span className="text-sm sm:text-base">{contact.texte}</span>
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 space-y-4">
            <input type="text" name="nom" placeholder="Nom" required value={form.nom} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
            <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
            <input type="text" name="sujet" placeholder="Sujet" value={form.sujet} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
            <textarea name="message" placeholder="Message" required rows="4" value={form.message} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300 transition" />
            <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-all duration-300">{statut === 'envoi' ? 'Envoi...' : 'Envoyer'}</button>
            {statut === 'succes' && <p className="text-green-600 text-sm text-center">Message envoyé avec succès !</p>}
            {statut === 'erreur' && <p className="text-red-600 text-sm text-center">Une erreur est survenue, réessaie.</p>}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}