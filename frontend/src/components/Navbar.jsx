import { useState } from 'react'

const liens = [
  { texte: 'Accueil', lien: '#accueil' },
  { texte: 'Ce que je fais', lien: '#cequejefais' },
  { texte: 'Réalisations', lien: '#realisations' },
  { texte: 'Mon CV', lien: '#cv' },
  { texte: 'Me contacter', lien: '#contact' },
]

export default function Navbar() {
  const [ouvert, setOuvert] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur text-white z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#accueil" className="text-xl font-bold text-pink-400">Aïssatou Dia</a>

        <div className="hidden md:flex gap-6 text-sm">
          {liens.map((item) => (
            <a key={item.texte} href={item.lien} className="hover:text-pink-400 transition">{item.texte}</a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOuvert(!ouvert)}
          aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={ouvert}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            {ouvert ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {ouvert && (
        <div className="md:hidden border-t border-white/10 px-6 pb-4">
          {liens.map((item) => (
            <a
              key={item.texte}
              href={item.lien}
              onClick={() => setOuvert(false)}
              className="block py-3 text-base border-b border-white/5 hover:text-pink-400 transition"
            >
              {item.texte}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
