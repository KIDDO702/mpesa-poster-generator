import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import DynamicFormSelector from "./components/Input/DynamicFormSelector";
import Preview from "./components/Preview/Preview";

function App() {

  return (
    <main className="min-h-screen text-black transition-colors duration-300 league-spartan-regular bg-mpesa-white dark:bg-slate-950 dark:text-white">
      <Navbar />
      <Hero />

      <div className="flex flex-col lg:flex-row items-start w-[90%] mx-auto lg:space-x-4 py-10">
        <div className="lg:w-[35%] w-full">
          <DynamicFormSelector />
        </div>        
        <div className="lg:w-[65%] w-full mt-7 lg:mt-0">
          <Preview />
        </div>
      </div>
    </main>
  )
}

export default App
