// App.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Avatar from "./components/avatar";
import { useRef, useEffect } from "react";
import "./App.css";

function FuturisticSphere() {
  const sphereRef = useRef();

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.004;
      sphereRef.current.rotation.x += 0.002;
    }
  });

  return (
    <group ref={sphereRef} position={[-4, 0, 0]} scale={[1, 1, 1]}>
      {/* Transparent Glass Sphere */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhysicalMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.8}
          transmission={1} // glass-like effect
        />
      </mesh>

      {/* Wireframe Overlay */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          wireframe
          emissive="#00ffff"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}

function App() {
  // Ref for avatar to move it with scroll
  const avatarRef = useRef();

  // Scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (avatarRef.current) {
        avatarRef.current.rotation.y = scrollY * 0.002;
        avatarRef.current.position.y = -scrollY * 0.01; // avatar moves down as scroll
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    {/* Background Canvas (stars + sphere) */} 
      <Canvas 
      style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} 
      camera={{ position: [0, 0, 100], fov: 60 }} > 
      <Stars radius={400} depth={60} count={5000} factor={20} saturation={0} fade /> 
      <ambientLight intensity={0.5} /> 
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      </Canvas>
    
      
    <div className="main-div">
      {/* Navbar */}
      <div className="nav-bar">
         {/* Sphere inside Canvas */}
             <div className="sphere-wrapper">

          <Canvas
            style={{ width: "680px", height: "680px" }}
            camera={{ position: [0, 0, 8], fov: 50 }}
          >
            <ambientLight intensity={0.5} />
            <FuturisticSphere />
          </Canvas>
              </div>

        <div className="nav-left">
         

          {/* Navbar links */}
          <div className="nav-links">
            <span onClick={() => scrollToSection("home")}>Home</span>
            <span onClick={() => scrollToSection("about")}>About</span>
            <span onClick={() => scrollToSection("experience")}>Experience</span>
            <span onClick={() => scrollToSection("skills")}>Skills</span>
            <span onClick={() => scrollToSection("projects")}>Projects</span>
          </div>
        </div>

        {/* Contact Button */}
        <button
          className="contact-btn"
          onClick={() => scrollToSection("contact")}
        >
          Contact
        </button>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero">
          Hi, I’m <span className="name">Sahil 👋</span>
        </div>
        <p className="details">
          Web Developer • UI/UX Enthusiast • Futuristic Thinker
        </p>

        {/* Avatar 3D */}
        <div className="avatar-con">
          <Canvas camera={{ position: [0, 10, 90], fov: 50 }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 10]} intensity={3.5} />
            <group ref={avatarRef}>
              <Avatar scale={6} />
            </group>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ height: "100vh" }}>About Content</section>
      <section id="experience" style={{ height: "100vh" }}>Experience Content</section>
      <section id="skills" style={{ height: "100vh" }}>Skills Content</section>
      <section id="projects" style={{ height: "100vh" }}>Projects Content</section>

      {/* Contact Section */}
      <section id="contact" style={{ height: "100vh" }}>
        <h2>Contact Me</h2>
        <form>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
    </>
  );
}

export default App;
