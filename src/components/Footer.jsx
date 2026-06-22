import { Mail, MapPin } from 'lucide-react'
import logo from '@/assets/Photos/logo.png'
import { CONTACT } from '@/lib/contact'
import Reveal from './Reveal'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './BrandIcons'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 px-8 py-8 dark:border-zinc-800">
      <Reveal as="div" y={16} className="flex flex-wrap justify-between gap-8">
        <div className="max-w-xs">
          <img src={logo} alt="Academia Voleibol Koi" className="h-10 w-10" />
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Formando los líderes y atletas del mañana a través de la pasión
            por el voleibol en Costa Rica.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-orange-600 dark:text-orange-500">Contacto</h3>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-2 flex items-center gap-1.5 text-sm text-zinc-600 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-500"
          >
            <Mail className="h-4 w-4" />
            {CONTACT.email}
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-orange-600 dark:text-orange-500">Redes</h3>
          <div className="mt-2 flex gap-3 text-zinc-600 dark:text-zinc-400">
            <a
              href={CONTACT.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="hover:text-orange-600 dark:hover:text-orange-500"
            >
              <YoutubeIcon className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-orange-600 dark:hover:text-orange-500"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-orange-600 dark:hover:text-orange-500"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        <span>
          © {new Date().getFullYear()} Academia Voleibol Koi. Todos los
          derechos reservados.
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          San José, Costa Rica
        </span>
      </div>
    </footer>
  )
}
