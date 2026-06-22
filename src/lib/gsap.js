import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { CustomEase } from 'gsap/CustomEase'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  Flip,
  CustomEase,
  Observer,
)

CustomEase.create('fluid', '0.16, 1, 0.3, 1')

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip, Observer }
