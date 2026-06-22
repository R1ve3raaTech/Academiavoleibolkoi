import confetti from 'canvas-confetti'

export function celebrate() {
  const colors = ['#ea580c', '#1d4ed8', '#ffffff']

  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 45,
    origin: { y: 0.7 },
    colors,
  })
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 60,
    startVelocity: 55,
    origin: { x: 0, y: 0.8 },
    colors,
  })
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 60,
    startVelocity: 55,
    origin: { x: 1, y: 0.8 },
    colors,
  })
}
