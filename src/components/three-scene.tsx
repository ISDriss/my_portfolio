'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x030e3c, 0);
    container.appendChild(renderer.domElement);

    // scene & objects
    const scene = new THREE.Scene();
    const billboards: THREE.Mesh[] = [];
    const billboardMaterials: THREE.Material[] = [];
    const billboardGeometry = new THREE.PlaneGeometry(12, 8);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // Load city model
    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;
    let canceled = false;

    loader.load(
      '/city_main.glb',
      (gltf) => {
        if (canceled) return;
        model = gltf.scene;
        model.scale.setScalar(0.1);
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.geometry.computeBoundingSphere();
          }
        });
        scene.add(model);
        fitModelToView(model);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Failed to load city_main.glb', error);
        if (!canceled) setIsLoading(false);
      },
    );

    // Meshes
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(4000, 4000),
      new THREE.MeshPhongMaterial({ color: 0x0c122f, emissive: 0x050915, shininess: 5 }),
    );
    floor.rotation.x = -Math.PI / 2; // lay flat on the XZ plane
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    // lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(5, 8, 6);
    scene.add(ambient, key);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(6, 4, 10);
    camera.lookAt(0, 1, 0);

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);
    controls.update();

    // Optional preset camera from manual tweaking
    const presetCamera = {
      position: new THREE.Vector3(8.525420424051044, 48.50387277368863, 144.68016838546302),
      target: new THREE.Vector3(5.114105441477861, 31.581279030743215, -13.365219823949888),
      near: 1.2066283236666766,
      far: 2413.256647333353,
    };

    // helper to frame the model and keep camera range sane
    const fitModelToView = (object: THREE.Object3D) => {
      // If a preset exists, apply it instead of auto-fit
      if (presetCamera) {
        camera.position.copy(presetCamera.position);
        controls.target.copy(presetCamera.target);
        camera.near = presetCamera.near;
        camera.far = presetCamera.far;
        camera.updateProjectionMatrix();
        controls.update();
        return;
      }

      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = (camera.fov * Math.PI) / 180;
      const distance = (maxDim * 1.2) / Math.tan(fov / 2 || 0.0001);
      const direction = new THREE.Vector3(1, 0.6, 1).normalize();

      camera.position.copy(center.clone().add(direction.multiplyScalar(distance)));
      camera.near = Math.max(0.1, distance / 500);
      camera.far = Math.max(distance * 4, camera.near + 1);
      camera.updateProjectionMatrix();

      controls.target.copy(center);
      controls.maxDistance = distance * 3;
      controls.update();
    };

    const addBillboardAt = (point: THREE.Vector3, normal: THREE.Vector3) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0x1ad3ff,
        emissive: 0x0f7cb0,
        emissiveIntensity: 1.2,
        metalness: 0.35,
        roughness: 0.45,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      billboardMaterials.push(mat);
      const board = new THREE.Mesh(billboardGeometry, mat);
      const offset = normal.clone().setLength(0.2);
      board.position.copy(point).add(offset);
      board.lookAt(board.position.clone().add(normal));
      board.castShadow = false;
      board.receiveShadow = true;
      scene.add(board);
      billboards.push(board);

      console.info('Billboard placed at', board.position.toArray(), 'normal', normal.toArray());
    };

    const removeLastBillboard = () => {
      const board = billboards.pop();
      if (!board) return;
      scene.remove(board);
      (board.material as THREE.Material).dispose();
      const mat = billboardMaterials.pop();
      if (mat && mat !== board.material) {
        mat.dispose();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!model || event.button !== 0) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(model, true);
      if (!intersects.length) return;
      const hit = intersects[0];
      const worldNormal = hit.face?.normal
        ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize()
        : new THREE.Vector3(0, 0, 1);
      addBillboardAt(hit.point, worldNormal);
    };

    // resize handler
    const handleResize = () => {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    // animations
    let frameId: number;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // keyboard nudges to help find a good angle; log with "L"
    const handleKeyDown = (event: KeyboardEvent) => {
      const speedBase = event.altKey ? 0.25 : event.shiftKey ? 2.5 : 1;

      const moveBoth = (dir: THREE.Vector3, amount: number) => {
        const delta = dir.clone().setLength(amount);
        camera.position.add(delta);
        controls.target.add(delta);
        controls.update();
      };

      const forward = controls.target.clone().sub(camera.position).normalize();
      const right = forward.clone().cross(camera.up).normalize();
      const up = new THREE.Vector3(0, 1, 0);

      switch (event.key.toLowerCase()) {
        case 'w':
          moveBoth(forward, speedBase);
          break;
        case 's':
          moveBoth(forward, -speedBase);
          break;
        case 'a':
          moveBoth(right, -speedBase);
          break;
        case 'd':
          moveBoth(right, speedBase);
          break;
        case 'r':
          moveBoth(up, speedBase);
          break;
        case 'f':
          moveBoth(up, -speedBase);
          break;
        case 'l':
          console.info('Camera position', camera.position.toArray());
          console.info('Controls target', controls.target.toArray());
          console.info('Near/Far', camera.near, camera.far);
          break;
        case 'backspace':
          removeLastBillboard();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
      billboards.forEach((board) => {
        scene.remove(board);
      });
      billboardGeometry.dispose();
      billboardMaterials.forEach((mat) => mat.dispose());
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      if (model) {
        scene.remove(model);
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
      canceled = true;
      setIsLoading(false);
    };
  }, []);

  return (
    <div className="relative w-full h-96 md:h-[520px]">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[32px] bg-navy/85 backdrop-blur">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-electric/30 border-t-electric" />
          <div className="text-white/80 text-sm uppercase tracking-[0.2em]">
            Loading Scene...
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-br from-navy/70 via-electric/40 to-navy/80 shadow-[0_25px_80px_-35px_rgba(0,0,0,0.7)]"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_18%_20%,rgba(255,100,3,0.24),transparent_35%),radial-gradient(circle_at_82%_12%,rgba(18,248,186,0.2),transparent_30%),radial-gradient(circle_at_65%_78%,rgba(255,225,0,0.14),transparent_36%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />
    </div>
  );
}
