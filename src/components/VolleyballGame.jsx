import { useEffect, useRef, useState } from 'react'

const WIDTH = 720
const HEIGHT = 480
const GRAVITY = 0.32
const BOUNCE_SPEED = -8.5
const PADDLE_WIDTH = 110
const PADDLE_HEIGHT = 16
const BALL_RADIUS = 18

export default function VolleyballGame() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [status, setStatus] = useState('idle') // idle | playing | over

  const resetBall = () => ({
    x: WIDTH / 2,
    y: HEIGHT * 0.3,
    vx: (Math.random() - 0.5) * 4,
    vy: 2,
  })

  const start = () => {
    stateRef.current = {
      ball: resetBall(),
      paddleX: WIDTH / 2,
      score: 0,
    }
    setScore(0)
    setStatus('playing')
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const onPointerMove = (clientX) => {
      if (!stateRef.current) return
      const rect = canvas.getBoundingClientRect()
      const x = ((clientX - rect.left) / rect.width) * WIDTH
      stateRef.current.paddleX = Math.min(
        WIDTH - PADDLE_WIDTH / 2,
        Math.max(PADDLE_WIDTH / 2, x),
      )
    }

    const onMouseMove = (e) => onPointerMove(e.clientX)
    const onTouchMove = (e) => {
      if (e.touches[0]) onPointerMove(e.touches[0].clientX)
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('touchmove', onTouchMove, { passive: true })

    const draw = () => {
      ctx.fillStyle = '#0b0d12'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, HEIGHT - 40)
      ctx.lineTo(WIDTH, HEIGHT - 40)
      ctx.stroke()

      const s = stateRef.current
      if (!s) return

      // paddle
      ctx.fillStyle = '#ea580c'
      ctx.beginPath()
      ctx.roundRect(
        s.paddleX - PADDLE_WIDTH / 2,
        HEIGHT - 40,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        8,
      )
      ctx.fill()

      // ball
      ctx.fillStyle = '#f5f5f0'
      ctx.beginPath()
      ctx.arc(s.ball.x, s.ball.y, BALL_RADIUS, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#1d4ed8'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.arc(s.ball.x, s.ball.y, BALL_RADIUS, 0.3, 2.2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(s.ball.x, s.ball.y, BALL_RADIUS, 3.4, 5.3)
      ctx.stroke()
    }

    const tick = () => {
      const s = stateRef.current
      if (s && status === 'playing') {
        s.ball.vy += GRAVITY
        s.ball.x += s.ball.vx
        s.ball.y += s.ball.vy

        if (s.ball.x < BALL_RADIUS || s.ball.x > WIDTH - BALL_RADIUS) {
          s.ball.vx *= -1
          s.ball.x = Math.min(
            WIDTH - BALL_RADIUS,
            Math.max(BALL_RADIUS, s.ball.x),
          )
        }
        if (s.ball.y < BALL_RADIUS) {
          s.ball.vy *= -1
          s.ball.y = BALL_RADIUS
        }

        const paddleTop = HEIGHT - 40
        const hitPaddle =
          s.ball.y + BALL_RADIUS >= paddleTop &&
          s.ball.y + BALL_RADIUS <= paddleTop + PADDLE_HEIGHT + 10 &&
          s.ball.vy > 0 &&
          Math.abs(s.ball.x - s.paddleX) <= PADDLE_WIDTH / 2 + BALL_RADIUS

        if (hitPaddle) {
          s.ball.vy = BOUNCE_SPEED
          s.ball.vx += (s.ball.x - s.paddleX) * 0.05
          s.score += 1
          setScore(s.score)
        } else if (s.ball.y - BALL_RADIUS > HEIGHT) {
          setStatus('over')
          setBest((b) => Math.max(b, s.score))
        }
      }

      draw()
      if (import.meta.env.DEV) window.__voleibolGame = stateRef.current
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('touchmove', onTouchMove)
    }
  }, [status])

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-zinc-800 shadow-lg">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="w-full"
        />

        {status !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 text-white">
            {status === 'over' && (
              <p className="text-2xl font-bold">
                ¡Se cayó! Puntos: {score}
              </p>
            )}
            <button
              type="button"
              onClick={start}
              className="rounded-md bg-orange-600 px-6 py-3 text-sm font-semibold hover:bg-orange-700"
            >
              {status === 'over' ? 'Jugar de nuevo' : 'Jugar'}
            </button>
            <p className="max-w-xs text-xs text-zinc-300">
              Mueve el mouse (o el dedo) para mantener el balón en el aire.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center gap-8 text-sm text-zinc-600 dark:text-zinc-400">
        <span>
          Puntos: <strong className="text-orange-600 dark:text-orange-500">{score}</strong>
        </span>
        <span>
          Mejor marca: <strong className="text-blue-700 dark:text-blue-400">{best}</strong>
        </span>
      </div>
    </div>
  )
}
