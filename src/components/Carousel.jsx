import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'

export default function Carousel({ images, autoplay = true, interval = 4500 }) {
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
    <div className="group relative w-full">
      <div
        ref={trackRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900"
      >
        {images.map((src, i) => (
          <img
            key={src}
            ref={(el) => (slideRefs.current[i] = el)}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4 text-zinc-800" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4 text-zinc-800" />
          </button>

          <div className="mt-3 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Imagen ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-6 bg-orange-600 dark:bg-orange-500'
                    : 'w-1.5 bg-zinc-300 dark:bg-zinc-600'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
