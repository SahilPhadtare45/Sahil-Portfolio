import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Background Canvas (stars + sphere) */} 
      <Canvas 
      style={{ position: "absolute", top: 0, left: 0, zIndex: 99 }} 
      camera={{ position: [0, 0, 500], fov: 60 }} > 
      <Stars radius={400} depth={60} count={5000} factor={20} saturation={0} fade /> 
      <ambientLight intensity={0.5} /> 
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      </Canvas>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
