
"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calculator, Mail, ArrowDown, Sparkles, Zap } from "lucide-react"

type RandomValue = {
  y1: number;
  y2: number;
  top: string;
};

export function EnhancedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationFrameId = useRef<number>()
  const mouse = useRef(new THREE.Vector2())
  const [isLoaded, setIsLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [randomValues, setRandomValues] = useState<RandomValue[]>([]);


  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    
    setRandomValues(
        [...Array(6)].map(() => ({
            y1: Math.random() * window.innerHeight,
            y2: Math.random() * window.innerHeight,
            top: Math.random() * 100 + "%",
        }))
    );

    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const setupScene = useCallback(() => {
    if (!containerRef.current || rendererRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 15)
    sceneRef.current = scene
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Enhanced geometry with more variety
    const geometries = [
      new THREE.IcosahedronGeometry(0.15, 1),
      new THREE.OctahedronGeometry(0.2),
      new THREE.TetrahedronGeometry(0.18),
      new THREE.SphereGeometry(0.12, 8, 6),
    ]

    // Enhanced materials with better colors
    const primaryMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#3B82F6"),
      metalness: 0.4,
      roughness: 0.3,
      emissive: new THREE.Color("#1E40AF"),
      emissiveIntensity: 0.1,
    })

    const secondaryMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FBBF24"),
      metalness: 0.6,
      roughness: 0.2,
      emissive: new THREE.Color("#F59E0B"),
      emissiveIntensity: 0.4,
    })

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#EC4899"),
      metalness: 0.5,
      roughness: 0.4,
      emissive: new THREE.Color("#DB2777"),
      emissiveIntensity: 0.3,
    })

    const totalNodes = 200
    const instances: {
      mesh: THREE.Mesh
      velocity: THREE.Vector3
      rotation: THREE.Euler
      rotationSpeed: THREE.Vector3
      originalPosition: THREE.Vector3
      floatOffset: number
    }[] = []

    // Create diverse node instances
    for (let i = 0; i < totalNodes; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      let material = primaryMaterial

      if (i < totalNodes * 0.15) material = secondaryMaterial
      else if (i < totalNodes * 0.25) material = accentMaterial

      const mesh = new THREE.Mesh(geometry, material)
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
      )

      mesh.position.copy(position)
      mesh.scale.setScalar(0.8 + Math.random() * 0.4)
      scene.add(mesh)

      instances.push({
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
        ),
        rotation: new THREE.Euler(0, 0, 0),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
        ),
        originalPosition: position.clone(),
        floatOffset: Math.random() * Math.PI * 2,
      })
    }

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0xfbbf24, 2, 25)
    pointLight1.position.set(-15, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x3b82f6, 1.5, 20)
    pointLight2.position.set(15, -10, 5)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0xec4899, 1, 15)
    pointLight3.position.set(0, 15, -10)
    scene.add(pointLight3)

    let time = 0
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate)
      time += 0.01

      instances.forEach((instance) => {
        // Floating animation
        const floatY = Math.sin(time + instance.floatOffset) * 0.5
        instance.mesh.position.copy(instance.originalPosition)
        instance.mesh.position.y += floatY

        // Gentle movement
        instance.mesh.position.add(instance.velocity)

        // Rotation
        instance.rotation.x += instance.rotationSpeed.x
        instance.rotation.y += instance.rotationSpeed.y
        instance.rotation.z += instance.rotationSpeed.z
        instance.mesh.rotation.copy(instance.rotation)

        // Boundary checking with smooth bounce
        if (Math.abs(instance.mesh.position.x) > 18) {
          instance.velocity.x *= -0.8
          instance.mesh.position.x = Math.sign(instance.mesh.position.x) * 18
        }
        if (Math.abs(instance.mesh.position.y) > 18) {
          instance.velocity.y *= -0.8
          instance.mesh.position.y = Math.sign(instance.mesh.position.y) * 18
        }
        if (Math.abs(instance.mesh.position.z) > 18) {
          instance.velocity.z *= -0.8
          instance.mesh.position.z = Math.sign(instance.mesh.position.z) * 18
        }
      })

      // Enhanced camera movement
      if (cameraRef.current) {
        const targetX = mouse.current.x * 3
        const targetY = -mouse.current.y * 3

        cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.03
        cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.03
        cameraRef.current.lookAt(scene.position)
      }

      // Animate lights
      pointLight1.position.x = Math.sin(time * 0.5) * 10 - 5
      pointLight2.position.z = Math.cos(time * 0.3) * 8 + 2
      pointLight3.intensity = 1 + Math.sin(time * 2) * 0.3

      renderer.render(scene, cameraRef.current!)
    }

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animationFrameId.current) animate()
        } else {
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current)
            animationFrameId.current = undefined
          }
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    // Start animation and mark as loaded
    animate()
    setTimeout(() => setIsLoaded(true), 500)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
      if (containerRef.current) observer.unobserve(containerRef.current)

      // Cleanup THREE.js resources
      geometries.forEach((geo) => geo.dispose())
      primaryMaterial.dispose()
      secondaryMaterial.dispose()
      accentMaterial.dispose()
      instances.forEach((instance) => {
        scene.remove(instance.mesh)
      })
      if (rendererRef.current?.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      rendererRef.current?.dispose()
      rendererRef.current = null
    }
  }, [])

  useEffect(() => {
    const cleanup = setupScene()
    return () => {
      cleanup?.()
    }
  }, [setupScene])

  return (
    <section className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-20 md:pt-24">
      {/* 3D Background */}
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20 z-10" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        {randomValues.map((vals, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            animate={{
              x: [0, dimensions.width],
              y: [vals.y1, vals.y2],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 2,
            }}
            style={{
              left: -10,
              top: vals.top,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center text-center p-6 text-white max-w-5xl mx-auto"
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo Section */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1.2,
          }}
        >
          <div className="relative p-2">
            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-yellow-400/40"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-blue-400/30"
              animate={{
                rotate: -360,
                scale: [1, 0.95, 1],
              }}
              transition={{
                rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 },
              }}
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 via-blue-400/20 to-purple-400/20 blur-xl"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <Image
              src="/LogoEnviosDosRuedas.webp"
              alt="Envios DosRuedas Logo"
              width={160}
              height={160}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-2xl relative z-10 ring-4 ring-white/20"
              priority
            />

            {/* Floating particles around logo */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                animate={{
                  x: [0, Math.cos((i * Math.PI) / 4) * 80],
                  y: [0, Math.sin((i * Math.PI) / 4) * 80],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          className="mb-6 space-y-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-blue-400/20 border border-white/20 backdrop-blur-sm mb-4"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white/90">Tu Solución Confiable</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-yellow-100 bg-clip-text text-transparent leading-tight"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Envios DosRuedas
          </motion.h1>
        </motion.div>

        {/* Description */}
        <motion.p
          className="max-w-3xl text-lg md:text-xl text-gray-200 leading-relaxed mb-10 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Somos tu solución confiable en servicios de mensajería y delivery en Mar del Plata. Ofrecemos soluciones{" "}
          <span className="text-yellow-400 font-medium">rápidas</span>,
          <span className="text-blue-400 font-medium"> seguras</span> y
          <span className="text-purple-400 font-medium"> económicas</span> para todas tus necesidades de envío.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold shadow-2xl px-8 py-4 text-lg rounded-full border-2 border-yellow-400/50 hover:border-yellow-300 transition-all duration-300"
            >
              <Link href="/cotizar/express" className="flex items-center gap-3">
                <Calculator className="w-5 h-5" />
                Cotizar Envío
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  →
                </motion.div>
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-bold shadow-2xl px-8 py-4 text-lg rounded-full backdrop-blur-sm transition-all duration-300 bg-transparent"
            >
              <Link href="/contacto" className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                Contacto
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-2 text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-sm font-medium">Descubre más</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
