import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Reveal({
  as: Tag = 'div',
  children,
  className,
  y = 24,
  stagger = 0.08,
  delay = 0,
  batch = false,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const targets = ref.current.children.length
      ? [...ref.current.children]
      : [ref.current]

    gsap.set(targets, { opacity: 0, y })

    let cleanup

    if (batch) {
      // each child reveals on its own as it scrolls into view, rather
      // than all firing together when the container hits the trigger
      const triggers = ScrollTrigger.batch(targets, {
        start: 'top 88%',
        onEnter: (batchTargets) =>
          gsap.to(batchTargets, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            stagger: 0.1,
            ease: 'fluid',
            overwrite: true,
          }),
      })
      cleanup = () => triggers.forEach((t) => t.kill())
    } else {
      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay,
        stagger,
        ease: 'fluid',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      })
      cleanup = () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }

    return () => {
      cleanup()
      gsap.set(targets, { clearProps: 'opacity,transform' })
    }
  }, [y, stagger, delay, batch])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
