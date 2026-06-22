import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/useTheme'

const ICONS = { light: Sun, dark: Moon, system: Monitor }
const LABELS = { light: 'Modo claro', dark: 'Modo oscuro', system: 'Modo del sistema' }

export default function ThemeToggle({ className = '' }) {
  const { theme, cycleTheme } = useTheme()
  const Icon = ICONS[theme]

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`${LABELS[theme]}. Click para cambiar.`}
      title={LABELS[theme]}
      className={`rounded-md p-2 text-zinc-700 transition-colors hover:bg-orange-100 dark:text-zinc-200 dark:hover:bg-zinc-800 ${className}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}
