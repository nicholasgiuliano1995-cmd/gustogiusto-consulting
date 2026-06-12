import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Without JS — or with reduced motion — the page is fully laid out and
// visible: every hidden/offset state below is applied by GSAP only.
if (!reducedMotion) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  initHeroIntro();
  initHeroCanvas();
  initReveals();
  initRoute();

  // Pin/scrub positions depend on final layout: re-measure once the
  // self-hosted fonts and all assets have loaded, or the route section
  // can stall mid-journey on slower connections.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

function initHeroIntro() {
  const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
  if (!lines.length) return;
  gsap.from(lines, {
    autoAlpha: 0,
    y: 28,
    duration: 1.1,
    ease: 'power3.out',
    stagger: 0.12,
    delay: 0.15,
  });
}

function initReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 36,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 82%' },
    });
  });
}

// One implementation for every screen size — no pinning, no scroll hijacking:
// the vertical gold line draws itself in step with the scroll and each
// station fades in as it enters the viewport. Deliberately boring tech so it
// works on every browser, trackpad and zoom level.
function initRoute() {
  const stage = document.querySelector<HTMLElement>('[data-route-stage]');
  if (!stage) return;

  const vline = stage.querySelector<HTMLElement>('[data-route-vline]');
  if (vline) {
    gsap.fromTo(
      vline,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: stage,
          start: 'top 70%',
          end: 'bottom 78%',
          scrub: true,
        },
      }
    );
  }

  gsap.utils.toArray<HTMLElement>('[data-route-station]').forEach((station) => {
    const content = station.querySelector<HTMLElement>('[data-route-content]');
    const dot = station.querySelector<HTMLElement>('[data-route-dot]');
    if (content) {
      gsap.from(content, {
        autoAlpha: 0,
        y: 36,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: station, start: 'top 80%' },
      });
    }
    if (dot) {
      gsap.to(dot, {
        backgroundColor: '#C9A84C',
        scale: 1.4,
        duration: 0.4,
        scrollTrigger: { trigger: station, start: 'top 75%' },
      });
    }
  });

  const dest = document.querySelector<HTMLElement>('[data-route-dest]');
  if (dest) {
    gsap.from(dest, {
      autoAlpha: 0,
      y: 16,
      duration: 0.6,
      scrollTrigger: { trigger: dest, start: 'top 88%' },
    });
  }
}

/** Slow drift of faint gold particles behind the hero. Deliberately quiet. */
function initHeroCanvas() {
  const canvas = document.querySelector<HTMLCanvasElement>('#hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  interface P {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    a: number;
    tw: number;
  }

  let particles: P[] = [];
  let width = 0;
  let height = 0;
  let raf = 0;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    if (!canvas || !ctx) return;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(70, Math.round((width * height) / 26000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.4,
      vx: 0.04 + Math.random() * 0.1,
      vy: -(0.02 + Math.random() * 0.06),
      a: 0.08 + Math.random() * 0.3,
      tw: Math.random() * Math.PI * 2,
    }));
  }

  function frame(time: number) {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x > width + 4) p.x = -4;
      if (p.y < -4) p.y = height + 4;
      const twinkle = 0.65 + 0.35 * Math.sin(time / 1800 + p.tw);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 76, ${(p.a * twinkle).toFixed(3)})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize);
  raf = requestAnimationFrame(frame);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }
  });
}
