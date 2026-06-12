'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ChromeKnot() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.12
    ref.current.rotation.y += delta * 0.08
    ref.current.rotation.z += delta * 0.04
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} castShadow>
        <torusKnotGeometry args={[1.4, 0.38, 256, 48, 2, 3]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={1}
          roughness={0.03}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  )
}

function FloatingOrbs() {
  const orbData = useMemo(
    () => [
      { pos: [3.5, 1.5, -1] as [number, number, number], scale: 0.3, speed: 0.8 },
      { pos: [-3, -1, -2] as [number, number, number], scale: 0.18, speed: 1.1 },
      { pos: [2, -2.5, 0.5] as [number, number, number], scale: 0.22, speed: 0.6 },
      { pos: [-2.5, 2, -0.5] as [number, number, number], scale: 0.14, speed: 1.3 },
    ],
    []
  )

  return (
    <>
      {orbData.map((orb, i) => (
        <Float key={i} speed={orb.speed} floatIntensity={0.5}>
          <mesh position={orb.pos} scale={orb.scale}>
            <icosahedronGeometry args={[1, 2]} />
            <meshPhysicalMaterial
              color="#0A0A0A"
              metalness={1}
              roughness={0.0}
              reflectivity={1}
              clearcoat={1}
              envMapIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function Particles() {
  const count = 1500
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4
    }
    return pos
  }, [])

  const ref = useRef<THREE.Points>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#00D4FF"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[-8, 8, 8]} color="#00D4FF" intensity={12} />
      <pointLight position={[8, -6, -8]} color="#00FF88" intensity={6} />
      <pointLight position={[0, 0, 12]} color="#FFFFFF" intensity={2} />
      <Environment preset="night" />
      <Stars radius={80} depth={60} count={2000} factor={1.5} saturation={0} fade speed={0.4} />
      <ChromeKnot />
      <FloatingOrbs />
      <Particles />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 52 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
