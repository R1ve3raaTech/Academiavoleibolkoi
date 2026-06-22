import { useEffect, useRef } from 'react'
import { Volleyball } from 'lucide-react'
import { gsap } from '@/lib/gsap'

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"]'

export default function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    document.body.classList.add('custom-cursor-active')

    const el = dotRef.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'fluid' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'fluid' })
    const rotateTo = gsap.quickTo(el, 'rotate', {
      duration: 0.8,
      ease: 'fluid',
    })

    let rotation = 0
    let lastX = 0

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      rotation += (e.clientX - lastX) * 1.5
      rotateTo(rotation)
      lastX = e.clientX
    }

    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) {
        gsap.to(el, { scale: 1.5, duration: 0.3, ease: 'fluid' })
      }
    }
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) {
        gsap.to(el, { scale: 1, duration: 0.3, ease: 'fluid' })
      }
    }
    const onDown = () =>
      gsap.to(el, { scale: 0.75, duration: 0.15, ease: 'fluid' })
    const onUp = () =>
      gsap.to(el, { scale: 1, duration: 0.2, ease: 'fluid' })

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 custom-cursor-dot"
    >
      <Volleyball className="h-7 w-7 text-orange-600 drop-shadow-md" strokeWidth={1.75} />
    </div>
  )
}
