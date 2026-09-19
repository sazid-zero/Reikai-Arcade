'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sfx } from '../../lib/sound';
import { Sparkles, Rotate3d, Eye, Sliders, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

export type Colorway = 'orchid' | 'glacial' | 'emerald' | 'crimson';

interface ColorwayConfig {
  name: string;
  hex: string;
  lightHex: number;
  textColor: string;
  bgGlow: string;
}

export const COLORWAYS: Record<Colorway, ColorwayConfig> = {
  orchid: {
    name: 'Neon Orchid',
    hex: '#8b5cf6',
    lightHex: 0x8b5cf6,
    textColor: 'text-violet-400',
    bgGlow: 'from-violet-600/30 via-fuchsia-600/10 to-transparent'
  },
  glacial: {
    name: 'Glacial Cyan',
    hex: '#00d2ff',
    lightHex: 0x00d2ff,
    textColor: 'text-cyan-400',
    bgGlow: 'from-cyan-500/30 via-blue-600/10 to-transparent'
  },
  emerald: {
    name: 'Cyber Emerald',
    hex: '#00ff9d',
    lightHex: 0x00ff9d,
    textColor: 'text-emerald-400',
    bgGlow: 'from-emerald-500/30 via-teal-600/10 to-transparent'
  },
  crimson: {
    name: 'Samurai Crimson',
    hex: '#ff3366',
    lightHex: 0xff3366,
    textColor: 'text-rose-400',
    bgGlow: 'from-rose-600/30 via-red-600/10 to-transparent'
  }
};

interface ConsoleCanvas3DProps {
  onExploreClick?: () => void;
}

export function ConsoleCanvas3D({ onExploreClick }: ConsoleCanvas3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeColorway, setActiveColorway] = useState<Colorway>('glacial');
  const [viewMode, setViewMode] = useState<'3d-webgl' | 'cinematic-render'>('3d-webgl');
  const [isInteracting, setIsInteracting] = useState(false);

  // References for Three.js scene elements
  const sceneRef = useRef<THREE.Scene | null>(null);
  const ledMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const controllerGroupRef = useRef<THREE.Group | null>(null);

  // Card 3D tilt state for cinematic-render view
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (viewMode !== '3d-webgl') return;

    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 4.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x4f46e5, 2.0);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    const activeCfg = COLORWAYS[activeColorway];
    const ledPointLight = new THREE.PointLight(activeCfg.lightHex, 3.5, 10);
    ledPointLight.position.set(0, 0.5, 1.2);
    scene.add(ledPointLight);
    pointLightRef.current = ledPointLight;

    // Build Procedural Next-Gen DualSense Controller Mesh
    const controllerGroup = new THREE.Group();
    controllerGroupRef.current = controllerGroup;

    // 1. Materials
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.15,
      metalness: 0.25
    });

    const blackCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f0f18,
      roughness: 0.35,
      metalness: 0.4
    });

    const metallicAccent = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.1,
      metalness: 0.9
    });

    const ledGlowMaterial = new THREE.MeshStandardMaterial({
      color: activeCfg.lightHex,
      emissive: activeCfg.lightHex,
      emissiveIntensity: 2.2,
      roughness: 0.1
    });
    ledMaterialsRef.current = [ledGlowMaterial];

    // 2. Central Shell
    const centerBodyGeo = new THREE.BoxGeometry(1.5, 0.8, 0.4);
    const centerBody = new THREE.Mesh(centerBodyGeo, shellMaterial);
    controllerGroup.add(centerBody);

    // 3. Ergonomic Grip Handles (Left & Right)
    const gripGeo = new THREE.CylinderGeometry(0.24, 0.32, 1.5, 32);

    const leftGrip = new THREE.Mesh(gripGeo, shellMaterial);
    leftGrip.position.set(-1.05, -0.45, 0.05);
    leftGrip.rotation.z = Math.PI / 6.5;
    leftGrip.rotation.x = -Math.PI / 16;
    controllerGroup.add(leftGrip);

    const rightGrip = new THREE.Mesh(gripGeo, shellMaterial);
    rightGrip.position.set(1.05, -0.45, 0.05);
    rightGrip.rotation.z = -Math.PI / 6.5;
    rightGrip.rotation.x = -Math.PI / 16;
    controllerGroup.add(rightGrip);

    // 4. Black Inner Underbelly
    const underbellyGeo = new THREE.BoxGeometry(1.3, 0.6, 0.35);
    const underbelly = new THREE.Mesh(underbellyGeo, blackCoreMaterial);
    underbelly.position.set(0, -0.15, -0.05);
    controllerGroup.add(underbelly);

    // 5. Touchpad (Front Center)
    const touchpadGeo = new THREE.BoxGeometry(0.95, 0.55, 0.05);
    const touchpad = new THREE.Mesh(touchpadGeo, blackCoreMaterial);
    touchpad.position.set(0, 0.18, 0.21);
    controllerGroup.add(touchpad);

    // 6. Dual LED Lightbar Guide (Flanking Touchpad)
    const lightbarGeo = new THREE.BoxGeometry(0.04, 0.58, 0.06);
    const leftLed = new THREE.Mesh(lightbarGeo, ledGlowMaterial);
    leftLed.position.set(-0.5, 0.18, 0.22);
    controllerGroup.add(leftLed);

    const rightLed = new THREE.Mesh(lightbarGeo, ledGlowMaterial);
    rightLed.position.set(0.5, 0.18, 0.22);
    controllerGroup.add(rightLed);

    // 7. Dual Thumbsticks
    const stickBaseGeo = new THREE.CylinderGeometry(0.25, 0.28, 0.12, 24);
    const stickShaftGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.25, 16);
    const stickCapGeo = new THREE.CylinderGeometry(0.22, 0.19, 0.08, 24);

    // Left Stick Assembly
    const leftStickGroup = new THREE.Group();
    leftStickGroup.position.set(-0.45, -0.22, 0.22);
    const leftBase = new THREE.Mesh(stickBaseGeo, blackCoreMaterial);
    leftBase.rotation.x = Math.PI / 2;
    const leftLedRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.02, 12, 32), ledGlowMaterial);
    leftLedRing.position.set(0, 0, 0.06);
    const leftShaft = new THREE.Mesh(stickShaftGeo, metallicAccent);
    leftShaft.position.set(0, 0, 0.12);
    leftShaft.rotation.x = Math.PI / 2;
    const leftCap = new THREE.Mesh(stickCapGeo, blackCoreMaterial);
    leftCap.position.set(0, 0, 0.2);
    leftCap.rotation.x = Math.PI / 2;
    leftStickGroup.add(leftBase, leftLedRing, leftShaft, leftCap);
    controllerGroup.add(leftStickGroup);

    // Right Stick Assembly
    const rightStickGroup = new THREE.Group();
    rightStickGroup.position.set(0.45, -0.22, 0.22);
    const rightBase = new THREE.Mesh(stickBaseGeo, blackCoreMaterial);
    rightBase.rotation.x = Math.PI / 2;
    const rightLedRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.02, 12, 32), ledGlowMaterial);
    rightLedRing.position.set(0, 0, 0.06);
    const rightShaft = new THREE.Mesh(stickShaftGeo, metallicAccent);
    rightShaft.position.set(0, 0, 0.12);
    rightShaft.rotation.x = Math.PI / 2;
    const rightCap = new THREE.Mesh(stickCapGeo, blackCoreMaterial);
    rightCap.position.set(0, 0, 0.2);
    rightCap.rotation.x = Math.PI / 2;
    rightStickGroup.add(rightBase, rightLedRing, rightShaft, rightCap);
    controllerGroup.add(rightStickGroup);

    // 8. D-Pad (Left side)
    const dpadCrossH = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 0.08), blackCoreMaterial);
    const dpadCrossV = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.08), blackCoreMaterial);
    dpadCrossH.position.set(-0.85, 0.15, 0.22);
    dpadCrossV.position.set(-0.85, 0.15, 0.22);
    controllerGroup.add(dpadCrossH, dpadCrossV);

    // 9. Action Face Buttons (Right side - Triangle, Circle, Cross, Square)
    const btnGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.06, 16);
    const btnPositions = [
      [0.85, 0.28, 0.22], // Triangle (North)
      [0.98, 0.15, 0.22], // Circle (East)
      [0.85, 0.02, 0.22], // Cross (South)
      [0.72, 0.15, 0.22]  // Square (West)
    ];
    btnPositions.forEach(([x, y, z]) => {
      const btn = new THREE.Mesh(btnGeo, blackCoreMaterial);
      btn.position.set(x, y, z);
      btn.rotation.x = Math.PI / 2;
      controllerGroup.add(btn);
    });

    // 10. Shoulder Bumpers (L1, R1)
    const bumperGeo = new THREE.BoxGeometry(0.38, 0.12, 0.2);
    const leftBumper = new THREE.Mesh(bumperGeo, metallicAccent);
    leftBumper.position.set(-0.8, 0.44, 0.05);
    const rightBumper = new THREE.Mesh(bumperGeo, metallicAccent);
    rightBumper.position.set(0.8, 0.44, 0.05);
    controllerGroup.add(leftBumper, rightBumper);

    // 11. Center ReiKai Emblem Button
    const psBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.04, 20), ledGlowMaterial);
    psBtn.position.set(0, -0.05, 0.22);
    psBtn.rotation.x = Math.PI / 2;
    controllerGroup.add(psBtn);

    scene.add(controllerGroup);

    // 12. Floating Cyber Dust Particle Field
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 6;
      particlePos[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: activeCfg.lightHex,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.15;
    let targetRotY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevPointerX;
        const deltaY = clientY - prevPointerY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevPointerX = clientX;
        prevPointerY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = mouseX * 0.6;
        targetRotX = 0.15 - mouseY * 0.4;
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
      sfx.play('click');
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchmove', handlePointerMove, { passive: true });
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damping rotation
      controllerGroup.rotation.y += (targetRotY - controllerGroup.rotation.y) * 0.08;
      controllerGroup.rotation.x += (targetRotX - controllerGroup.rotation.x) * 0.08;

      // Floating idle wave
      controllerGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
      controllerGroup.position.x = Math.cos(elapsed * 1.2) * 0.04;

      // Subtle particle swirl
      particles.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchmove', handlePointerMove);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchend', handlePointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [viewMode]);

  // Update LED color when colorway changes
  useEffect(() => {
    const activeCfg = COLORWAYS[activeColorway];
    if (pointLightRef.current) {
      pointLightRef.current.color.setHex(activeCfg.lightHex);
    }
    ledMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(activeCfg.lightHex);
      mat.emissive.setHex(activeCfg.lightHex);
    });
  }, [activeColorway]);

  const handleMouseMoveCinematic = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeaveCinematic = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Dynamic Ambient Background Glow */}
      <div 
        className={`absolute -inset-10 bg-radial ${COLORWAYS[activeColorway].bgGlow} blur-3xl opacity-70 pointer-events-none transition-all duration-700`}
      />

      {/* 3D Canvas / Render Showcase Frame */}
      <div className="relative w-full max-w-2xl h-[380px] sm:h-[460px] md:h-[500px] flex items-center justify-center">
        {viewMode === '3d-webgl' ? (
          <div 
            ref={mountRef} 
            className="w-full h-full cursor-grab active:cursor-grabbing relative flex items-center justify-center z-10"
            title="Click & Drag to Rotate in 360°"
          >
            {/* Interaction Hint */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-semibold text-slate-300 flex items-center gap-2 pointer-events-none transition-opacity duration-300 ${isInteracting ? 'opacity-0' : 'opacity-80'}`}>
              <Rotate3d className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Drag to rotate 360°</span>
            </div>
          </div>
        ) : (
          /* Cinematic 3D Render View with Interactive Parallax */
          <div 
            onMouseMove={handleMouseMoveCinematic}
            onMouseLeave={handleMouseLeaveCinematic}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02, 1.02, 1.02)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative w-full h-full max-h-[440px] rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-white/10 z-10 group"
          >
            <Image
              src="/images/controller_3d.jpg"
              alt="Next-Gen ReiKai Pro Controller"
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-white">
              <span className="font-bold flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-cyan-400" /> Ultra-HD Raytraced Studio Model
              </span>
              <span className="text-cyan-300 font-mono text-[11px]">8K Fidelity</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Control Bar: View Switcher & Colorways */}
      <div className="relative z-20 mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-4 py-2.5 rounded-full bg-[#0d0d1c]/80 border border-white/10 backdrop-blur-xl shadow-xl">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
          <button
            onClick={() => {
              sfx.play('power');
              setViewMode('3d-webgl');
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === '3d-webgl'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-600/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>WebGL 3D</span>
          </button>
          <button
            onClick={() => {
              sfx.play('power');
              setViewMode('cinematic-render');
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'cinematic-render'
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-violet-600/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Studio Render</span>
          </button>
        </div>

        <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

        {/* Colorway LED Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
            LED Aura:
          </span>
          {(Object.keys(COLORWAYS) as Colorway[]).map((cw) => {
            const config = COLORWAYS[cw];
            const isSelected = activeColorway === cw;
            return (
              <button
                key={cw}
                onClick={() => {
                  sfx.play('cyber');
                  setActiveColorway(cw);
                }}
                title={config.name}
                className={`group relative w-6 h-6 rounded-full transition-transform duration-200 ${
                  isSelected ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black' : 'hover:scale-110 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: config.hex }}
              >
                {isSelected && (
                  <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: config.hex }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
