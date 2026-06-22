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
          <Carousel
            key={categoria.title}
            images={categoria.images}
            fit="contain"
            className="aspect-[4/3] rounded-2xl shadow-sm transition-transform duration-500 ease-out hover:-translate-y-1"
            overlay={
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/15 to-transparent p-5">
                <h2 className="text-xl font-bold text-white">
                  {categoria.title}
                </h2>
                <p className="mt-1 text-sm text-white/80">
                  {categoria.description}
                </p>
              </div>
            }
          />
        ))}
      </Reveal>
    </div>
  )
}
