import * as THREE from 'three'

// Sphere UVs are equirectangular (u = longitude 0-1, v = latitude 0-1),
// so panels are drawn as wavy vertical bands rather than a flat
// pinwheel, which is what actually wraps into curved seams on the ball.
export function createVolleyballTexture() {
  const width = 1024
  const height = 512
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f5f5f0'
  ctx.fillRect(0, 0, width, height)

  const colors = ['#ea580c', '#1d4ed8', '#f5f5f0']
  const panels = 6
  const panelWidth = width / panels
  const waveAmplitude = panelWidth * 0.35
  const waveCount = 1.5

  const wavyPanelPath = (xStart) => {
    ctx.beginPath()
    ctx.moveTo(xStart, 0)
    for (let y = 0; y <= height; y += 8) {
      const offset = Math.sin((y / height) * Math.PI * waveCount) * waveAmplitude
      ctx.lineTo(xStart + offset, y)
    }
    for (let y = height; y >= 0; y -= 8) {
      const offset = Math.sin((y / height) * Math.PI * waveCount) * waveAmplitude
      ctx.lineTo(xStart + panelWidth + offset, y)
    }
    ctx.closePath()
  }

  for (let i = 0; i < panels; i++) {
    ctx.fillStyle = colors[i % colors.length]
    wavyPanelPath(i * panelWidth)
    ctx.fill()
  }
  // wrap-around seam piece for continuity at the edge
  ctx.fillStyle = colors[panels % colors.length]
  wavyPanelPath(-panelWidth + width)
  ctx.fill()

  ctx.strokeStyle = '#16110a'
  ctx.lineWidth = 7
  ctx.lineCap = 'round'
  for (let i = 0; i <= panels; i++) {
    const x = i * panelWidth
    ctx.beginPath()
    for (let y = 0; y <= height; y += 8) {
      const offset = Math.sin((y / height) * Math.PI * waveCount) * waveAmplitude
      if (y === 0) ctx.moveTo(x + offset, y)
      else ctx.lineTo(x + offset, y)
    }
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}
