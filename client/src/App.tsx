import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import PosterBuilder from "./components/Preview/PosterBuilder"

function App() {

  return (
    <main className="min-h-screen text-black transition-colors duration-300 league-spartan-regular bg-mpesa-white dark:bg-slate-950 dark:text-white">
      <Navbar />
      <Hero />

      <PosterBuilder />      
    </main>
  )
}

export default App
