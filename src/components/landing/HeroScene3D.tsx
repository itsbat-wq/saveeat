"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";

// ============================================================
// SaveEat - HeroScene3D
// 3D Paper Bag with floating particles for the hero section
// ============================================================

// LogoPlane - Loads saveeatlogo.png as a texture for the bag front
function LogoPlane() {
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load("/saveeatlogo.png");
  }, []);

  return (
    <mesh position={[0, 0, 0.001]}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshStandardMaterial
        map={texture}
        transparent
        roughness={0.4}
        metalness={0}
      />
    </mesh>
  );
}

// -------------------------------------------------------
// Floating Particle System
// -------------------------------------------------------
function Particles({ count = 80 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random positions, speeds, and sizes for each particle
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ),
      speed: 0.2 + Math.random() * 0.6,
      offset: Math.random() * Math.PI * 2,
      radius: 0.015 + Math.random() * 0.04,
      orbitRadius: 0.3 + Math.random() * 1.2,
      orbitSpeed: 0.3 + Math.random() * 0.8,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      const floatY = Math.sin(t * p.speed + p.offset) * 0.6;
      const floatX = Math.cos(t * p.speed * 0.7 + p.offset) * 0.3;

      dummy.position.set(
        p.position.x + floatX,
        p.position.y + floatY,
        p.position.z
      );

      const scale = p.radius * (0.7 + 0.3 * Math.sin(t * 2 + p.offset));
      dummy.scale.setScalar(scale * 60);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color="#34d399" transparent opacity={0.75} />
    </instancedMesh>
  );
}

// -------------------------------------------------------
// Secondary Ambient Particles (larger, dimmer)
// -------------------------------------------------------
function AmbientOrbs({ count = 20 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const orbs = useMemo(() =>
    Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        -3 + Math.random() * -4
      ),
      speed: 0.1 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    })),
    [count]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;

    orbs.forEach((o, i) => {
      const floatY = Math.sin(t * o.speed + o.offset) * 1.2;
      dummy.position.set(o.position.x, o.position.y + floatY, o.position.z);
      dummy.scale.setScalar(1 + 0.15 * Math.sin(t * 1.5 + o.offset));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#059669" transparent opacity={0.12} />
    </instancedMesh>
  );
}

// -------------------------------------------------------
// Paper Bag Model (procedural geometry)
// -------------------------------------------------------
function PaperBag({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);
  const handleRef = useRef<THREE.Group>(null!);
  const foldRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  // Target rotation for smooth lerping
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Mouse tracking — smoothly follow cursor
      targetRotation.current.x = mouseY * 0.35;
      targetRotation.current.y = mouseX * 0.5;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.06
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y + t * 0.25,
        0.06
      );
    }

    // Gentle body distortion pulse
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.0 + Math.sin(t * 1.8) * 0.04);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.04 + 0.02 * Math.sin(t * 2);
    }

    // Subtle fold animation
    if (foldRef.current) {
      foldRef.current.position.y = 0.82 + Math.sin(t * 2.5) * 0.008;
    }

    // Handle gentle sway
    if (handleRef.current) {
      handleRef.current.rotation.z = Math.sin(t * 1.2) * 0.06;
    }
  });

  // ── Bag color ──────────────────────────────────────
  const bagColor = "#d4a574";
  const bagColorDark = "#b8865a";
  const bagColorInner = "#c49464";
  const accentGreen = "#10b981";
  const accentOrange = "#f97316";

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ── Outer glow sphere ─────────────────────────── */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      {/* ── Bag Body (main box) ───────────────────────── */}
      <mesh ref={bodyRef} castShadow receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[1.2, 1.6, 0.7, 1, 1, 1]} />
        <meshStandardMaterial
          color={bagColor}
          roughness={0.85}
          metalness={0.02}
          envMapIntensity={0.3}
        />
      </mesh>

      {/* ── Bag Body Side Shading (darker sides) ─────── */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.22, 1.62, 0.72]} />
        <meshStandardMaterial
          color={bagColorDark}
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ── Bottom flap ───────────────────────────────── */}
      <mesh position={[0, -0.92, 0]}>
        <boxGeometry args={[1.2, 0.04, 0.7]} />
        <meshStandardMaterial color={bagColorDark} roughness={0.9} />
      </mesh>

      {/* ── Front fold (top opening flap) ─────────────── */}
      <mesh ref={foldRef} position={[0, 0.82, 0.01]}>
        <boxGeometry args={[1.18, 0.24, 0.04]} />
        <meshStandardMaterial
          color={bagColorInner}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* ── Back top fold ─────────────────────────────── */}
      <mesh position={[0, 0.82, -0.01]}>
        <boxGeometry args={[1.18, 0.24, 0.04]} />
        <meshStandardMaterial
          color={bagColorDark}
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* ── Interior top (dark opening) ───────────────── */}
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[1.1, 0.12, 0.62]} />
        <meshStandardMaterial color="#2a1a0a" roughness={1} />
      </mesh>

      {/* ── SaveEat Logo (Textured PNG) ───────────────── */}
      <group position={[0, -0.05, 0.361]}>
        {/* Logo background circle */}
        <mesh position={[0, 0, -0.005]}>
          <circleGeometry args={[0.32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Logo border ring */}
        <mesh position={[0, 0, -0.003]}>
          <torusGeometry args={[0.32, 0.015, 8, 30]} />
          <meshStandardMaterial color="#10b981" roughness={0.6} emissive="#22c55e" emissiveIntensity={0.15} />
        </mesh>
        {/* Logo image plane */}
        <LogoPlane />
      </group>

      {/* ── Handles (Thin Paper Ropes) ───────────────── */}
      <group ref={handleRef}>
        {/* Left handle arc */}
        <mesh position={[-0.28, 0.8, -0.08]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.35, 0.015, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#deb887" roughness={0.9} />
        </mesh>

        {/* Right handle arc */}
        <mesh position={[0.28, 0.8, 0.08]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.35, 0.015, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#deb887" roughness={0.9} />
        </mesh>
      </group>

      {/* ── Food items sticking out of the bag ────────  */}
      <group position={[0, 0.9, 0]}>
        {/* Bento Box (black/dark grey tray) */}
        <mesh position={[-0.2, 0.1, -0.1]} rotation={[0.2, -0.2, 0.1]} castShadow>
          <boxGeometry args={[0.6, 0.1, 0.4]} />
          <meshStandardMaterial color="#333" roughness={0.8} />
        </mesh>
        
        {/* Rice in Bento */}
        <mesh position={[-0.3, 0.15, -0.1]} rotation={[0.2, -0.2, 0.1]}>
          <boxGeometry args={[0.2, 0.05, 0.2]} />
          <meshStandardMaterial color="#fafafa" roughness={1} />
        </mesh>

        {/* Veggies / Curry in Bento */}
        <mesh position={[-0.05, 0.15, -0.15]} rotation={[0.2, -0.2, 0.1]}>
          <boxGeometry args={[0.25, 0.05, 0.15]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.5} />
        </mesh>

        {/* Some green veggies */}
        <mesh position={[0.0, 0.2, 0.0]} rotation={[-0.1, 0.3, 0.1]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.7} />
        </mesh>

        {/* Fried Chicken / Dimsum (golden brown spheres) */}
        <mesh position={[0.25, 0.2, 0.1]} rotation={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#d97706" roughness={0.6} />
        </mesh>
        <mesh position={[0.15, 0.25, 0.15]} rotation={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#d97706" roughness={0.6} />
        </mesh>
        <mesh position={[0.35, 0.15, 0.15]} rotation={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#d97706" roughness={0.6} />
        </mesh>
        
        {/* Bread / Sandwich stick */}
        <mesh position={[0.15, 0.2, -0.2]} rotation={[0.2, 0.4, 0.5]} castShadow>
          <boxGeometry args={[0.5, 0.08, 0.2]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.9} />
        </mesh>
      </group>

      {/* ── Bottom crease lines ───────────────────────── */}
      <mesh position={[0, -0.65, 0.352]}>
        <boxGeometry args={[1.16, 0.008, 0.003]} />
        <meshStandardMaterial color={bagColorDark} roughness={1} />
      </mesh>
      <mesh position={[0, -0.42, 0.352]}>
        <boxGeometry args={[0.8, 0.006, 0.003]} />
        <meshStandardMaterial color={bagColorDark} roughness={1} />
      </mesh>

      {/* ── Green leaf decoration ─────────────────────── */}
      <mesh position={[0.28, 0.05, 0.368]} rotation={[0, 0, 0.3]}>
        <sphereGeometry args={[0.1, 8, 6]} />
        <meshStandardMaterial
          color="#065f46"
          roughness={0.8}
          emissive="#10b981"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[0.22, 0.12, 0.368]} rotation={[0, 0, -0.4]}>
        <sphereGeometry args={[0.07, 8, 6]} />
        <meshStandardMaterial
          color="#047857"
          roughness={0.8}
          emissive="#10b981"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* ── Point light emanating from logo ──────────── */}
      <pointLight
        position={[0, -0.05, 0.8]}
        color="#10b981"
        intensity={0.4}
        distance={2.5}
      />

      {/* ── Orange accent glow (bottom) ───────────────── */}
      <pointLight
        position={[0, -1.2, 0.5]}
        color="#f97316"
        intensity={0.15}
        distance={2}
      />
    </group>
  );
}

// -------------------------------------------------------
// Ring / Orbit Decoration
// -------------------------------------------------------
function OrbitRing({ radius, speed, color, opacity, tilt = 0 }: {
  radius: number;
  speed: number;
  color: string;
  opacity: number;
  tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

// -------------------------------------------------------
// Floating Food Emoji Spheres (decorative)
// -------------------------------------------------------
function FloatingOrb({
  position,
  color,
  size,
  speed,
  offset,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.4;
      ref.current.position.x = position[0] + Math.cos(t * speed * 0.7 + offset) * 0.2;
      ref.current.rotation.y = t * 0.8;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.6}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// -------------------------------------------------------
// Ground Reflection Plane
// -------------------------------------------------------
function GroundGlow() {
  return (
    <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial
        color="#10b981"
        transparent
        opacity={0.025}
      />
    </mesh>
  );
}

// -------------------------------------------------------
// Camera Mouse Parallax Controller
// -------------------------------------------------------
function CameraParallax({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.5, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 0.3, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// -------------------------------------------------------
// Inner Scene (inside Canvas)
// -------------------------------------------------------
function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      {/* Environment & lighting */}
      <ambientLight intensity={1.2} color="#ffffff" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
        color="#ffffff"
        castShadow
      />
      <directionalLight
        position={[-4, 3, 2]}
        intensity={1.0}
        color="#fcd34d"
      />
      <pointLight position={[-5, 5, 3]} color="#10b981" intensity={1.5} distance={15} />
      <hemisphereLight args={["#ffffff", "#e2e8f0", 1.2]} />

      {/* Camera parallax */}
      <CameraParallax mouseX={mouseX} mouseY={mouseY} />

      {/* Paper bag (main hero) */}
      <Float
        speed={1.8}
        rotationIntensity={0.08}
        floatIntensity={0.6}
        floatingRange={[-0.15, 0.15]}
      >
        <PaperBag mouseX={mouseX} mouseY={mouseY} />
      </Float>

      {/* Orbit rings */}
      <OrbitRing radius={2.2} speed={0.18} color="#10b981" opacity={0.18} tilt={Math.PI / 6} />
      <OrbitRing radius={2.8} speed={-0.10} color="#34d399" opacity={0.09} tilt={-Math.PI / 5} />
      <OrbitRing radius={3.4} speed={0.07} color="#f97316" opacity={0.06} tilt={Math.PI / 3} />

      {/* Floating decorative orbs */}
      <FloatingOrb position={[-2.8, 0.8, -0.5]} color="#10b981" size={0.14} speed={0.6} offset={0} />
      <FloatingOrb position={[2.6, -0.6, -0.8]} color="#f97316" size={0.11} speed={0.8} offset={2} />
      <FloatingOrb position={[-2.2, -1.2, 0.3]} color="#34d399" size={0.09} speed={0.5} offset={4} />
      <FloatingOrb position={[2.0, 1.4, -0.4]} color="#fbbf24" size={0.08} speed={0.7} offset={1} />
      <FloatingOrb position={[3.2, 0.2, -1]} color="#10b981" size={0.12} speed={0.4} offset={3} />
      <FloatingOrb position={[-3.0, -0.3, -0.6]} color="#60a5fa" size={0.10} speed={0.65} offset={5} />

      {/* Particle systems */}
      <Particles count={90} />
      <AmbientOrbs count={18} />

      {/* Ground glow */}
      <GroundGlow />

      {/* Central glow sphere (behind bag) */}
      <mesh position={[0, 0, -1.5]}>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}

// -------------------------------------------------------
// Loading Fallback
// -------------------------------------------------------
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Animated bag placeholder */}
        <div className="w-28 h-36 rounded-xl bg-gradient-to-b from-yellow-700/30 to-yellow-900/30 border border-yellow-600/20 animate-pulse" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-yellow-600/20 animate-pulse" />
        {/* Particles placeholder */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-pulse"
            style={{
              top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 60}px`,
              left: `${56 + Math.cos(i * 45 * Math.PI / 180) * 60}px`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------
// Main Export — HeroScene3D
// -------------------------------------------------------
interface HeroScene3DProps {
  mouseX?: number;
  mouseY?: number;
  className?: string;
}

export default function HeroScene3D({
  mouseX = 0,
  mouseY = 0,
  className = "",
}: HeroScene3DProps) {
  return (
    <div
      className={`w-full h-full canvas-wrapper ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        shadows
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Canvas>
    </div>
  );
}
