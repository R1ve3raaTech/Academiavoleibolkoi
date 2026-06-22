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
        <p className="mx-auto max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-6xl dark:text-zinc-50">
          Momentos de la Academia
        </p>
      </Reveal>

      <Reveal
        as="section"
        y={24}
        batch
        className="grid gap-6 px-8 pb-20 md:grid-cols-2 lg:grid-cols-3"
      >
        {CATEGORIAS_GALERIA.map((categoria) => (
          <div key={categoria.title}>
            <Carousel
              images={categoria.images}
              fit="contain"
              className="aspect-[4/3] rounded-2xl shadow-sm transition-transform duration-500 ease-out hover:-translate-y-1"
              overlay={
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-8">
                  <h2 className="text-base font-bold text-white drop-shadow">
                    {categoria.title}
                  </h2>
                </div>
              }
            />
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {categoria.description}
            </p>
          </div>
        ))}
      </Reveal>
    </div>
  )
}
