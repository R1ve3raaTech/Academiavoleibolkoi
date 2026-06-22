import Reveal from '@/components/Reveal'
import Carousel from '@/components/Carousel'
import { CATEGORIAS_GALERIA } from '@/lib/galeria'

export default function Galeria() {
  return (
    <div>
      <section className="relative flex h-[320px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.25),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.2),transparent_35%),linear-gradient(180deg,#0b0d12,#05060a)]">
        <div className="rounded-md border-2 border-white px-12 py-5 text-center text-white">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight">
            Galería
          </h1>
        </div>
      </section>

      <Reveal as="section" className="px-8 py-20 text-center">
        <p className="mx-auto max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-6xl">
          Momentos de la Academia
        </p>
      </Reveal>

      <div className="flex flex-col gap-20 px-8 pb-20">
        {CATEGORIAS_GALERIA.map((categoria, i) => (
          <Reveal
            key={categoria.title}
            as="section"
            y={28}
            className={`grid items-center gap-10 md:grid-cols-2 ${
              i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="text-left">
              <h2 className="text-2xl font-bold text-blue-700">
                {categoria.title}
              </h2>
              <div className="mt-2 h-1 w-10 bg-orange-600" />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
                {categoria.description}
              </p>
            </div>
            <Carousel images={categoria.images} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
