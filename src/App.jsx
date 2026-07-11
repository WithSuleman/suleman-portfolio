import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

<main>
  <Hero />
  <About />
  <Skills />
  <Services />
  <Projects />
  <Experience />
  <Certificates/>
  <Contact />
  
</main>

      <Footer />
    </>
  );
}

export default App;