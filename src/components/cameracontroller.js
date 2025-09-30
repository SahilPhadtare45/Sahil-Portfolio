import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    // Lock camera orientation
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null; // nothing to render, just side-effect
}
