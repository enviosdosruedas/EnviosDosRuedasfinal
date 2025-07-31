// src/components/home/NeuralHorizonHero.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calculator, Mail } from 'lucide-react';

export function NeuralHorizonHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;

        let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, nodes: THREE.Mesh[] = [];

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 15);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            containerRef.current?.appendChild(renderer.domElement);

            const nodeGeometry = new THREE.IcosahedronGeometry(0.2, 1);
            const nodeMaterial = new THREE.MeshStandardMaterial({
                color: 0x3B82F6, // Primary Blue
                metalness: 0.3,
                roughness: 0.6,
            });
            const accentMaterial = new THREE.MeshStandardMaterial({
                color: 0xF59E0B, // Secondary Yellow
                metalness: 0.5,
                roughness: 0.4,
                emissive: 0xF59E0B,
                emissiveIntensity: 0.3
            });
            
            for (let i = 0; i < 150; i++) {
                const material = Math.random() > 0.9 ? accentMaterial : nodeMaterial;
                const node = new THREE.Mesh(nodeGeometry, material);
                node.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30);
                node.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01);
                nodes.push(node);
                scene.add(node);
            }

            const ambientLight = new THREE.AmbientLight(0x60A5FA, 1); // Soft blue ambient
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
            directionalLight.position.set(5, 5, 5);
            scene.add(directionalLight);

            const pointLight = new THREE.PointLight(0xFBBF24, 2, 20); // Yellow point light
            pointLight.position.set(-10, 5, 10);
            scene.add(pointLight);

            window.addEventListener('resize', onResize);
        };

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const animate = () => {
            requestAnimationFrame(animate);
            nodes.forEach(node => {
                node.position.add(node.velocity);
                if (Math.abs(node.position.x) > 15) node.velocity.x *= -1;
                if (Math.abs(node.position.y) > 15) node.velocity.y *= -1;
                if (Math.abs(node.position.z) > 15) node.velocity.z *= -1;

                node.rotation.x += 0.001;
                node.rotation.y += 0.001;
            });
            renderer.render(scene, camera);
        };
        
        init();
        animate();

        return () => {
            window.removeEventListener('resize', onResize);
            if(renderer.domElement && containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <section className="h-screen w-full relative flex items-center justify-center">
            <div ref={containerRef} className="absolute top-0 left-0 w-full h-full bg-[#1E40AF]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E40AF] via-[#1E40AF]/80 to-transparent z-0" />
            
            <motion.div 
                className="relative z-10 flex flex-col items-center text-center p-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div 
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                >
                    <Image
                        src="/LogoEnviosDosRuedas.webp"
                        alt="Envios DosRuedas Logo"
                        width={180}
                        height={180}
                        className="rounded-full shadow-2xl"
                        priority
                    />
                </motion.div>
                
                <motion.h1 
                    className="text-4xl md:text-6xl font-bold text-[#F9A825] mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Envios DosRuedas
                </motion.h1>

                <motion.p 
                    className="max-w-2xl text-lg md:text-xl text-gray-200/90 leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    Somos tu solución confiable en servicios de mensajería y delivery en Mar del Plata. Ofrecemos soluciones rápidas, seguras y económicas para todas tus necesidades de envío.
                </motion.p>
                
                <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <Button asChild size="lg" className="bg-[#F9A825] text-[#1E40AF] hover:bg-[#FBBF24] font-bold shadow-lg transform hover:scale-105 transition-transform">
                        <Link href="/cotizar/express">
                            <Calculator className="mr-2 h-5 w-5" />
                            Cotizar Envío
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-[#F9A825] text-[#F9A825] hover:bg-[#F9A825]/10 hover:text-white font-bold shadow-lg transform hover:scale-105 transition-transform">
                        <Link href="/contacto">
                            <Mail className="mr-2 h-5 w-5" />
                            Contacto
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
