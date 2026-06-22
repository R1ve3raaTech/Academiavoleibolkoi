import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from '@/lib/gsap'

export default function PageTransition() {
  const ballRef = useRef(null)
  const location = useLocation()
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const ball = ballRef.current
    // cover instantly (before paint) so the route swap underneath is hidden
    gsap.set(ball, { scale: 1, x: 0, rotate: 0, opacity: 1 })

    gsap.to(ball, {
      scale: 0,
      x: '65vw',
      rotate: 540,
      opacity: 1,
      duration: 0.9,
      delay: 0.12,
      ease: 'fluid',
    })
  }, [location.pathname])

  return (
    <div
      ref={ballRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-1/2 top-1/2 z-[200] h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full opacity-0"
      style={{
        background:
          'radial-gradient(circle at 35% 30%, #f97316, #ea580c 45%, #7c2d12 100%)',
      }}
    />
  )
}
