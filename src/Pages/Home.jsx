import { lazy, Suspense, useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import logo from '@/assets/Photos/logo.png'
import WhatsappButton from '@/components/WhatsappButton'
import Reveal from '@/components/Reveal'

const HeroBall = lazy(() => import('@/components/HeroBall'))
import { Button } from '@/components/ui/button'
import { CONTACT } from '@/lib/contact'
import { celebrate } from '@/lib/confetti'
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap'

const values = ['Liderazgo', 'Disciplina', 'Integridad']

export default function Home() {
  const heroRef = useRef(null)
  const heroBgRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const split = new SplitText(headingRef.current, { type: 'words' })

    const tl = gsap.timeline()
    tl.from(split.words, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.08,
      ease: 'fluid',
    }).from(
      subRef.current,
      { opacity: 0, y: 16, duration: 1, ease: 'fluid' },
      '-=0.6',
    )

    const parallax = gsap.to(heroBgRef.current, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tl.revert()
      split.revert()
      parallax.scrollTrigger?.kill()
      parallax.kill()
    }
  }, [])

  return (
    <div>
      <section
        ref={heroRef}
        className="relative flex h-[560px] items-center justify-center overflow-hidden"
      >
        <div
          ref={heroBgRef}
          className="absolute inset-0 -top-[10%] h-[120%] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.2),transparent_35%),linear-gradient(180deg,#0b0d12,#05060a)]"
        />
        <div className="relative px-6 text-center text-white">
          <h1
            ref={headingRef}
            className="text-5xl font-extrabold tracking-tight md:text-6xl"
          >
            ACADEMIA VOLEIBOL KOI
          </h1>
          <div ref={subRef} className="mt-6">
            <div className="mx-auto h-1 w-16 bg-orange-600" />
            <p className="mt-4 text-lg tracking-[0.3em]">COSTA RICA</p>
          </div>
        </div>
        <Suspense fallback={null}>
          <HeroBall />
        </Suspense>
      </section>

      <Reveal as="div" y={12} className="flex justify-center py-8">
        <div className="rounded-full bg-white px-4 py-2 shadow-md dark:bg-zinc-900">
          <WhatsappButton />
        </div>
      </Reveal>

      <Reveal as="section" className="px-8 py-24 text-center md:py-32">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600 dark:text-orange-500">
          Sobre nosotros
        </span>
        <p className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-6xl dark:text-zinc-50">
          Pasión por el deporte.
          <br />
          <span className="text-blue-700 dark:text-blue-400">Formación para la vida.</span>
        </p>
      </Reveal>

      <section className="bg-zinc-50 px-8 py-20 dark:bg-zinc-900/40">
        <Reveal
          as="div"
          y={16}
          className="mx-auto flex max-w-3xl flex-wrap items-center gap-10 rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-900"
        >
          <img
            src={logo}
            alt="Academia Voleibol Koi"
            className="h-40 w-40 rounded-xl object-contain transition-transform duration-700 ease-out hover:scale-105"
          />
          <div className="flex-1 text-left">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              Entrenamientos para todas las edades
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Descubre tu potencial con entrenadores certificados. Desde
              principiantes hasta niveles competitivos.
            </p>
            <p className="mt-2 text-sm font-semibold text-orange-600 dark:text-orange-500">
              Pregunta por una clase de prueba
            </p>
            <Button
              asChild
              className="mt-5 rounded-md bg-orange-600 hover:bg-orange-700"
            >
              <a
                href={CONTACT.signupForm}
                target="_blank"
                rel="noreferrer"
                onClick={celebrate}
              >
                INSCRÍBETE
              </a>
            </Button>
          </div>
        </Reveal>
      </section>

      <Reveal
        as="section"
        y={28}
        className="grid items-center gap-12 px-8 py-24 md:grid-cols-2"
      >
        <div className="text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600 dark:text-orange-500">
            Nuestra Visión
          </span>
          <p className="mt-4 max-w-md text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-50">
            Respeto y superación, dentro y fuera de la cancha.
          </p>
          <ul className="mt-8 flex flex-wrap gap-5 text-sm font-medium text-blue-700 dark:text-blue-400">
            {values.map((value) => (
              <li key={value} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -right-2 -top-2 h-16 w-16 border-t-2 border-r-2 border-orange-600" />
          <div className="absolute -bottom-2 -left-2 h-16 w-16 border-b-2 border-l-2 border-blue-600" />
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.25),transparent_60%),linear-gradient(135deg,#1e1b3a,#05060a)] transition-transform duration-700 ease-out hover:scale-[1.02]" />
        </div>
      </Reveal>
    </div>
  )
}
