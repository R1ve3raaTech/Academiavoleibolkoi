import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import ballImage from '@/assets/Photos/mikasa_ball.png'

function Ball() {
  const meshRef = useRef(null)
  const texture = useTexture(ballImage)

  useFrame(({ clock }) => {
    // gentle sway instead of a full spin, since the photo only covers
    // the front of the ball - a full rotation would expose the seam
    meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.35
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.4, 64, 64]} />
      <meshStandardMaterial map={texture} roughness={0.45} metalness={0.05} />
    </mesh>
  )
}

export default function HeroBall() {
  return (
    <div className="absolute bottom-6 right-6 hidden h-64 w-64 md:block lg:h-80 lg:w-80">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 4, 5]} intensity={1.5} />
          <directionalLight position={[-4, -2, -3]} intensity={0.4} />
          <Ball />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.5}
            minPolarAngle={Math.PI / 2 - 0.5}
            maxPolarAngle={Math.PI / 2 + 0.5}
            minAzimuthAngle={-0.7}
            maxAzimuthAngle={0.7}
          />
        </Suspense>
      </Canvas>
      <p className="pointer-events-none text-center text-[11px] uppercase tracking-[0.2em] text-white/50">
        Arrastra para ladear
      </p>
    </div>
  )
}
