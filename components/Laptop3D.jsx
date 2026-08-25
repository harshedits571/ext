"use client";

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PresentationControls, ContactShadows, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

function MacbookModel({ hovered, ...props }) {
  const { nodes, materials } = useGLTF('/macbook.glb');
  const lidRef = useRef();
  
  // Create a raw HTML video element (Cloudinary streaming is much lighter on memory than a 100MB local file)
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = 'https://res.cloudinary.com/dpxpczyhh/video/upload/v1781972444/landscape__jupv1z.mp4';
    vid.crossOrigin = 'Anonymous';
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.play();
    return vid;
  });

  // Inject the video texture safely into the existing LCD material
  useEffect(() => {
    if (materials.LCD && video) {
      const texture = new THREE.VideoTexture(video);
      texture.flipY = false;
      materials.LCD.map = texture;
      materials.LCD.emissiveMap = texture; // Apply to emissive to override the default glowing wallpaper
      materials.LCD.emissive = new THREE.Color('white'); // Ensure it glows perfectly
      materials.LCD.color = new THREE.Color('white'); // Ensure the video isn't tinted dark
      materials.LCD.needsUpdate = true;
      
      // Make the glass layers perfectly clear so they don't block or wash out the screen
      if (materials['Display glass']) {
        materials['Display glass'].transparent = true;
        materials['Display glass'].opacity = 0.1;
      }
      if (materials['Display glass nanotexture']) {
        materials['Display glass nanotexture'].transparent = true;
        materials['Display glass nanotexture'].opacity = 0.1;
      }
    }
  }, [materials, video]);

  useFrame((state, delta) => {
    const closedRotation = -Math.PI / 2 + 0.1;
    const openRotation = 0; 
    const targetRotation = hovered ? openRotation : closedRotation;

    if (lidRef.current) {
      lidRef.current.rotation.x = THREE.MathUtils.damp(
        lidRef.current.rotation.x,
        targetRotation,
        5,
        delta
      );
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Keyboard Area */}
      <group position={[0, 0, 0.008]}>
        <mesh geometry={nodes.Keyboard_1.geometry} material={materials.Keycap} />
        <mesh geometry={nodes.Keyboard_2.geometry} material={materials['Keycap transparent plastic']} />
        <mesh geometry={nodes.Keyboard_3.geometry} material={materials['Anodized aluminum']} />
      </group>
      
      {/* Lid / Screen Area (Hinged) */}
      <group position={[0, -0.001, -0.121]} rotation={[-Math.PI / 2, 0, 0]} ref={lidRef}>
        <mesh geometry={nodes.Lid_1.geometry} material={materials['Anodized aluminum']} />
        <mesh geometry={nodes.Lid_2.geometry} material={materials['Rubber gasket']} />
        <mesh geometry={nodes.Lid_3.geometry} material={materials['Plastic cover']} />
        <mesh geometry={nodes.Lid_4.geometry} material={materials.LCD} />
        <mesh geometry={nodes.Lid_5.geometry} material={materials['Black anodized aluminum']} />
        <mesh geometry={nodes.Lid_6.geometry} material={materials['Apple logo']} />
        <mesh geometry={nodes.Lid_7.geometry} material={materials['Display glass nanotexture']} />
        <mesh geometry={nodes.Lid_8.geometry} material={materials['Display frame']} />
        <mesh geometry={nodes.Lid_9.geometry} material={materials['Display glass']} />
        <mesh geometry={nodes.Lid_10.geometry} material={materials['Camera frame']} />
        <mesh geometry={nodes.Lid_11.geometry} material={materials['Camera lens']} />
      </group>

      {/* Base Chassis Elements */}
      <mesh geometry={nodes.Bottom_case_1.geometry} material={materials['Anodized aluminum']} />
      <mesh geometry={nodes.Bottom_case_2.geometry} material={materials['Rubber feet']} />
      <mesh geometry={nodes.Bottom_case_3.geometry} material={materials['Metal screw']} />
      <mesh geometry={nodes.Top_case_1.geometry} material={materials['Anodized aluminum']} />
      <mesh geometry={nodes.Top_case_2.geometry} material={materials['Gold pads']} />
      <mesh geometry={nodes.Top_case_3.geometry} material={materials['USBC port']} />
      <mesh geometry={nodes.Top_case_4.geometry} material={materials['Steel sheet']} />
      <mesh geometry={nodes.Top_case_5.geometry} material={materials.Keycap} />
      <mesh geometry={nodes.Top_case_6.geometry} material={materials['Jack port']} />
      <mesh geometry={nodes.Top_case_7.geometry} material={materials['Speaker mesh']} />
      <mesh geometry={nodes.Top_case_8.geometry} material={materials['Magsafe port']} />
      <mesh geometry={nodes.Top_case_9.geometry} material={materials['Black anodized aluminum']} />
      <mesh geometry={nodes.Trackpad_1.geometry} material={materials['Touchpad glass']} />
      <mesh geometry={nodes.Trackpad_2.geometry} material={materials['Touchpad tint']} />
    </group>
  );
}

useGLTF.preload('/macbook.glb');

// A simple loading fallback
function Loader() {
  return (
    <Html center>
      <div style={{ color: '#000', fontWeight: '500' }}>Loading 3D...</div>
    </Html>
  );
}

export default function Laptop3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="device-mockup glass" 
      style={{ width: '100%', height: '100%', minHeight: '600px', border: 'none', background: 'transparent', boxShadow: 'none' }}
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0.2, 1.5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Suspense fallback={<Loader />}>
          <PresentationControls 
            global 
            rotation={[0.13, 0.1, 0]} 
            polar={[-0.4, 0.2]} 
            azimuth={[-1, 0.75]} 
            config={{ mass: 2, tension: 400 }} 
            snap={{ mass: 4, tension: 400 }}
          >
            <MacbookModel hovered={hovered} scale={2.5} position={[0, -0.2, 0]} />
          </PresentationControls>
          
          <ContactShadows position={[0, -0.22, 0]} opacity={0.4} scale={15} blur={3} far={4.5} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
