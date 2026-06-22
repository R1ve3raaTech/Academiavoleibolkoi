import { useEffect, useRef } from 'react'
import { Volleyball } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function ScrollBall() {
  const ballRef = useRef(null)

  useEffect(() => {
    const ball = ballRef.current
    let bounceTween = null
    let idleTimeout = null

    const bounce = () => {
      bounceTween?.kill()
      bounceTween = gsap.timeline()
        .to(ball, { y: -28, duration: 0.32, ease: 'power2.out' })
        .to(ball, { y: 0, duration: 0.42, ease: 'bounce.out' })
    }

    const onUpdate = (self) => {
      const total = ScrollTrigger.maxScroll(window) || 1
      const progress = self.scroll() / total
      gsap.to(ball, {
        top: `${8 + progress * 78}%`,
        duration: 0.6,
        ease: 'fluid',
      })

      const direction = self.direction
      gsap.to(ball, {
        rotate: direction === 1 ? '+=140' : '-=140',
        duration: 0.6,
        ease: 'fluid',
      })

      bounce()
      clearTimeout(idleTimeout)
      idleTimeout = setTimeout(() => {
        gsap.to(ball, { scale: 1, duration: 0.4, ease: 'fluid' })
      }, 200)
    }

    const trigger = ScrollTrigger.create({ onUpdate })

    return () => {
      trigger.kill()
      bounceTween?.kill()
      clearTimeout(idleTimeout)
    }
  }, [])

  return (
    <div
      ref={ballRef}
      aria-hidden="true"
      className="scroll-ball pointer-events-none fixed right-3 top-[8%] z-40 hidden drop-shadow-lg md:block"
    >
      <Volleyball className="h-9 w-9 text-orange-600" strokeWidth={1.5} />
    </div>
  )
}
