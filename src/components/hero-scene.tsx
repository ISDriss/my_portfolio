'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x030e3c, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x030e3c, 16, 32);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 1.5, 8);

    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    const warm = new THREE.PointLight(0xff6403, 1.5, 28);
    warm.position.set(4, 4, 6);
    const cool = new THREE.PointLight(0x12f8ba, 1.2, 28);
    cool.position.set(-4, -1, 5);
    const rim = new THREE.PointLight(0xffe100, 0.7, 24);
    rim.position.set(0, 6, -4);
    scene.add(ambient, warm, cool, rim);

    const group = new THREE.Group();
    scene.add(group);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6403,
      metalness: 0.45,
      roughness: 0.18,
    });
    const core = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.2, 0.35, 240, 32, 2, 5),
      coreMaterial,
    );
    core.castShadow = true;
    group.add(core);

    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#12f8ba'),
      metalness: 0.15,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.2,
      transparent: true,
      opacity: 0.9,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    });
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.65, 2),
      shellMaterial,
    );
    group.add(shell);

    const rings: THREE.Line[] = [];
    [2.4, 3, 3.6].forEach((radius, index) => {
      const ringGeometry = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= 360; i++) {
        const angle = THREE.MathUtils.degToRad(i);
        const y = Math.sin(angle * (1.5 + index * 0.2)) * 0.35;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius,
          ),
        );
      }
      ringGeometry.setFromPoints(points);
      const ring = new THREE.Line(
        ringGeometry,
        new THREE.LineBasicMaterial({
          color: 0xffe100,
          transparent: true,
          opacity: 0.6,
        }),
      );
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      group.add(ring);
      rings.push(ring);
    });

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 420;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const start = performance.now();
    let frameId: number;

    const handleResize = () => {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      const elapsed = (performance.now() - start) / 1000;

      core.rotation.x += 0.005;
      core.rotation.y += 0.006;
      shell.rotation.y -= 0.0025;
      shell.rotation.z += 0.0015;

      rings.forEach((ring, index) => {
        ring.rotation.y += 0.002 + index * 0.001;
        ring.rotation.x -= 0.001 * index;
        ring.position.y = Math.sin(elapsed * (0.6 + index * 0.3)) * 0.25;
      });

      particles.rotation.y += 0.0008;

      camera.position.x = Math.sin(elapsed * 0.35) * 0.8;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      core.geometry.dispose();
      core.material.dispose();
      shell.geometry.dispose();
      shell.material.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-96 md:h-[520px]">
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-navy/70 via-electric/40 to-navy/80 shadow-[0_25px_80px_-35px_rgba(0,0,0,0.7)]"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_18%_20%,rgba(255,100,3,0.24),transparent_35%),radial-gradient(circle_at_82%_12%,rgba(18,248,186,0.2),transparent_30%),radial-gradient(circle_at_65%_78%,rgba(255,225,0,0.14),transparent_36%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />
    </div>
  );
}
