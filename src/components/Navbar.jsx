import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '@/assets/Photos/logo.png'
import { CONTACT } from '@/lib/contact'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/alianzas', label: 'Alianzas' },
  { to: '/galeria', label: 'Galería' },
  { to: '/campamentos', label: 'Campamentos' },
]

export default function Navbar() {
  const logoRef = useRef(null)
  const menuRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let velocity = 0
    let rotation = 0

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        velocity += self.getVelocity() / 250
      },
    })

    const tick = () => {
      rotation += velocity * gsap.ticker.deltaRatio()
      velocity *= 0.9 // decays to a stop shortly after scrolling stops
      gsap.set(logoRef.current, { rotation })
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      trigger.kill()
    }
  }, [])

  useEffect(() => {
    const el = menuRef.current
    if (!el) return

    if (open) {
      gsap.set(el, { display: 'flex', height: 'auto' })
      const height = el.offsetHeight
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.4, ease: 'fluid' },
      )
      gsap.from(el.children, {
        opacity: 0,
        y: 12,
        duration: 0.4,
        delay: 0.1,
        stagger: 0.05,
        ease: 'fluid',
      })
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'fluid',
        onComplete: () => gsap.set(el, { display: 'none' }),
      })
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-orange-50/90 backdrop-blur-sm dark:bg-zinc-950/90">
      <div className="flex items-center justify-between gap-4 px-8 py-4">
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >
          <img
            ref={logoRef}
            src={logo}
            alt="Academia Voleibol Koi"
            className="h-10 w-10"
          />
          <span className="text-lg font-bold text-orange-600 dark:text-orange-500">
            Academia Voleibol Koi
          </span>
        </NavLink>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex dark:text-zinc-300">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'border-b-2 border-orange-600 pb-1 text-orange-600 dark:border-orange-500 dark:text-orange-500'
                  : 'pb-1 hover:text-orange-600 dark:hover:text-orange-500'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />

          <a
            href={CONTACT.signupForm}
            target="_blank"
            rel="noreferrer"
            className="hidden shrink-0 rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 sm:block"
          >
            INSCRIBIRSE
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="rounded-md p-2 text-zinc-700 hover:bg-orange-100 md:hidden dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <nav
        ref={menuRef}
        style={{ display: 'none', height: 0 }}
        className="flex flex-col gap-1 overflow-hidden px-8 pb-4 text-sm font-medium text-zinc-700 md:hidden dark:text-zinc-300"
      >
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 ${
                isActive
                  ? 'bg-orange-100 text-orange-600 dark:bg-zinc-800 dark:text-orange-500'
                  : 'hover:bg-orange-100 dark:hover:bg-zinc-800'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
        <div className="mt-1 flex items-center justify-between px-3 py-2">
          <span>Apariencia</span>
          <ThemeToggle />
        </div>
        <a
          href={CONTACT.signupForm}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
          className="mt-2 rounded-md bg-orange-600 px-3 py-2 text-center font-semibold text-white sm:hidden"
        >
          INSCRIBIRSE
        </a>
      </nav>
    </header>
  )
}
