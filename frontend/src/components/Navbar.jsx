export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur text-white z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-xl font-bold text-pink-400">Aïssatou Dia</span>
        <div className="hidden sm:flex gap-6 text-sm">
          <a href="#accueil" className="hover:text-pink-400 transition">Accueil</a>
          <a href="#cequejefais" className="hover:text-pink-400 transition">Ce que je fais</a>
          <a href="#realisations" className="hover:text-pink-400 transition">Réalisations</a>
          <a href="#cv" className="hover:text-pink-400 transition">Mon CV</a>
          <a href="#contact" className="hover:text-pink-400 transition">Me contacter</a>
        </div>
      </div>
    </nav>
  )
}