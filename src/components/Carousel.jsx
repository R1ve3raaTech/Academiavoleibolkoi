import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export default function Carousel({
  images,
  autoplay = true,
  interval = 4500,
  fit = 'contain',
  overlay,
  className = '',
}) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef(null)
  const slideRefs = useRef([])

  const goTo = (next) => {
    setIndex((current) => {
      const total = images.length
      const resolved = ((next % total) + total) % total
      return resolved
    })
  }

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, {
        opacity: i === index ? 1 : 0,
        scale: i === index ? 1 : 1.04,
        duration: 0.9,
        ease: 'fluid',
        pointerEvents: i === index ? 'auto' : 'none',
      })
    })
  }, [index])

  useEffect(() => {
    if (!autoplay || images.length < 2) return
    const id = setInterval(() => goTo(index + 1), interval)
    return () => clearInterval(id)
  }, [autoplay, interval, index, images.length])

  return (
    <div
      ref={trackRef}
      className={`group relative w-full overflow-hidden bg-zinc-900 ${className}`}
    >
      {images.map((src, i) => (
        <img
          key={src}
          ref={(el) => (slideRefs.current[i] = el)}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full ${
            fit === 'cover' ? 'object-cover' : 'object-contain'
          }`}
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}

      {overlay}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Anterior"
            className="absolute inset-y-0 left-0 z-10 w-1/2"
          />
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Siguiente"
            className="absolute inset-y-0 right-0 z-10 w-1/2"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Imagen ${i + 1}`}
                className={`pointer-events-auto h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-orange-500' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
