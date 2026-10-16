import { useEffect, useState } from 'react'

const liens = [
  { texte: 'Accueil', lien: '#accueil' },
  { texte: 'Ce que je fais', lien: '#cequejefais' },
  { texte: 'Réalisations', lien: '#realisations' },
  { texte: 'Mon CV', lien: '#cv' },
  { texte: 'Me contacter', lien: '#contact' },
]

export default function Navbar() {
  const [ouvert, setOuvert] = useState(false)
  const [actif, setActif] = useState('#accueil')

  useEffect(() => {
    const ids = liens.map((item) => item.lien.slice(1))

    const calculer = () => {
      const repere = window.scrollY + 120
      let courant = ids[0]

      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top + window.scrollY <= repere) {
          courant = id
        }
      }

      const basDePage = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (basDePage) courant = ids[ids.length - 1]

      setActif('#' + courant)
    }

    calculer()
    window.addEventListener('scroll', calculer, { passive: true })
    window.addEventListener('resize', calculer)

    return () => {
      window.removeEventListener('scroll', calculer)
      window.removeEventListener('resize', calculer)
    }
  }, [])

  const texteActif = liens.find((item) => item.lien === actif)?.texte

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur text-white z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#accueil" onClick={() => setActif('#accueil')} className="text-xl font-bold text-pink-400">Aïssatou Dia</a>

        <span className="md:hidden relative pb-1 text-xs font-medium text-pink-300">
          {texteActif}
          <span className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-pink-500" />
        </span>

        <div className="hidden md:flex gap-6 text-sm">
          {liens.map((item) => {
            const estActif = actif === item.lien
            return (
              <a
                key={item.texte}
                href={item.lien}
                onClick={() => setActif(item.lien)}
                aria-current={estActif ? 'true' : undefined}
                className={`relative pb-1 transition ${estActif ? 'text-pink-400' : 'hover:text-pink-400'}`}
              >
                {item.texte}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 rounded-full bg-pink-500 transition-all duration-300 ${estActif ? 'w-full' : 'w-0'}`}
                />
              </a>
            )
          })}
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
          {liens.map((item) => {
            const estActif = actif === item.lien
            return (
              <a
                key={item.texte}
                href={item.lien}
                onClick={() => {
                  setActif(item.lien)
                  setOuvert(false)
                }}
                className={`block py-3 text-base border-b border-white/5 transition ${
                  estActif ? 'text-pink-400 border-l-4 border-l-pink-500 pl-3' : 'hover:text-pink-400'
                }`}
              >
                {item.texte}
              </a>
            )
          })}
        </div>
      )}
    </nav>
  )
}