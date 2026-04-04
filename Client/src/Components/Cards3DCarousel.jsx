import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import target from "../assets/Cards-images/target.png"
import road from "../assets/Cards-images/road.png"
import brainstorm from "../assets/Cards-images/brainstorm.png"
import bar_graph from "../assets/Cards-images/bar-graph.png"

const CARDS = [
    {
        title: 'Skill Match Analysis',
        desc: 'Understand how closely your skills match real job roles.',
        color: 0x7F77DD,
        accent: 0x534AB7,
        hexColor: '#7F77DD',
        image: target,
    },
    {
        title: 'Learning Roadmap',
        desc: 'Focus on what truly matters — no guesswork.',
        color: 0x1D9E75,
        accent: 0x0F6E56,
        hexColor: '#1D9E75',
        image: road,
    },
    {
        title: 'Career Readiness Score',
        desc: 'Track your progress with a clear, measurable score.',
        color: 0xBA7517,
        accent: 0x854F0B,
        hexColor: '#BA7517',
        image: bar_graph,
    },
    {
        title: 'Talent Intelligence',
        desc: 'Access structured insights, not just resumes.',
        color: 0xD4537E,
        accent: 0x993556,
        hexColor: '#D4537E',
        image: brainstorm,
    },
]
const loadedImages = {};
const RADIUS = 3.2
const NUM = CARDS.length

function makeRoundedRectShape(w, h, r) {
    const shape = new THREE.Shape()
    shape.moveTo(-w / 2 + r, -h / 2)
    shape.lineTo(w / 2 - r, -h / 2)
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
    shape.lineTo(w / 2, h / 2 - r)
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
    shape.lineTo(-w / 2 + r, h / 2)
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
    shape.lineTo(-w / 2, -h / 2 + r)
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
    return shape
}

function shadeHex(hex, amt) {
    const num = parseInt(hex.replace('#', ''), 16)
    const r = Math.min(255, Math.max(0, (num >> 16) + amt))
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt))
    const b = Math.min(255, Math.max(0, (num & 0xff) + amt))
    return `rgb(${r},${g},${b})`
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''
    let curY = y
    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' '
        if (ctx.measureText(testLine).width > maxWidth && i > 0) {
            ctx.fillText(line.trim(), x, curY)
            line = words[i] + ' '
            curY += lineHeight
        } else {
            line = testLine
        }
    }
    ctx.fillText(line.trim(), x, curY)
}

function makeCardTexture(card, isDark) {
    const W = 340
    const H = 430
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')

    // BG gradient
    const bg = ctx.createLinearGradient(0, 0, 0, H)
    bg.addColorStop(0, shadeHex(card.hexColor, isDark ? 30 : 100))
    bg.addColorStop(1, shadeHex(card.hexColor, isDark ? -10 : 40))
    ctx.fillStyle = bg
    ctx.roundRect(0, 0, W, H, 32)
    ctx.fill()

    const img = loadedImages[card.title];

    if (img && img.complete) {
        ctx.drawImage(img, 20, 20, W - 40, 120);
    }

    // Subtle dot grid
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)'
    for (let x = 24; x < W; x += 36) {
        for (let y = 24; y < H; y += 36) {
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fill()
        }
    }



    // // Frosted bottom panel
    // ctx.fillStyle = isDark ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.18)'
    // ctx.roundRect(20, H * 0.64, W - 40, H * 0.33, 18)
    // ctx.fill()
    ctx.fillStyle = isDark ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.22)';
    ctx.roundRect(20, 190, W - 40, 210, 22);
    ctx.fill();

    // // Divider line
    // ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)'
    // ctx.lineWidth = 1.5
    // ctx.beginPath()
    // ctx.moveTo(W * 0.12, H * 0.64)
    // ctx.lineTo(W * 0.88, H * 0.64)
    // ctx.stroke()
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(40, 180);
    ctx.lineTo(W - 40, 180);
    ctx.stroke();

    // // Title
    // ctx.font = `bold ${Math.round(W * 0.083)}px sans-serif`
    // ctx.fillStyle = '#ffffff'
    // ctx.textAlign = 'center'
    // ctx.textBaseline = 'top'
    // ctx.shadowColor = 'rgba(0,0,0,0.4)'
    // ctx.shadowBlur = 8
    // wrapText(ctx, card.title, W / 2, H * 0.675, W * 0.8, Math.round(W * 0.092))
    // ctx.shadowBlur = 0
    ctx.font = `bold ${Math.round(W * 0.075)}px sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 6;
    wrapText(ctx, card.title, W / 2, 170, W * 0.8, 28);
    ctx.shadowBlur = 0;

    // // Description
    // ctx.font = `${Math.round(W * 0.059)}px sans-serif`
    // ctx.fillStyle = isDark ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.92)'
    // ctx.textBaseline = 'top'
    // wrapText(ctx, card.desc, W / 2, H * 0.805, W * 0.78, Math.round(W * 0.068))
    ctx.font = `${Math.round(W * 0.05)}px sans-serif`;
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.96)';
    ctx.textBaseline = 'top';
    wrapText(ctx, card.desc, W / 2, 235, W * 0.75, 22);

    return new THREE.CanvasTexture(canvas)
}

function makeStarField(scene) {
    const geo = new THREE.BufferGeometry()
    const count = 220
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 42
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.065, transparent: true, opacity: 0.75 })
    const stars = new THREE.Points(geo, mat)
    scene.add(stars)
    return stars
}

function makeCloudMeshes(scene) {
    const clouds = []
    for (let i = 0; i < 10; i++) {
        const geo = new THREE.PlaneGeometry(4 + Math.random() * 5, 1 + Math.random() * 1.2)
        const mat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.08 + Math.random() * 0.09,
            side: THREE.DoubleSide,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 5 - 0.5, -7 - Math.random() * 3)
        scene.add(mesh)
        clouds.push({ mesh, speed: 0.004 + Math.random() * 0.006 })
    }
    return clouds
}


const preloadImages = (cards) => {
    cards.forEach(card => {
        const img = new Image();
        img.src = card.image;
        loadedImages[card.title] = img;
    });
};

preloadImages(CARDS);
/* ─────────────────────────────────────────────────── */

export default function Cards3DCarousel() {

    const getTheme = () => {
        return document.documentElement.getAttribute("data-theme") === "dark";
    };
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("selected-theme") === "dark";
    });
    const mountRef = useRef(null)
    const stateRef = useRef({
        renderer: null,
        scene: null,
        camera: null,
        cardPivots: [],
        particles: [],
        clouds: [],
        stars: null,
        currentAngle: 0,
        targetAngle: 0,
        animFrameId: null,
        t: 0,
        startX: null,
        isDark,
    })
    const [currentIndex, setCurrentIndex] = useState(0)
    // stable random values for CSS star dots
    const starDots = useRef(
        Array.from({ length: 32 }, () => ({
            top: Math.random() * 58,
            left: Math.random() * 100,
            size: 2 + Math.random() * 2,
            dur: 1.5 + Math.random() * 2,
            delay: Math.random() * 3,
        }))
    )

    const goTo = useCallback((idx) => {
        const next = ((idx % NUM) + NUM) % NUM
        setCurrentIndex(next)
        stateRef.current.targetAngle = -(next / NUM) * Math.PI * 2
    }, [])
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(getTheme());
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);
    // Update textures + scene when dark mode prop changes
    useEffect(() => {
        const s = stateRef.current
        s.isDark = isDark
        if (!s.cardPivots.length) return
        s.cardPivots.forEach(({ group }, i) => {
            const faceMesh = group.children[1]
            if (faceMesh?.material) {
                faceMesh.material.map?.dispose()
                faceMesh.material.map = makeCardTexture(CARDS[i], isDark)
                faceMesh.material.needsUpdate = true
            }
        })
        if (s.stars) s.stars.visible = isDark
        s.clouds.forEach(({ mesh }) => { mesh.visible = !isDark })
    }, [isDark])

    useEffect(() => {
        const container = mountRef.current
        if (!container) return
        const s = stateRef.current
        const w = container.clientWidth
        const h = container.clientHeight

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        container.appendChild(renderer.domElement)
        s.renderer = renderer

        const scene = new THREE.Scene()
        s.scene = scene
        const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
        camera.position.set(0, 0, 7)
        s.camera = camera

        scene.add(new THREE.AmbientLight(0xffffff, 0.55))
        const pLight = new THREE.PointLight(0xffffff, 1.3, 25)
        pLight.position.set(4, 6, 5)
        scene.add(pLight)
        const rim = new THREE.PointLight(0x8888ff, 0.5, 20)
        rim.position.set(-4, -2, 3)
        scene.add(rim)

        s.stars = makeStarField(scene)
        s.stars.visible = isDark

        s.clouds = makeCloudMeshes(scene)
        s.clouds.forEach(({ mesh }) => { mesh.visible = !isDark })

        s.cardPivots = []
        CARDS.forEach((card, i) => {
            const angle = (i / NUM) * Math.PI * 2
            const tex = makeCardTexture(card, isDark)
            const geo = new THREE.ShapeGeometry(makeRoundedRectShape(2.2, 2.9, 0.15))
            const mat = new THREE.MeshPhongMaterial({ map: tex, shininess: 55, specular: 0x333333 })
            const mesh = new THREE.Mesh(geo, mat)

            const edgeGeo = new THREE.ShapeGeometry(makeRoundedRectShape(2.24, 2.94, 0.16))
            const edgeMat = new THREE.MeshBasicMaterial({ color: card.accent })
            const edge = new THREE.Mesh(edgeGeo, edgeMat)
            edge.position.z = -0.02

            const back = new THREE.Mesh(
                new THREE.ShapeGeometry(makeRoundedRectShape(2.2, 2.9, 0.15)),
                new THREE.MeshPhongMaterial({ color: card.accent, side: THREE.BackSide, shininess: 20 })
            )

            const group = new THREE.Group()
            group.add(edge, mesh, back)
            group.position.x = Math.sin(angle) * RADIUS
            group.position.z = Math.cos(angle) * RADIUS
            group.rotation.y = -angle
            scene.add(group)
            s.cardPivots.push({ group, baseAngle: angle })
        })

        s.particles = []
        for (let i = 0; i < 25; i++) {
            const geo = new THREE.SphereGeometry(0.022, 4, 4)
            const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: Math.random() * 0.35 + 0.08 })
            const p = new THREE.Mesh(geo, mat)
            p.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 8 - 2)
            scene.add(p)
            s.particles.push({ mesh: p, offset: Math.random() * Math.PI * 2 })
        }

        const animate = () => {
            s.animFrameId = requestAnimationFrame(animate)
            s.t += 0.01

            let diff = s.targetAngle - s.currentAngle
            while (diff > Math.PI) diff -= Math.PI * 2
            while (diff < -Math.PI) diff += Math.PI * 2
            s.currentAngle += diff * 0.07

            s.cardPivots.forEach(({ group, baseAngle }, i) => {
                const angle = baseAngle + s.currentAngle
                group.position.x = Math.sin(angle) * RADIUS
                group.position.z = Math.cos(angle) * RADIUS
                group.rotation.y = -angle
                let norm = angle % (Math.PI * 2)
                if (norm < 0) norm += Math.PI * 2
                const dist = Math.min(norm, Math.PI * 2 - norm)
                const isFront = dist < 0.5
                group.scale.setScalar(isFront ? 1.02 : 0.9 + 0.04 * Math.cos(dist));
            })

            s.clouds.forEach(({ mesh, speed }) => {
                if (!s.isDark) {
                    mesh.position.x += speed
                    if (mesh.position.x > 14) mesh.position.x = -14
                }
            })

            if (s.isDark && s.stars) s.stars.material.opacity = 0.5 + Math.sin(s.t * 0.8) * 0.22

            s.particles.forEach((p) => {
                if (s.isDark) {
                    p.mesh.position.y += Math.sin(s.t + p.offset) * 0.003
                    p.mesh.position.x += Math.cos(s.t * 0.5 + p.offset) * 0.002
                }
            })

            camera.position.y = Math.sin(s.t * 0.2) * 0.04
            renderer.render(scene, camera)
        }
        animate()

        const handleResize = () => {
            const w = container.clientWidth
            const h = container.clientHeight
            renderer.setSize(w, h)
            camera.aspect = w / h
            camera.updateProjectionMatrix()
        }
        window.addEventListener('resize', handleResize)

        const onDown = (e) => { s.startX = e.clientX }
        const onUp = (e) => {
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
        renderer.domElement.addEventListener('pointerup', onUp)

        return () => {
            cancelAnimationFrame(s.animFrameId)
            window.removeEventListener('resize', handleResize)
            renderer.domElement.removeEventListener('pointerdown', onDown)
            renderer.domElement.removeEventListener('pointerup', onUp)
            renderer.dispose()
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const dayBg = 'linear-gradient(180deg, #4fc3f7 0%, #81d4fa 30%, #b3e5fc 65%, #e1f5fe 100%)'
    const nightBg = 'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'


    return (
        <div style={{
            width: '100%',
            height: '460px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            background: isDark ? nightBg : dayBg,
            transition: 'background 1s ease',
        }}>

            {/* ── Sun (day) ── */}
            {!isDark && (
                <div style={{
                    position: 'absolute', top: '20px', right: '90px',
                    width: '70px', height: '70px', borderRadius: '50%',
                    background: 'radial-gradient(circle at 38% 38%, #fffde7, #FDD835)',
                    boxShadow: '0 0 48px 20px rgba(253,216,53,0.38)',
                    zIndex: 1, pointerEvents: 'none',
                }} />
            )}

            {/* ── Moon (night) ── */}
            {isDark && (
                <div style={{
                    position: 'absolute', top: '22px', right: '88px',
                    width: '54px', height: '54px', borderRadius: '50%',
                    background: '#f5e97a',
                    boxShadow: '0 0 32px 10px rgba(245,233,122,0.22)',
                    zIndex: 1, pointerEvents: 'none',
                }}>
                    {/* crescent cutout */}
                    <div style={{
                        position: 'absolute', top: '-4px', right: '-6px',
                        width: '46px', height: '46px', borderRadius: '50%',
                        background: isDark ? '#18143a' : 'transparent',
                    }} />
                </div>
            )}

            {/* ── CSS Cloud strips (day) ── */}
            {!isDark && (
                <>
                    <style>{`
            @keyframes cldA{from{transform:translateX(-220px)}to{transform:translateX(110vw)}}
            @keyframes cldB{from{transform:translateX(-300px)}to{transform:translateX(108vw)}}
            @keyframes cldC{from{transform:translateX(-180px)}to{transform:translateX(112vw)}}
          `}</style>
                    {[
                        { top: '6%', w: 200, h: 60, op: 0.6, dur: 26, delay: 0, anim: 'cldA' },
                        { top: '14%', w: 280, h: 78, op: 0.5, dur: 38, delay: -14, anim: 'cldB' },
                        { top: '21%', w: 160, h: 50, op: 0.38, dur: 20, delay: -5, anim: 'cldC' },
                        { top: '32%', w: 230, h: 68, op: 0.28, dur: 44, delay: -22, anim: 'cldA' },
                        { top: '4%', w: 150, h: 44, op: 0.42, dur: 30, delay: -9, anim: 'cldB' },
                        { top: '26%', w: 190, h: 56, op: 0.32, dur: 34, delay: -18, anim: 'cldC' },
                    ].map((c, i) => (
                        <div key={i} style={{
                            position: 'absolute', top: c.top, left: 0,
                            width: `${c.w}px`, height: `${c.h}px`,
                            background: 'white', borderRadius: '999px', opacity: c.op,
                            animation: `${c.anim} ${c.dur}s linear ${c.delay}s infinite`,
                            pointerEvents: 'none', zIndex: 1,
                        }} />
                    ))}
                </>
            )}

            {/* ── CSS Star dots (night) ── */}
            {isDark && (
                <>
                    <style>{`@keyframes twk{0%,100%{opacity:.15}50%{opacity:.95}}`}</style>
                    {starDots.current.map((st, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            top: `${st.top}%`, left: `${st.left}%`,
                            width: `${st.size}px`, height: `${st.size}px`,
                            borderRadius: '50%', background: '#fff',
                            animation: `twk ${st.dur}s ease-in-out ${st.delay}s infinite`,
                            pointerEvents: 'none', zIndex: 1,
                        }} />
                    ))}
                </>
            )}

            {/* ── Three.js canvas ── */}
            <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }} />

            {/* ── Dot indicators ── */}
            <div style={{
                position: 'absolute', top: '18px', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: '8px', zIndex: 10,
            }}>
                {CARDS.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{
                        width: i === currentIndex ? '24px' : '8px',
                        height: '8px', borderRadius: '999px',
                        background: i === currentIndex ? '#fff' : 'rgba(255,255,255,0.38)',
                        border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.35s ease',
                    }} />
                ))}
            </div>

            {/* ── Card info overlay ── */}
            <div style={{
                position: 'absolute', bottom: '30px', left: '50%',
                transform: 'translateX(-50%)', textAlign: 'center',
                pointerEvents: 'none', minWidth: '300px', zIndex: 10,
            }}>
                <div style={{
                    fontSize: '19px', fontWeight: 600, color: '#fff',
                    marginBottom: '6px', textShadow: '0 2px 16px rgba(0,0,0,0.45)',
                    transition: 'opacity 0.3s',
                }}>
                    {CARDS[currentIndex].title}
                </div>
                <div style={{
                    fontSize: '13px', lineHeight: 1.55, margin: '0 auto',
                    maxWidth: '270px', textShadow: '0 1px 8px rgba(0,0,0,0.35)',
                    color: isDark ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.9)',
                }}>
                    {CARDS[currentIndex].desc}
                </div>
            </div>

            {/* ── Prev / Next arrows ── */}
            {[['prev', '‹', -1, { left: '16px' }], ['next', '›', 1, { right: '16px' }]].map(([id, label, dir, pos]) => (
                <button key={id} onClick={() => goTo(currentIndex + dir)} aria-label={id} style={{
                    position: 'absolute', ...pos, top: '50%', transform: 'translateY(-50%)',
                    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.35)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff', width: '44px', height: '44px', borderRadius: '50%',
                    fontSize: '24px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s', zIndex: 10,
                }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
                    onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.35)'}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
