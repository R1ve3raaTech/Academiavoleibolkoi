import Reveal from '@/components/Reveal'
import { ALIANZAS } from '@/lib/alianzas'

export default function Alianzas() {
  return (
    <div>
      <Reveal as="section" className="px-8 py-24 text-center md:py-32">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
          Alianzas
        </span>
        <p className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-6xl">
          Quienes caminan junto a nosotros.
        </p>
      </Reveal>

      <Reveal
        as="section"
        y={20}
        batch
        className="grid gap-6 px-8 pb-20 md:grid-cols-2 lg:grid-cols-3"
      >
        {ALIANZAS.map((alianza) => (
          <div
            key={alianza.name}
            className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-sm transition-transform duration-700 ease-out hover:-translate-y-1"
          >
            <img
              src={alianza.logo}
              alt={alianza.name}
              className="h-24 w-24 object-contain"
            />
            <h2 className="text-lg font-bold text-blue-700">
              {alianza.name}
            </h2>
            <p className="text-sm text-zinc-600">{alianza.description}</p>
          </div>
        ))}
      </Reveal>
    </div>
  )
}
