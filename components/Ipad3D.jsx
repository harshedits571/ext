"use client";

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PresentationControls, ContactShadows, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

function IpadModel({ hovered, ...props }) {
  const { nodes, materials } = useGLTF('/ipad.glb');
  const groupRef = useRef();
  
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

  useEffect(() => {
    if (materials && video) {
      const texture = new THREE.VideoTexture(video);
      texture.flipY = false;
      // Rotate texture by 90 degrees clockwise (-Math.PI / 2) around its center
      texture.center.set(0.5, 0.5);
      texture.rotation = -Math.PI / 2;
      
      // Auto-detect the screen material by finding which material has an emissiveMap or map
      // This is a robust way to find the screen without knowing the exact hash name
      Object.values(materials).forEach((mat) => {
        if (mat.map || mat.emissiveMap || mat.name.toLowerCase().includes('screen')) {
          mat.map = null; // Remove standard map to prevent double-lighting
          mat.emissiveMap = texture;
          mat.emissive = new THREE.Color('white');
          mat.emissiveIntensity = 1.0;
          mat.color = new THREE.Color('black'); // Set base color to black so it doesn't reflect ambient light (which washes it out)
          mat.toneMapped = false; // Prevent ThreeJS from applying automatic exposure adjustments
          mat.needsUpdate = true;
        }
        
        // Also make any glass layers highly transparent to prevent glare
        if (mat.name.toLowerCase().includes('glass') || mat.transparent) {
            mat.transparent = true;
            mat.opacity = 0.05; // Make it extremely sheer so it doesn't wash out the screen
            mat.needsUpdate = true;
        }
      });
    }
  }, [materials, video]);

  useFrame((state, delta) => {
    const targetRotationX = hovered ? -0.1 : 0;
    const targetRotationY = hovered ? 0.2 : 0;

    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotationX, 5, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotationY, 5, delta);
    }
  });

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <group {...props} dispose={null} ref={groupRef} onClick={handleTogglePlay} onPointerDown={(e) => e.target.setPointerCapture?.(e.pointerId)} onPointerUp={(e) => e.target.releasePointerCapture?.(e.pointerId)}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.abCKdjTFXRDygDg.geometry} material={materials.JGhcZOBeEEFTHKn} position={[0, 0.004, -0.002]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.AbYqbWxJIHjOZby.geometry} material={materials.EpOuwNoAjZWsZKD} position={[0, 0.003, -0.103]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.alyIYLaJSyxzdjo.geometry} material={materials.kUWkRDVotcMnHsa} position={[-0.129, -0.002, -0.081]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.AuxUZFpIdyYVcpo.geometry} material={materials.HlUmGTGdgbnvPsa} position={[0, 0.004, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.aYGfoaryUOhgTnS.geometry} material={materials.zCUrKvqTeumKwRd} position={[0.135, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.BhdBOkQlZaHDoTI.geometry} material={materials.zuOGnslJhlJpvBY} position={[-0.126, -0.003, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.BmDZUOLgRVavGIP.geometry} material={materials.INAgtdCGscvtqIb} position={[-0.009, 0.003, -0.103]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.CvToSjLIImJXFhl.geometry} material={materials.zCUrKvqTeumKwRd} position={[0.138, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.eYyEVqzuBtjteIL.geometry} material={materials.EpOuwNoAjZWsZKD} position={[0.136, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.fbKTxlqodhqsaMX.geometry} material={materials.ObnnNhDMEKJGYGc} position={[0.009, 0.004, -0.103]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.FiSxQFtcGwcRlhx.geometry} material={materials.EpOuwNoAjZWsZKD} position={[-0.126, -0.003, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.forEYBSDPZlTPjB.geometry} material={materials.kUWkRDVotcMnHsa} position={[-0.114, -0.002, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.hmueEDnpjMcGMDz.geometry} material={materials.INAgtdCGscvtqIb} position={[-0.126, -0.002, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.hoqhCUbvqDNHqRQ.geometry} material={materials.zCUrKvqTeumKwRd} position={[0.137, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.hpmcIBmvWpyGHCe.geometry} material={materials.LmsMoHQNffKUBTk} position={[0.111, -0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.iBeJOrSUxnhIKau.geometry} material={materials.VHiYeyhfwJCxecr} position={[0.128, -0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.IilirTaurautXUM.geometry} material={materials.GGmNvstEGFjWJgL} position={[-0.126, -0.003, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.JGCbxCvPCDUDNDn.geometry} material={materials.ObnnNhDMEKJGYGc} position={[0, 0.004, -0.103]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.jgPRgPdpKSiOXLh.geometry} material={materials.EpOuwNoAjZWsZKD} position={[-0.015, 0.004, -0.03]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.jSATzURBcTcYgwk.geometry} material={materials.GfvpWvxgaKYWFyg} position={[0.137, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.KAUAFnASbDDqbjr.geometry} material={materials.GGmNvstEGFjWJgL} position={[-0.009, 0.003, -0.103]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.KEbVxBONOCIIMlV.geometry} material={materials.sbwzFjTAKUIwznL} position={[-0.12, -0.002, -0.081]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.KIKPIQftEQLSIGR.geometry} material={materials.ObnnNhDMEKJGYGc} position={[-0.011, 0.004, -0.042]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.LfbvDayYmwCLGgH.geometry} material={materials.eUutxxUdCpSsNmn} position={[-0.005, 0.004, -0.103]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.LiBWsJueARwHeyy.geometry} material={materials.EpOuwNoAjZWsZKD} position={[-0.12, -0.002, -0.088]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.lZqTYwxpqlcavHT.geometry} material={materials.GfvpWvxgaKYWFyg} position={[-0.126, -0.003, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.McvRagXjmFhgQdO.geometry} material={materials.SAojaDrNKuRjUfl} position={[-0.014, 0.001, -0.021]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.MSiFPAFArNdbWRR.geometry} material={materials.ALwGWlgsdcFeIUW} position={[0.136, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.nTwZIAwkagNFGnY.geometry} material={materials.bMbvkgDjFaRXBwT} position={[-0.131, 0, 0.001]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.nvUUcAsUXWUkLSN.geometry} material={materials.WmIWTCLERDcqxSX} position={[0.128, -0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.NyGNnOKIVWPDXax.geometry} material={materials.ALwGWlgsdcFeIUW} position={[-0.12, -0.002, -0.081]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.OGSRAhdSqtkjQMb.geometry} material={materials.IHWKjkrmiwbOFTH} position={[0, 0.001, -0.002]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.qpCZMHZiiKuzTcT.geometry} material={materials.IMOWJWdEXKJRkmm} position={[-0.063, 0.001, -0.108]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.rFBGASmDBnpjGSc.geometry} material={materials.zuOGnslJhlJpvBY} position={[-0.009, 0.004, -0.103]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.rQTOHXsvleKeWwr.geometry} material={materials.zhkMyvjxXbwgJAI} position={[-0.126, -0.002, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.RTKWTMHQzhACFeV.geometry} material={materials.bMbvkgDjFaRXBwT} position={[0.128, -0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.rYYeUMPiMwFRHIG.geometry} material={materials.EpOuwNoAjZWsZKD} position={[-0.126, 0.002, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.TIaOxogwgmXIHqv.geometry} material={materials.zCUrKvqTeumKwRd} position={[0.134, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.TvCCuUJvayYeyRp.geometry} material={materials.bMbvkgDjFaRXBwT} position={[0, 0.001, -0.108]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.uuuokMkIpLSMAUC.geometry} material={materials.GfvpWvxgaKYWFyg} position={[0.137, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.UVpecKJGwemnicG.geometry} material={materials.INAgtdCGscvtqIb} position={[-0.126, -0.002, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.VDrxmwCKuMJbOrN.geometry} material={materials.GfvpWvxgaKYWFyg} position={[0.136, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.viFxqLrOsGXiEnE.geometry} material={materials.zhkMyvjxXbwgJAI} position={[-0.009, 0.003, -0.103]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.wTXUGlwJUSOfxZY.geometry} material={materials.zCUrKvqTeumKwRd} position={[0.137, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.WWrgLTyPTAXTjUV.geometry} material={materials.euSZRXUQbKsAaPS} position={[-0.025, 0, -0.022]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.xfkAjFnAOwFauIm.geometry} material={materials.IyNcZeQAXJlnfTb} position={[-0.003, -0.001, 0.001]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.XtUsEXbIIYkfVAu.geometry} material={materials.xUNvBRVUcBVKMpV} position={[0.128, -0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.xyobRhOPEwyWxaY.geometry} material={materials.eUutxxUdCpSsNmn} position={[-0.136, 0.004, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.yfRfuoEFNIcZGev.geometry} material={materials.pZEJEUWlAIlYurO} position={[-0.12, -0.003, -0.081]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.yJwCklIOhimiTwo.geometry} material={materials.GfvpWvxgaKYWFyg} position={[0.134, 0.001, 0]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.YNxUkobHtiPdNCm.geometry} material={materials.EpOuwNoAjZWsZKD} position={[-0.004, 0.001, -0.014]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.ZqiJcXiEeUXUJtw.geometry} material={materials.zhkMyvjxXbwgJAI} position={[-0.126, -0.002, -0.094]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
        <mesh geometry={nodes.zzxkxqJBrKgpwhU.geometry} material={materials.RRggASOdsjdJMgp} position={[-0.113, -0.003, -0.081]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={0.01} />
      </group>
    </group>
  );
}

useGLTF.preload('/ipad.glb');

function Loader() {
  return (
    <Html center>
      <div style={{ color: '#000', fontWeight: '500' }}>Loading iPad 3D...</div>
    </Html>
  );
}

export default function Ipad3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="device-mockup glass" 
      style={{ width: '100%', height: '100%', minHeight: '600px', border: 'none', background: 'transparent', boxShadow: 'none' }}
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 1.2], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Suspense fallback={<Loader />}>
          <PresentationControls 
            global 
            rotation={[0, 0, 0]} 
            polar={[-0.4, 0.2]} 
            azimuth={[-1, 0.75]} 
            config={{ mass: 2, tension: 400 }} 
            snap={{ mass: 4, tension: 400 }}
          >
            <IpadModel hovered={hovered} scale={2.5} position={[0, -0.0, 0]} rotation={[Math.PI / 1, 3, 0]} />
          </PresentationControls>
          
          <ContactShadows position={[0, -1.0, 0]} opacity={0.4} scale={10} blur={3} far={4.5} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
