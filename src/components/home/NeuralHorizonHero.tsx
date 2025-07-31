
// src/components/home/NeuralHorizonHero.tsx
'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calculator, Mail } from 'lucide-react';

export function NeuralHorizonHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const animationFrameId = useRef<number>();
    const mouse = useRef(new THREE.Vector2());

    const setupScene = useCallback(() => {
        if (!containerRef.current || rendererRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 15);
        sceneRef.current = scene;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const nodeGeometry = new THREE.IcosahedronGeometry(0.2, 1);
        
        // Get colors from CSS variables
        const primaryColorHex = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        const secondaryColorHex = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim();

        const nodeMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(primaryColorHex || '#1E40AF'),
            metalness: 0.3,
            roughness: 0.6,
        });
        const accentMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(secondaryColorHex || '#F9A825'),
            metalness: 0.5,
            roughness: 0.4,
            emissive: new THREE.Color(secondaryColorHex || '#F9A825'),
            emissiveIntensity: 0.3,
        });
        
        const totalNodes = 150;
        const accentNodesCount = Math.floor(totalNodes * 0.1);
        const regularNodesCount = totalNodes - accentNodesCount;

        const regularNodesMesh = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, regularNodesCount);
        const accentNodesMesh = new THREE.InstancedMesh(nodeGeometry, accentMaterial, accentNodesCount);
        
        const instances: { 
            matrix: THREE.Matrix4; 
            velocity: THREE.Vector3; 
            rotation: THREE.Euler;
            rotationSpeed: THREE.Vector3;
            mesh: THREE.InstancedMesh; 
            index: number 
        }[] = [];

        const setupInstances = (mesh: THREE.InstancedMesh, count: number) => {
            for (let i = 0; i < count; i++) {
                const matrix = new THREE.Matrix4();
                const position = new THREE.Vector3(
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 30
                );
                matrix.setPosition(position);
                mesh.setMatrixAt(i, matrix);

                instances.push({
                    matrix,
                    velocity: new THREE.Vector3(
                        (Math.random() - 0.5) * 0.01,
                        (Math.random() - 0.5) * 0.01,
                        (Math.random() - 0.5) * 0.01
                    ),
                    rotation: new THREE.Euler(0,0,0),
                    rotationSpeed: new THREE.Vector3(
                        (Math.random() - 0.5) * 0.01,
                        (Math.random() - 0.5) * 0.01,
                        (Math.random() - 0.5) * 0.01
                    ),
                    mesh,
                    index: i
                });
            }
        };

        setupInstances(regularNodesMesh, regularNodesCount);
        setupInstances(accentNodesMesh, accentNodesCount);

        scene.add(regularNodesMesh);
        scene.add(accentNodesMesh);
        
        const ambientLight = new THREE.AmbientLight(new THREE.Color(primaryColorHex || '#60A5FA'), 1);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        const pointLight = new THREE.PointLight(new THREE.Color(secondaryColorHex || '#FBBF24'), 2, 20);
        pointLight.position.set(-10, 5, 10);
        scene.add(pointLight);

        const tempPosition = new THREE.Vector3();
        const tempQuaternion = new THREE.Quaternion();
        const tempScale = new THREE.Vector3(1, 1, 1);


        const animate = () => {
            animationFrameId.current = requestAnimationFrame(animate);
            
            instances.forEach(instance => {
                tempPosition.setFromMatrixPosition(instance.matrix);
                tempPosition.add(instance.velocity);

                instance.rotation.x += instance.rotationSpeed.x;
                instance.rotation.y += instance.rotationSpeed.y;
                instance.rotation.z += instance.rotationSpeed.z;

                tempQuaternion.setFromEuler(instance.rotation);

                if (Math.abs(tempPosition.x) > 15) instance.velocity.x *= -1;
                if (Math.abs(tempPosition.y) > 15) instance.velocity.y *= -1;
                if (Math.abs(tempPosition.z) > 15) instance.velocity.z *= -1;
                
                instance.matrix.compose(tempPosition, tempQuaternion, tempScale);
                instance.mesh.setMatrixAt(instance.index, instance.matrix);
            });

            regularNodesMesh.instanceMatrix.needsUpdate = true;
            accentNodesMesh.instanceMatrix.needsUpdate = true;
            
            if (cameraRef.current) {
                cameraRef.current.position.x += (mouse.current.x * 5 - cameraRef.current.position.x) * 0.05;
                cameraRef.current.position.y += (-mouse.current.y * 5 - cameraRef.current.position.y) * 0.05;
                cameraRef.current.lookAt(scene.position);
            }
            
            renderer.render(scene, cameraRef.current!);
        };

        const handleResize = () => {
            if (cameraRef.current && rendererRef.current) {
                cameraRef.current.aspect = window.innerWidth / window.innerHeight;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(window.innerWidth, window.innerHeight);
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                   if (!animationFrameId.current) animate();
                } else {
                    if (animationFrameId.current) {
                        cancelAnimationFrame(animationFrameId.current);
                        animationFrameId.current = undefined;
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            if (containerRef.current) observer.unobserve(containerRef.current);

            // Cleanup THREE.js resources
            nodeGeometry.dispose();
            nodeMaterial.dispose();
            accentMaterial.dispose();
            if (rendererRef.current?.domElement && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }
            rendererRef.current?.dispose();
            rendererRef.current = null;
        };
    }, []);

    useEffect(() => {
        const cleanup = setupScene();
        return () => {
            cleanup?.();
        };
    }, [setupScene]);

    return (
        <section className="h-screen w-full relative flex items-center justify-center bg-primary">
            <div ref={containerRef} className="absolute top-0 left-0 w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-0" />
            
            <motion.div 
                className="relative z-10 flex flex-col items-center text-center p-4 text-primary-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div 
                    className="mb-6 p-1 rounded-full relative bg-primary/30 animate-float"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                >
                    <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-400" 
                         style={{animation: 'spin-slow 8s linear infinite'}}
                    />
                    <Image
                        src="/LogoEnviosDosRuedas.webp"
                        alt="Envios DosRuedas Logo"
                        width={180}
                        height={180}
                        className="w-32 h-32 sm:w-44 sm:h-44 rounded-full shadow-2xl relative z-10"
                        priority
                    />
                </motion.div>
                
                <motion.h1 
                    className="text-4xl md:text-6xl font-bold text-secondary mb-4 font-heading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Envios DosRuedas
                </motion.h1>

                <motion.p 
                    className="max-w-2xl text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-8 font-sans"
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
                    <Button asChild size="lg" variant="secondary" className="font-bold shadow-lg transform hover:scale-105 transition-transform">
                        <Link href="/cotizar/express">
                            <Calculator className="mr-2 h-5 w-5" />
                            Cotizar Envío
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 hover:text-white font-bold shadow-lg transform hover:scale-105 transition-transform">
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
