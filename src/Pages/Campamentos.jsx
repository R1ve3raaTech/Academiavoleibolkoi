import { Play } from 'lucide-react'
import comunidad from '@/assets/Photos/divisionintermedio2.webp'
import Reveal from '@/components/Reveal'
import { CONTACT } from '@/lib/contact'

export default function Campamentos() {
  return (
    <div>
      <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.2),transparent_35%),linear-gradient(180deg,#0b0d12,#05060a)]">
        <div className="rounded-md border-2 border-white px-12 py-5 text-center text-white">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight">
            Campamentos
          </h1>
        </div>
      </section>

      <Reveal as="section" className="px-8 py-20 text-center">
        <p className="mx-auto max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-6xl">
          Campamentos a la comunidad
        </p>
      </Reveal>

      <Reveal
        as="section"
        y={28}
        className="grid items-center gap-12 px-8 pb-20 md:grid-cols-2"
      >
        <a
          href={CONTACT.youtube}
          target="_blank"
          rel="noreferrer"
          className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-zinc-900"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),transparent_55%)]" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 transition-transform duration-500 ease-out group-hover:scale-110">
              <Play className="h-7 w-7 fill-white text-white" />
            </span>
          </span>
          <span className="absolute bottom-3 left-3 text-xs font-medium text-white/80">
            Ver en YouTube
          </span>
        </a>

        <div className="text-left">
          <p className="text-base leading-relaxed text-zinc-600">
            Como un acercamiento al deporte y disfrute vacacional, ofrecemos
            campamentos bajo objetivos lúdicos y de recreación.
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            En estos campamentos se mantiene contacto con el deporte para
            todos los niveles, creando dispersión mediante salud y
            movimiento en las épocas donde los jóvenes están de vacaciones.
          </p>
        </div>
      </Reveal>

      <Reveal
        as="section"
        y={28}
        className="grid items-center gap-12 px-8 pb-24 md:grid-cols-2"
      >
        <div className="text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
            Promoción del deporte
          </span>
          <p className="mt-4 text-3xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl">
            Salud y movimiento
          </p>
          <p className="mt-5 text-base leading-relaxed text-zinc-600">
            Incentivamos a nuestros jóvenes a moverse, agradecer sobre su
            salud y a esforzarse por ser mejores ciudadanos.
          </p>
          <p className="mt-4 text-sm font-medium text-blue-700">
            Con el apoyo del CCDR Alajuelita tuvimos la primera edición en
            enero de 2026.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl">
          <img
            src={comunidad}
            alt="Comunidad de campamentos Academia Voleibol Koi"
            className="w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          />
        </div>
      </Reveal>
    </div>
  )
}
