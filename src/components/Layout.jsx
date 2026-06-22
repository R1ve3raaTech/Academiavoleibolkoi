import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollSmoother, ScrollTrigger } from '@/lib/gsap'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const location = useLocation()

  // useLayoutEffect so the smoother exists before any descendant's
  // useEffect creates a ScrollTrigger (passive effects run after all
  // layout effects, regardless of component nesting order).
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      effects: true,
    })

    return () => smoother.kill()
  }, [])

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    ScrollSmoother.get()?.scrollTo(0, false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div ref={wrapperRef} id="smooth-wrapper">
        <div ref={contentRef} id="smooth-content">
          <div className="h-[76px]" aria-hidden="true" />
          <main className="overflow-x-hidden">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
