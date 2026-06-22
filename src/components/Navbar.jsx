import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '@/assets/Photos/logo.png'
import { CONTACT } from '@/lib/contact'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/alianzas', label: 'Alianzas' },
  { to: '/galeria', label: 'Galería' },
  { to: '/campamentos', label: 'Campamentos' },
]

export default function Navbar() {
  const logoRef = useRef(null)

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

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 bg-orange-50/90 px-8 py-4 backdrop-blur-sm">
      <NavLink to="/" className="flex items-center gap-3">
        <img
          ref={logoRef}
          src={logo}
          alt="Academia Voleibol Koi"
          className="h-10 w-10"
        />
        <span className="text-lg font-bold text-orange-600">
          Academia Voleibol Koi
        </span>
      </NavLink>

      <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? 'border-b-2 border-orange-600 pb-1 text-orange-600'
                : 'pb-1 hover:text-orange-600'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <a
        href={CONTACT.signupForm}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
      >
        INSCRIBIRSE
      </a>
    </header>
  )
}
