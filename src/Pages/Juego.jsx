import Reveal from '@/components/Reveal'
import VolleyballGame from '@/components/VolleyballGame'

export default function Juego() {
  return (
    <div>
      <Reveal as="section" className="px-8 py-20 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600 dark:text-orange-500">
          Un descanso
        </span>
        <p className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-6xl dark:text-zinc-50">
          ¿Cuántos toques aguantas?
        </p>
      </Reveal>

      <Reveal as="section" className="px-8 pb-24">
        <VolleyballGame />
      </Reveal>
    </div>
  )
}
