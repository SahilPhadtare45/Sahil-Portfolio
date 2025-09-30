// App.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Avatar from "./components/avatar";
import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* -------- FuturisticSphere (unchanged, kept for context) -------- */
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
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhysicalMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.8}
          transmission={1}
        />
      </mesh>

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

/* -------- CameraRig: GSAP-driven camera proxy with smoothing -------- */
function CameraRig() {
  const { camera } = useThree();
  const proxy = useRef({
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    rotX: camera.rotation.x,
    rotY: camera.rotation.y,
    rotZ: camera.rotation.z,
    fov: camera.fov,
  });

  useEffect(() => {
    // Timeline mapped to the same sections you have in #main-container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // smooth scrubbing; increase for more smoothing
        // markers: true, // enable for debugging
      },
    });

    // For each "section" define the camera state (x,y,z, rotation and fov)
    // Tweak these values to move/zoom/tilt/rotate the camera for each page section.
    tl.to(proxy.current, { x: 0, y: 0, z: 12, rotY: 0, fov: 45, duration: 1 }); // Home
    tl.to(proxy.current, { x: -2, y: 1, z: 10, rotY: Math.PI / 4, fov: 50, duration: 1 }); // About
    tl.to(proxy.current, { x: 2, y: -1, z: 8, rotY: Math.PI / 2, fov: 55, duration: 1 }); // Experience
    tl.to(proxy.current, { x: 0, y: 0, z: 6, rotY: Math.PI, fov: 60, duration: 1 }); // Skills
    tl.to(proxy.current, { x: 0, y: -2, z: 5, rotY: Math.PI * 1.5, fov: 65, duration: 1 }); // Projects
    tl.to(proxy.current, { x: 0, y: -3, z: 4, rotY: Math.PI * 2, fov: 70, duration: 1 }); // Contact

    return () => {
      // cleanup on unmount
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  // Smoothly lerp camera to the proxy each frame for cinematic motion
  useFrame(() => {
    const p = proxy.current;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, p.x, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, p.y, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, p.z, 0.08);

    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, p.rotX || 0, 0.08);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, p.rotY || 0, 0.08);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, p.rotZ || 0, 0.08);

    camera.fov = THREE.MathUtils.lerp(camera.fov, p.fov || camera.fov, 0.08);
    camera.updateProjectionMatrix();
  });

  return null;
}

/* -------- App component (with improved GSAP cleanup and usage) -------- */
gsap.registerPlugin(ScrollTrigger);

function App() {
  const avatarRef = useRef();

  useEffect(() => {
    const avatar = avatarRef.current;
    if (!avatar) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
    });

    // Section 1: Home
    tl.to(avatar.position, { x: 0, y: 0, z: 10, duration: 1 });
    tl.to(avatar.scale, { x: 5, y: 5, z: 5, duration: 1 }, "<");
    tl.to(avatar.rotation, { y: 0, duration: 1 }, "<");

    // Section 2: About
    tl.to(avatar.position, { x: -2, y: 1, z: 12, duration: 1 });
    tl.to(avatar.scale, { x: 6, y: 6, z: 6, duration: 1 }, "<");
    tl.to(avatar.rotation, { y: Math.PI / 4, duration: 1 }, "<");

    // Section 3: Experience
    tl.to(avatar.position, { x: 2, y: -1, z: 14, duration: 1 });
    tl.to(avatar.scale, { x: 7, y: 7, z: 7, duration: 1 }, "<");
    tl.to(avatar.rotation, { y: Math.PI / 2, duration: 1 }, "<");

    // Section 4: Skills
    tl.to(avatar.position, { x: 0, y: 0, z: 18, duration: 1 });
    tl.to(avatar.scale, { x: 9, y: 9, z: 9, duration: 1 }, "<");
    tl.to(avatar.rotation, { y: Math.PI, duration: 1 }, "<");

    // Section 5: Projects
    tl.to(avatar.position, { x: 0, y: -2, z: 20, duration: 1 });
    tl.to(avatar.scale, { x: 10, y: 10, z: 10, duration: 1 }, "<");
    tl.to(avatar.rotation, { y: Math.PI * 1.5, duration: 1 }, "<");

    // Section 6: Contact
    tl.to(avatar.position, { x: 0, y: -3, z: 22, duration: 1 });
    tl.to(avatar.scale, { x: 8, y: 8, z: 8, duration: 1 }, "<");
    tl.to(avatar.rotation, { y: Math.PI * 2, duration: 1 }, "<");

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="main-div">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 10]} intensity={3.5} />

            <group ref={avatarRef}>
              <Avatar autoRotate={false} />
            </group>

            {/* CameraRig replaces the prior CameraController */}
            <CameraRig />

            {/* Disable orbit controls while camera is scroll-driven.
                If you want user interaction, toggle enabled on pointer events. */}
            <OrbitControls enableZoom={false} enablePan={false} enabled={false} />
          </Canvas>
        </div>

        {/* Navbar */}
        <div className="nav-bar">
          <div className="sphere-wrapper">
            <Canvas style={{ width: "680px", height: "680px" }} camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <FuturisticSphere />
            </Canvas>
          </div>

          <div className="nav-left">
            <div className="nav-links">
              <span onClick={() => scrollToSection("home")}>Home</span>
              <span onClick={() => scrollToSection("about")}>About</span>
              <span onClick={() => scrollToSection("experience")}>Experience</span>
              <span onClick={() => scrollToSection("skills")}>Skills</span>
              <span onClick={() => scrollToSection("projects")}>Projects</span>
            </div>
          </div>

          <button className="contact-btn" onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </div>

        {/* Sections wrapper */}
        <div id="main-container">
          <section id="home" className="section">
            <div className="content">
              <div className="hero">Hi, I’m <span className="name">Sahil 👋</span></div>
              <p className="details">Web Developer • UI/UX Enthusiast • Futuristic Thinker</p>
            </div>
          </section>

          <section id="about" className="section">About Content</section>
          <section id="experience" className="section">Experience Content</section>
          <section id="skills" className="section">Skills Content</section>
          <section id="projects" className="section">Projects Content</section>

          <section id="contact" className="section">
            <h2>Contact Me</h2>
            <form>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Message"></textarea>
              <button type="submit">Send</button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
