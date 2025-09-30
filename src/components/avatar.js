// Avatar.jsx
import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Avatar({ autoRotate = true }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/model.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log("Available animations:", Object.keys(actions));

    if (actions["ArmatureAction"]) {
      actions["ArmatureAction"]
        .reset()
        .setLoop(THREE.LoopRepeat, Infinity)
        .play();
    }
  }, [actions]);

  // Add slow auto rotation
  useFrame(() => {
    if (autoRotate && group.current) {
      group.current.rotation.y += 0.003; // adjust speed
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={10} // increased size
      position={[0, -20, 0]} // centered model vertically
    />
  );
}
