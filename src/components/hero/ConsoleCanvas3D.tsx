'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader2 } from 'lucide-react';

interface ConsoleCanvas3DProps {
  onExploreClick?: () => void;
  className?: string;
}

export function ConsoleCanvas3D({ onExploreClick, className = '' }: ConsoleCanvas3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const pivotGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera: positioned for commanding, majestic DualSense presence
    const width = container.clientWidth || 780;
    const height = container.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.set(0, -0.05, 3.35);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting: Pristine white key + cool fill + rim illumination matching reference image
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.3);
    scene.add(ambientLight);

    // Front-Right Key Light: pure crisp studio light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(3, 5, 5);
    scene.add(keyLight);

    // Front-Left Fill Light: soft cool tone
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.8);
    fillLight.position.set(-4, 3, 4.5);
    scene.add(fillLight);

    // Top Light: crisp top contour definition on shoulders and touchpad
    const topLight = new THREE.DirectionalLight(0xffffff, 2.0);
    topLight.position.set(0, 7, 2.5);
    scene.add(topLight);

    // DualSense signature electric blue lightbar glow
    const ledPointLight = new THREE.PointLight(0x38bdf8, 5.5, 8);
    ledPointLight.position.set(0, 0.35, 0.9);
    scene.add(ledPointLight);

    // Back Atmospheric Rim Light: deep PlayStation blue edge rim
    const rimLight = new THREE.DirectionalLight(0x2563eb, 3.5);
    rimLight.position.set(0, -1.5, -4);
    scene.add(rimLight);

    // Soft backlight glow behind controller
    const backGlowLight = new THREE.PointLight(0x0284c7, 3.0, 9);
    backGlowLight.position.set(0, 0, -1.5);
    scene.add(backGlowLight);

    // Pivot group
    const pivotGroup = new THREE.Group();
    scene.add(pivotGroup);
    pivotGroupRef.current = pivotGroup;

    // Rotation order 'YXZ' so Three.js applies: Rx(-PI/2) first, then Ry(PI) in world space.
    // Result: front face (+Y in rest) → +Z (toward camera) ✓
    //         grips (-Z in rest) → -Y (pointing DOWN in image) ✓
    //         D-pad (mirrored by root matrix) → left side ✓
    pivotGroup.rotation.order = 'YXZ';
    // Keep the controller face-on, with only a subtle five-degree left roll.
    const baseRotationX = -Math.PI / 2 - 0.08;
    const baseRotationY = Math.PI + 0.10;
    const baseRotationZ = -0.09;

    pivotGroup.rotation.x = baseRotationX;
    pivotGroup.rotation.y = baseRotationY;
    pivotGroup.rotation.z = baseRotationZ;

    // Load actual PS5 DualSense 3D Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/ps5.glb',
      (gltf) => {
        const model = gltf.scene;

        // Auto center geometry
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        // Scale: 3.4 units — big, majestic, dominant hero presence matching reference image
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 3.35 / maxDim;
        pivotGroup.scale.setScalar(scaleFactor);

        // Adjust materials for premium matte finish
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat.isMeshStandardMaterial) {
                mat.roughness = 0.38;
                mat.metalness = 0.08;
                mat.needsUpdate = true;
              }
            }
          }
        });

        pivotGroup.add(model);
        setIsLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error('Failed to load PS5 model:', err);
        setIsLoading(false);
      }
    );

    // Interactive Hover Tilt: Only right and left tilt with hover, always facing full front
    let targetTiltY = 0;
    let targetTiltZ = 0;
    let targetTiltX = 0;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;

      // Left-right tilt (yaw and roll bank)
      targetTiltY = normX * 0.28;
      targetTiltZ = -normX * 0.10;
      targetTiltX = -normY * 0.10;
    };

    const handleWindowMouseLeave = () => {
      targetTiltY = 0;
      targetTiltZ = 0;
      targetTiltX = 0;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    document.addEventListener('mouseleave', handleWindowMouseLeave);

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth || 700;
      const newHeight = container.clientHeight || 460;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (pivotGroup) {
        const currentBaseX = baseRotationX + targetTiltX;
        const currentBaseY = baseRotationY + targetTiltY;
        const currentBaseZ = baseRotationZ + targetTiltZ;

        pivotGroup.rotation.x += (currentBaseX - pivotGroup.rotation.x) * 0.08;
        pivotGroup.rotation.y += (currentBaseY - pivotGroup.rotation.y) * 0.08;
        pivotGroup.rotation.z += (currentBaseZ - pivotGroup.rotation.z) * 0.08;

        // Subtle gentle idle floating wave, kept low so the model overlaps the title.
        pivotGroup.position.y = -0.20 + Math.sin(elapsed * 1.5) * 0.03;
        pivotGroup.position.x = Math.cos(elapsed * 1.1) * 0.012;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      document.removeEventListener('mouseleave', handleWindowMouseLeave);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}>
      {/* Deep Atmospheric PlayStation Blue Glow (Wide) */}
      <div 
        className="absolute w-[560px] sm:w-[720px] lg:w-[860px] h-[360px] sm:h-[460px] lg:h-[540px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none opacity-90"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(29, 78, 216, 0.48) 0%, rgba(37, 99, 235, 0.32) 40%, rgba(14, 165, 233, 0.15) 65%, transparent 80%)'
        }}
      />

      {/* Radiant Electric Azure Core Glow directly behind controller */}
      <div 
        className="absolute w-[360px] sm:w-[480px] lg:w-[580px] h-[240px] sm:h-[320px] lg:h-[380px] rounded-full blur-[65px] sm:blur-[85px] pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(ellipse at 50% 48%, rgba(56, 189, 248, 0.55) 0%, rgba(30, 144, 255, 0.35) 45%, transparent 75%)'
        }}
      />

      {/* 3D WebGL Canvas Container: Big dominant hero centerpiece */}
      <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[580px] xl:h-[620px] flex items-center justify-center">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 backdrop-blur-sm bg-black/40 rounded-3xl">
            <Loader2 className="w-7 h-7 text-cyan-400 animate-spin" />
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-bold tracking-widest uppercase text-white/90">
                Loading DualSense 3D
              </span>
              <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(10, loadProgress)}%` }}
                />
              </div>
              <span className="text-[10px] text-cyan-300 font-mono">
                {loadProgress > 0 ? `${loadProgress}%` : 'Initializing...'}
              </span>
            </div>
          </div>
        )}

        <div
          ref={mountRef}
          className="w-full h-full relative flex items-center justify-center z-10 pointer-events-none"
        />
      </div>

      {/* Upward clean white triangle indicator from reference image */}
      <div className="flex flex-col items-center -mt-3 sm:-mt-4 mb-2 z-10 pointer-events-none">
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
      </div>
    </div>
  );
}
