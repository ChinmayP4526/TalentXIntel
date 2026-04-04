import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import target     from "../assets/Cards-images/target.png"
import road       from "../assets/Cards-images/road.png"
import brainstorm from "../assets/Cards-images/brainstorm.png"
import bar_graph  from "../assets/Cards-images/bar-graph.png"

// ─── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  { title: 'Skill Match Analysis',  desc: 'Understand how closely your skills match real job roles.', image: target },
  { title: 'Learning Roadmap',       desc: 'Focus on what truly matters — no guesswork.',              image: road },
  { title: 'Career Readiness Score', desc: 'Track your progress with a clear, measurable score.',      image: bar_graph },
  { title: 'Talent Intelligence',    desc: 'Access structured insights, not just resumes.',            image: brainstorm },
]

const NUM    = CARDS.length
const RADIUS = 3.2
const CARD_W = 2.0
const CARD_H = 2.6
const CORNER = 0.14

// frame / back colours
const FRAME_LIGHT = 0xffffff
const FRAME_DARK  = 0x2a2a3c
const BACK_LIGHT  = 0xe4e4ec
const BACK_DARK   = 0x18182a

// ─── Helpers ──────────────────────────────────────────────────────────────────
function roundedRect(w, h, r) {
  const s = new THREE.Shape()
  s.moveTo(-w / 2 + r, -h / 2)
  s.lineTo( w / 2 - r, -h / 2)
  s.quadraticCurveTo( w / 2, -h / 2,  w / 2, -h / 2 + r)
  s.lineTo( w / 2,  h / 2 - r)
  s.quadraticCurveTo( w / 2,  h / 2,  w / 2 - r,  h / 2)
  s.lineTo(-w / 2 + r,  h / 2)
  s.quadraticCurveTo(-w / 2,  h / 2, -w / 2,  h / 2 - r)
  s.lineTo(-w / 2, -h / 2 + r)
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
  return s
}

function buildStarField(scene) {
  const count = 200
  const pos   = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 40
  const geo   = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const mat   = new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.7 })
  const stars = new THREE.Points(geo, mat)
  scene.add(stars)
  return stars
}

function buildClouds(scene) {
  const out = []
  for (let i = 0; i < 10; i++) {
    const geo  = new THREE.PlaneGeometry(4 + Math.random() * 5, 1 + Math.random() * 1.2)
    const mat  = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true,
      opacity: 0.06 + Math.random() * 0.08, side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 4, -7 - Math.random() * 3)
    scene.add(mesh)
    out.push({ mesh, speed: 0.004 + Math.random() * 0.005 })
  }
  return out
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Cards3DCarousel() {

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('selected-theme') === 'dark'
  )
  const [currentIndex, setCurrentIndex] = useState(0)

  const starDots = useRef(
    Array.from({ length: 30 }, () => ({
      top:   Math.random() * 60,
      left:  Math.random() * 100,
      size:  1.5 + Math.random() * 2,
      dur:   1.6 + Math.random() * 2,
      delay: Math.random() * 3,
    }))
  )

  const mountRef = useRef(null)
  const stateRef = useRef({
    renderer: null, scene: null, camera: null,
    cardPivots: [], clouds: [], stars: null,
    currentAngle: 0, targetAngle: 0,
    animFrameId: null, t: 0, startX: null,
    isDark: localStorage.getItem('selected-theme') === 'dark',
  })

  const goTo = useCallback((idx) => {
    const next = ((idx % NUM) + NUM) % NUM
    setCurrentIndex(next)
    stateRef.current.targetAngle = -(next / NUM) * Math.PI * 2
  }, [])

  // Watch data-theme attribute changes
  useEffect(() => {
    const obs = new MutationObserver(() => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark'
      setIsDark(dark)
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  // Sync Three.js materials when theme flips
  useEffect(() => {
    const s = stateRef.current
    s.isDark = isDark
    if (!s.cardPivots.length) return

    s.cardPivots.forEach(({ frame, back }) => {
      frame.material.color.setHex(isDark ? FRAME_DARK : FRAME_LIGHT)
      back.material.color.setHex(isDark ? BACK_DARK  : BACK_LIGHT)
    })
    if (s.stars) s.stars.visible = isDark
    s.clouds.forEach(({ mesh }) => { mesh.visible = !isDark })
  }, [isDark])

  // Build scene once on mount
  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    const s = stateRef.current
    const W = container.clientWidth
    const H = container.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    s.renderer = renderer

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100)
    camera.position.set(0, 0, 7)
    s.scene  = scene
    s.camera = camera

    scene.add(new THREE.AmbientLight(0xffffff, 0.75))
    const key = new THREE.PointLight(0xffffff, 1.1, 22)
    key.position.set(3, 5, 5)
    scene.add(key)
    const rim = new THREE.PointLight(0xaaaaff, 0.3, 18)
    rim.position.set(-4, -2, 2)
    scene.add(rim)

    s.stars  = buildStarField(scene)
    s.stars.visible = s.isDark
    s.clouds = buildClouds(scene)
    s.clouds.forEach(({ mesh }) => { mesh.visible = !s.isDark })

    // Shared geometries
    const frameGeo = new THREE.ShapeGeometry(roundedRect(CARD_W + 0.10, CARD_H + 0.10, CORNER + 0.02))
    const faceGeo  = new THREE.ShapeGeometry(roundedRect(CARD_W,        CARD_H,        CORNER))
    const backGeo  = new THREE.ShapeGeometry(roundedRect(CARD_W,        CARD_H,        CORNER))

    const loader = new THREE.TextureLoader()

    s.cardPivots = []
    CARDS.forEach((card, i) => {
      const angle = (i / NUM) * Math.PI * 2

      // outer frame — colour swaps with theme
      const frameMat  = new THREE.MeshStandardMaterial({
        color: s.isDark ? FRAME_DARK : FRAME_LIGHT, roughness: 0.45, metalness: 0.08,
      })
      const frameMesh = new THREE.Mesh(frameGeo, frameMat)
      frameMesh.position.z = -0.015

      // image face
      const tex = loader.load(card.image)
      tex.colorSpace = THREE.SRGBColorSpace
      const faceMesh = new THREE.Mesh(
        faceGeo,
        new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.04 })
      )

      // back face
      const backMat  = new THREE.MeshStandardMaterial({
        color: s.isDark ? BACK_DARK : BACK_LIGHT, roughness: 0.65, side: THREE.BackSide,
      })
      const backMesh = new THREE.Mesh(backGeo, backMat)

      const group = new THREE.Group()
      group.add(frameMesh, faceMesh, backMesh)
      group.position.x = Math.sin(angle) * RADIUS
      group.position.z = Math.cos(angle) * RADIUS
      group.rotation.y = -angle
      scene.add(group)

      s.cardPivots.push({ group, baseAngle: angle, frame: frameMesh, back: backMesh })
    })

    const animate = () => {
      s.animFrameId = requestAnimationFrame(animate)
      s.t += 0.01

      let diff = s.targetAngle - s.currentAngle
      while (diff >  Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      s.currentAngle += diff * 0.072

      s.cardPivots.forEach(({ group, baseAngle }) => {
        const angle = baseAngle + s.currentAngle
        group.position.x = Math.sin(angle) * RADIUS
        group.position.z = Math.cos(angle) * RADIUS
        group.rotation.y = -angle

        let norm = angle % (Math.PI * 2)
        if (norm < 0) norm += Math.PI * 2
        const dist = Math.min(norm, Math.PI * 2 - norm)
        // front card slightly larger, no bobbing
        group.scale.setScalar(dist < 0.45 ? 1.06 : 0.88 + 0.08 * Math.cos(dist))
      })

      s.clouds.forEach(({ mesh, speed }) => {
        if (!s.isDark) {
          mesh.position.x += speed
          if (mesh.position.x > 14) mesh.position.x = -14
        }
      })

      if (s.isDark && s.stars) {
        s.stars.material.opacity = 0.45 + Math.sin(s.t * 0.9) * 0.25
      }

      // very gentle camera breathe — no vertical drift
      camera.position.y = Math.sin(s.t * 0.22) * 0.05
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const W = container.clientWidth
      const H = container.clientHeight
      renderer.setSize(W, H)
      camera.aspect = W / H
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const onDown = (e) => { s.startX = e.clientX }
    const onUp   = (e) => {
      if (s.startX === null) return
      const dx = e.clientX - s.startX
      if (Math.abs(dx) > 40) {
        setCurrentIndex((prev) => {
          const next = ((prev + (dx < 0 ? 1 : -1)) % NUM + NUM) % NUM
          stateRef.current.targetAngle = -(next / NUM) * Math.PI * 2
          return next
        })
      }
      s.startX = null
    }
    renderer.domElement.addEventListener('pointerdown', onDown)
    renderer.domElement.addEventListener('pointerup',   onUp)

    return () => {
      cancelAnimationFrame(s.animFrameId)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('pointerdown', onDown)
      renderer.domElement.removeEventListener('pointerup',   onUp)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dayBg   = 'linear-gradient(180deg,#4fc3f7 0%,#81d4fa 30%,#b3e5fc 65%,#e1f5fe 100%)'
  const nightBg = 'linear-gradient(160deg,#0f0c29 0%,#302b63 50%,#24243e 100%)'

  return (
    <div style={{
      width: '100%', height: '460px', position: 'relative',
      overflow: 'hidden', borderRadius: '20px',
      background: isDark ? nightBg : dayBg,
      transition: 'background 0.9s ease',
    }}>

      {/* Sun */}
      {!isDark && (
        <div style={{
          position:'absolute', top:'18px', right:'86px',
          width:'62px', height:'62px', borderRadius:'50%',
          background:'radial-gradient(circle at 38% 38%,#fffde7,#FDD835)',
          boxShadow:'0 0 44px 18px rgba(253,216,53,0.36)',
          zIndex:1, pointerEvents:'none',
        }} />
      )}

      {/* Moon */}
      {isDark && (
        <div style={{
          position:'absolute', top:'20px', right:'86px',
          width:'50px', height:'50px', borderRadius:'50%',
          background:'#f5e97a',
          boxShadow:'0 0 28px 8px rgba(245,233,122,0.2)',
          zIndex:1, pointerEvents:'none', overflow:'hidden',
        }}>
          <div style={{
            position:'absolute', top:'-3px', right:'-8px',
            width:'42px', height:'42px', borderRadius:'50%',
            background:'#18143a',
          }} />
        </div>
      )}

      {/* CSS clouds (day) */}
      {!isDark && (
        <>
          <style>{`
            @keyframes cldA{from{transform:translateX(-240px)}to{transform:translateX(110vw)}}
            @keyframes cldB{from{transform:translateX(-320px)}to{transform:translateX(108vw)}}
            @keyframes cldC{from{transform:translateX(-200px)}to{transform:translateX(112vw)}}
          `}</style>
          {[
            {top:'5%', w:200,h:58, op:.56, dur:26, delay:0,   anim:'cldA'},
            {top:'13%',w:270,h:72, op:.44, dur:38, delay:-14, anim:'cldB'},
            {top:'20%',w:155,h:48, op:.34, dur:21, delay:-5,  anim:'cldC'},
            {top:'30%',w:225,h:64, op:.25, dur:44, delay:-22, anim:'cldA'},
            {top:'3%', w:145,h:42, op:.38, dur:31, delay:-9,  anim:'cldB'},
            {top:'25%',w:185,h:54, op:.28, dur:35, delay:-18, anim:'cldC'},
          ].map((c, i) => (
            <div key={i} style={{
              position:'absolute', top:c.top, left:0,
              width:`${c.w}px`, height:`${c.h}px`,
              background:'white', borderRadius:'999px', opacity:c.op,
              animation:`${c.anim} ${c.dur}s linear ${c.delay}s infinite`,
              pointerEvents:'none', zIndex:1,
            }} />
          ))}
        </>
      )}

      {/* CSS stars (night) */}
      {isDark && (
        <>
          <style>{`@keyframes twk{0%,100%{opacity:.10}50%{opacity:.88}}`}</style>
          {starDots.current.map((st, i) => (
            <div key={i} style={{
              position:'absolute', top:`${st.top}%`, left:`${st.left}%`,
              width:`${st.size}px`, height:`${st.size}px`,
              borderRadius:'50%', background:'#fff',
              animation:`twk ${st.dur}s ease-in-out ${st.delay}s infinite`,
              pointerEvents:'none', zIndex:1,
            }} />
          ))}
        </>
      )}

      {/* Three.js mount point */}
      <div ref={mountRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:2 }} />

      {/* Dot indicators */}
      <div style={{
        position:'absolute', top:'16px', left:'50%', transform:'translateX(-50%)',
        display:'flex', gap:'8px', zIndex:10,
      }}>
        {CARDS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{
            width: i === currentIndex ? '22px' : '8px',
            height:'8px', borderRadius:'999px',
            background: i === currentIndex ? '#fff' : 'rgba(255,255,255,0.35)',
            border:'none', padding:0, cursor:'pointer', transition:'all 0.32s ease',
          }} />
        ))}
      </div>

      {/* Title + description (below cards, inside container) */}
      <div style={{
        position:'absolute', bottom:'26px', left:'50%',
        transform:'translateX(-50%)', textAlign:'center',
        pointerEvents:'none', minWidth:'300px', zIndex:10,
      }}>
        <div style={{
          fontSize:'17px', fontWeight:700, color:'#fff', marginBottom:'5px',
          textShadow:'0 2px 14px rgba(0,0,0,0.5)', letterSpacing:'0.01em',
          transition:'opacity 0.25s',
        }}>
          {CARDS[currentIndex].title}
        </div>
        <div style={{
          fontSize:'12.5px', lineHeight:1.55, maxWidth:'255px',
          margin:'0 auto', textShadow:'0 1px 8px rgba(0,0,0,0.35)',
          color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.86)',
        }}>
          {CARDS[currentIndex].desc}
        </div>
      </div>

      {/* Prev / Next arrows */}
      {[['prev','‹',-1,{left:'14px'}],['next','›',1,{right:'14px'}]].map(([id,lbl,dir,pos]) => (
        <button key={id} onClick={() => goTo(currentIndex + dir)} aria-label={id} style={{
          position:'absolute', ...pos, top:'50%', transform:'translateY(-50%)',
          background: isDark ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.30)',
          backdropFilter:'blur(6px)',
          border:'1px solid rgba(255,255,255,0.25)',
          color:'#fff', width:'42px', height:'42px', borderRadius:'50%',
          fontSize:'22px', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'background 0.2s', zIndex:10,
        }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.24)'}
          onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.30)'}
        >
          {lbl}
        </button>
      ))}
    </div>
  )
}
