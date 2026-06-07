import ChatBot from './components/ChatBot';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { initGA, trackPageView } from "./analytics";

import AuroraBackground from "./components/AuroraBackground";
import Certificates from "./components/Certificates";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

import "./AuroraBackground.css";

function App() {
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "skills",
      "projects",
      "certificates",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      let currentSection = "home";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (section && section.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <AuroraBackground />

      <Navbar
        toggleTheme={toggleTheme}
        theme={theme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
      <ChatBot />
      <Footer />
    </>
  );
}

export default App;