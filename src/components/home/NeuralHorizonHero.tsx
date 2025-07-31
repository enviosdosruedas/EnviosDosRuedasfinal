// src/components/home/NeuralHorizonHero.tsx
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const StatItem = ({ id, label, finalValue, delay }: { id: string; label: string; finalValue: number; delay: number }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let start = 0;
            const duration = 2000;
            const startTime = Date.now();

            const animate = () => {
                const now = Date.now();
                const elapsedTime = now - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentValue = Math.floor(progress * finalValue);

                setValue(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setValue(finalValue);
                }
            };
            requestAnimationFrame(animate);
        }, delay);

        return () => clearTimeout(timeout);
    }, [finalValue, delay]);

    return (
        <div className="text-center transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-1">
            <span className="block text-4xl text-[#00ffd5] font-bold" style={{ textShadow: '0 0 20px rgba(0, 234, 255, 0.8)' }}>
                {value.toLocaleString()}
            </span>
            <small className="block text-sm opacity-90 text-gray-200 tracking-wider uppercase font-semibold">{label}</small>
        </div>
    );
};


export function NeuralHorizonHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;

        let scene, camera, renderer, nodes: THREE.Mesh[] = [], connections, raycaster, mouse;

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 1, 20);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            containerRef.current?.appendChild(renderer.domElement);

            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            const nodeGeometry = new THREE.IcosahedronGeometry(0.25, 2);
            const nodeMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffd5,
                transparent: true,
                opacity: 0.8
            });

            for (let i = 0; i < 200; i++) {
                const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
                node.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40);
                node.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02);
                node.userData.baseColor = new THREE.Color(0x00ffd5);
                node.userData.hoverColor = new THREE.Color(0xff2cc4);
                nodes.push(node);
                scene.add(node);
            }

            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x00ffd5,
                transparent: true,
                opacity: 0.3
            });
            connections = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
            scene.add(connections);

            const light1 = new THREE.PointLight(0x00ffd5, 1.5, 100);
            light1.position.set(20, 20, 20);
            scene.add(light1);

            const light2 = new THREE.PointLight(0xff2cc4, 1.5, 100);
            light2.position.set(-20, -20, 20);
            scene.add(light2);

            window.addEventListener('resize', onResize);
            containerRef.current?.addEventListener('mousemove', onMouseMove);
        };

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const animate = () => {
            requestAnimationFrame(animate);
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(nodes);

            nodes.forEach(node => {
                node.position.add(node.velocity);
                if (node.position.length() > 25) {
                    node.velocity.multiplyScalar(-1);
                }
                (node.material as THREE.MeshBasicMaterial).color.lerp(node.userData.baseColor, 0.05);
            });

            if (intersects.length > 0) {
                const closest = intersects[0].object as THREE.Mesh;
                (closest.material as THREE.MeshBasicMaterial).color.set(closest.userData.hoverColor);
            }

            const positions = [];
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dist = nodes[i].position.distanceTo(nodes[j].position);
                    if (dist < 4) {
                        positions.push(
                            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
                            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
                        );
                    }
                }
            }
            connections.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

            camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
            camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        
        init();
        animate();

        return () => {
            window.removeEventListener('resize', onResize);
            containerRef.current?.removeEventListener('mousemove', onMouseMove);
            if(renderer.domElement && containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };

    }, []);

    return (
        <section className="h-screen w-screen relative">
            <div ref={containerRef} className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#3a1cbd,#090418)]" />
            <div className="absolute inset-0 z-10 flex flex-col p-4 md:p-8 text-white">
                
                {/* Header */}
                <header className="absolute top-4 left-4 right-4 lg:top-8 lg:left-8 lg:right-8 z-20 flex flex-col md:flex-row justify-between items-center p-3 backdrop-blur-md rounded-full bg-[rgba(30,20,60,0.2)] border border-[rgba(0,255,213,0.3)] shadow-lg hover:bg-[rgba(58,28,189,0.2)] hover:shadow-[0_8px_25px_rgba(0,255,213,0.2)] transition-all">
                    <h1 className="text-4xl font-black text-gradient-animated" style={{textShadow: '0 0 30px rgba(0, 234, 255, 0.9)'}}>
                        Envios DosRuedas
                    </h1>
                    <div className="grid grid-cols-3 gap-6 p-4 rounded-full bg-[rgba(25,15,60,0.85)] border border-[rgba(0,255,213,0.4)] backdrop-blur-lg mt-4 md:mt-0">
                        <StatItem id="envios" label="Envíos" finalValue={15000} delay={300} />
                        <StatItem id="clientes" label="Clientes" finalValue={2500} delay={500} />
                        <StatItem id="puntualidad" label="Puntualidad" finalValue={98} delay={700} />
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-grow flex items-center justify-center text-center">
                    <div className="animate-[fadeInUp_1.2s_ease-out_0.7s_forwards] opacity-0">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gradient-animated" style={{ textShadow: '0 0 60px rgba(0, 234, 255, 0.8)', animationName: 'gradientFlow, textPulse', animationDuration: '7s, 3.5s', animationIterationCount: 'infinite, infinite' }}>
                            Tu Envío, Nuestra Misión
                        </h2>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto my-8 text-gray-200 opacity-95 leading-relaxed" style={{textShadow: '0 0 25px rgba(255,255,255,0.5)'}}>
                            Transformamos la logística de Mar del Plata con un servicio de mensajería y delivery rápido, seguro y confiable. Tu tranquilidad es nuestro destino.
                        </p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pb-12">
                     <a href="/cotizar/express" className="pointer-events-auto flex items-center justify-center px-8 py-3 text-lg font-bold text-white uppercase tracking-wider rounded-full shadow-lg transition-all duration-300 ease-out bg-gradient-to-r from-[#00ffd5] to-[#ff2cc4] hover:shadow-[0_15px_40px_rgba(0,234,255,0.8)] hover:-translate-y-1.5 hover:scale-105 active:scale-95 active:-translate-y-0.5">
                        Cotizar Envío
                    </a>
                    <a href="/contacto" className="pointer-events-auto flex items-center justify-center px-8 py-3 text-lg font-bold text-white uppercase tracking-wider rounded-full shadow-md transition-all duration-300 ease-out bg-transparent border-2 border-[rgba(0,255,213,0.6)] hover:border-[rgba(0,255,213,0.9)] hover:bg-[rgba(0,255,213,0.1)] hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(0,255,213,0.4)] active:scale-95 active:-translate-y-0.5">
                        Saber Más
                    </a>
                </div>
            </div>
        </section>
    );
}

