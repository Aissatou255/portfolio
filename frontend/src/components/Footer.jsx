const navigation = [
  { texte: 'Accueil', lien: '#accueil' },
  { texte: 'Ce que je fais', lien: '#cequejefais' },
  { texte: 'Réalisations', lien: '#realisations' },
  { texte: 'Mon CV', lien: '#cv' },
  { texte: 'Me contacter', lien: '#contact' },
]

const reseaux = [
  {
    nom: 'Email',
    lien: 'mailto:diaaicha2021@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    nom: 'Téléphone',
    lien: 'tel:+221776588879',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    nom: 'GitHub',
    lien: 'https://github.com/Aissatou255',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-white">
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="text-3xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aïssatou <span className="text-pink-500">Dia</span>
            </p>
            <p className="text-pink-400 text-sm font-medium mb-4">Développeuse Web Full Stack</p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Je transforme des idées en solutions numériques utiles, accessibles et pensées pour les besoins réels.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-5">Navigation</p>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.texte}>
                  <a href={item.lien} className="text-gray-400 text-sm hover:text-pink-400 hover:pl-1 transition-all">{item.texte}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-5">Restons en contact</p>
            <p className="text-gray-400 text-sm mb-1">diaaicha2021@gmail.com</p>
            <p className="text-gray-400 text-sm mb-1">+221 77 658 88 79</p>
            <p className="text-gray-400 text-sm mb-6">Dakar, Sénégal</p>
            <div className="flex gap-3">
              {reseaux.map((r) => (
                <a key={r.nom} href={r.lien} target="_blank" rel="noreferrer" aria-label={r.nom} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 hover:-translate-y-1 transition-all duration-300">
                  <span className="w-5 h-5">{r.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Aïssatou Dia. Tous droits réservés.
          </p>
          <a href="#accueil" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-pink-400 transition-colors">
            Retour en haut
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}