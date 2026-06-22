import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { createVolleyballTexture } from '@/lib/volleyballTexture'

function Ball() {
  const meshRef = useRef(null)
  const texture = useMemo(() => createVolleyballTexture(), [])

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.25
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.4, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.55} metalness={0.05} />
    </mesh>
  )
}

export default function HeroBall() {
  return (
    <div className="absolute bottom-6 right-6 hidden h-64 w-64 md:block lg:h-80 lg:w-80">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 5]} intensity={1.4} />
          <directionalLight position={[-4, -2, -3]} intensity={0.4} />
          <Ball />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.6}
          />
        </Suspense>
      </Canvas>
      <p className="pointer-events-none text-center text-[11px] uppercase tracking-[0.2em] text-white/50">
        Arrastra para girar
      </p>
    </div>
  )
}
