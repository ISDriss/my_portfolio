'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRouter } from 'next/navigation';
import { projects } from '@/data/projects';

export function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAd, setActiveAd] = useState<{
    title: string;
    description: string;
    link: string;
    slug: string;
  } | null>(null);
  const router = useRouter();

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
    const billboardGeometries: THREE.PlaneGeometry[] = [];
    const textureLoader = new THREE.TextureLoader();
    const cameraTransition = {
      active: false,
      start: 0,
      duration: 900, // ms
      fromPos: new THREE.Vector3(),
      toPos: new THREE.Vector3(),
      fromTarget: new THREE.Vector3(),
      toTarget: new THREE.Vector3(),
      fromNear: 0.1,
      toNear: 0.1,
      fromFar: 1000,
      toFar: 1000,
    };
    const adTextures = projects
      .filter((project) => project.ad?.src)
      .map((project) => {
        const ad = {
          ...project.ad!,
          link: project.ad?.link ?? 'page',
          title: project.title,
          description: project.description,
          slug: project.slug,
        };
        const texture = textureLoader.load(ad.src);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.center.set(0.5, 0.5);
        return { texture, ad };
    });
    const pickRandomAdTexture = () => {
      if (!adTextures.length) return null;
      return adTextures[Math.floor(Math.random() * adTextures.length)];
    };
    const billboardPresets = {
      mainBuilding: [
        {
          position: [2.0428859128498056, 69.88722776266901, 8.056453374139192],
          normal: [-0.00023369147324374683, 0, 0.9999999726941473],
          size: [12, 8],
        },
        {
          position: [2.3087598160279654, 46.103318853307954, 8.504906418294297],
          normal: [-0.00023582451225646317, 0, 0.9999999721933994],
          size: [12, 8],
        },
        {
          position: [2.41045710124347, 24.045807883416952, 8.504929551225743],
          normal: [-0.00036444841070960225, -6.60433924342156e-7, 0.9999999335884577],
          size: [12, 8],
        },
      ],
      leftBuildings: [
        {
          position: [-15.056403466747392, 29.23789326650744, 23.40251137291484],
          normal: [0.9126276024527601, 0, 0.408791951047629],
          size: [12, 8],
        },
        {
          position: [-15.011738772630748, 17.12096331734588, 23.302805535854496],
          normal: [0.9126276802430101, 0, 0.408791777380933],
          size: [12, 8],
        },
        {
          position: [-22.800053950054778, 29.735444831509763, 40.69021989834796],
          normal: [0.9126277308079128, 0, 0.40879166449476423],
          size: [12, 8],
        },
        {
          position: [-22.974481166476384, 19.903838863811885, 41.07963162454429],
          normal: [0.9126276533790899, 0.0000017074993234179821, 0.4087918373510657],
          size: [12, 8],
        },
        {
          position: [-23.055570046624897, 11.14170553178485, 41.26066808692684],
          normal: [0.9126279044781537, -6.759222262861331e-7, 0.40879127677502747],
          size: [12, 8],
        },
        {
          position: [-34.48729394929018, 29.854316392435802, 45.8129142735668],
          normal: [-0.4087894457824752, 0, 0.9126287246283984],
          size: [12, 8],
        },
        {
          position: [-30.881695358829905, 17.594376555409365, 54.43938455397204],
          normal: [0.9205258482250661, 0, 0.3906816642095231],
          size: [12, 8],
        },
        {
          position: [-36.42130721888894, 9.366701664837644, 56.489711334968106],
          normal: [-0.39073853490519694, 0, 0.9205017095802377],
          size: [12, 8],
        },
      ],
      rightBuildings: [
        {
          position: [22.168814896346262, 52.05899218198243, 20.33540111247777],
          normal: [-0.7612337685968078, 0, 0.6484775628716091],
          size: [12, 8],
        },
        {
          position: [30.11269623094846, 44.41319074958633, 29.660509368253326],
          normal: [-0.7612337685968079, 0, 0.6484775628716091],
          size: [12, 8],
        },
        {
          position: [21.35865642988687, 33.541054395561034, 19.462958864796743],
          normal: [-0.7611816880257628, 0.010052764267350892, 0.6484607773372539],
          size: [12, 8],
        },
        {
          position: [29.97378970573553, 33.45042310487312, 29.497450006257385],
          normal: [-0.7612337685968078, 0, 0.6484775628716091],
          size: [12, 8],
        },
        {
          position: [20.43974121199707, 22.65163358071342, 18.305693966534523],
          normal: [-0.7612299222474544, 0, 0.6484820779906986],
          size: [12, 8],
        },
        {
          position: [29.8274066474837, 22.51890142860623, 29.32561410402767],
          normal: [-0.7612337685968078, 0, 0.6484775628716091],
          size: [12, 8],
        },
        {
          position: [39.74486149235174, 30.253045963765306, 41.59306954421096],
          normal: [-0.7615865988406, 0, 0.6480631546897319],
          size: [12, 8],
        },
        {
          position: [39.77153823390384, 21.54589024295926, 41.62441934201969],
          normal: [-0.7615865988406, 0, 0.6480631546897319],
          size: [12, 8],
        },
        {
          position: [39.71595038878679, 12.418617236947405, 41.55909398353694],
          normal: [-0.7615865988406, 0, 0.6480631546897317],
          size: [12, 8],
        },
        {
          position: [51.65717853573406, 45.32236505392231, 28.914428694777015],
          normal: [-0.7475631606431303, 0, 0.6641907262595987],
          size: [12, 8],
        },
      ],
    };

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

    const addBillboardAt = (
      point: THREE.Vector3,
      normal: THREE.Vector3,
      size: [number, number] = [12, 8],
    ) => {
      const randomAd = pickRandomAdTexture();
      const mat = randomAd
        ? new THREE.MeshBasicMaterial({
            map: randomAd.texture,
            toneMapped: true,
            transparent: false,
            opacity: 1,
            side: THREE.DoubleSide,
          })
        : new THREE.MeshStandardMaterial({
            color: 0x1ad3ff,
            emissive: 0x0f7cb0,
            emissiveIntensity: 1.2,
            metalness: 0.25,
            roughness: 0.4,
            transparent: false,
            opacity: 1,
            side: THREE.DoubleSide,
          });
      billboardMaterials.push(mat);
      const geometry = new THREE.PlaneGeometry(size[0], size[1]);
      billboardGeometries.push(geometry);
      const board = new THREE.Mesh(geometry, mat);
      const offset = normal.clone().setLength(0.2);
      board.position.copy(point).add(offset);
      board.lookAt(board.position.clone().add(normal));
      board.castShadow = false;
      board.receiveShadow = true;
      board.userData.normal = normal.clone();
      board.userData.size = size;
      if (randomAd) {
        board.userData.ad = randomAd.ad;
      }
      scene.add(board);
      billboards.push(board);

    };

    // lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(5, 8, 6);
    scene.add(ambient, key);

    //#region Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(6, 4, 10);
    const cameraTarget = new THREE.Vector3(0, 1, 0);
    camera.lookAt(cameraTarget);
    const defaultCameraState = {
      position: camera.position.clone(),
      target: cameraTarget.clone(),
      near: camera.near,
      far: camera.far,
    };

    // Camera preset
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
        cameraTarget.copy(presetCamera.target);
        camera.near = presetCamera.near;
        camera.far = presetCamera.far;
        camera.updateProjectionMatrix();
        defaultCameraState.position.copy(camera.position);
        defaultCameraState.target.copy(cameraTarget);
        defaultCameraState.near = camera.near;
        defaultCameraState.far = camera.far;
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

      cameraTarget.copy(center);
      defaultCameraState.position.copy(camera.position);
      defaultCameraState.target.copy(cameraTarget);
      defaultCameraState.near = camera.near;
      defaultCameraState.far = camera.far;
    };

    // camera transition helper
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const startCameraTransition = ({
      position,
      target,
      near,
      far,
    }: {
      position: THREE.Vector3;
      target: THREE.Vector3;
      near: number;
      far: number;
    }) => {
      cameraTransition.active = true;
      cameraTransition.start = performance.now();
      cameraTransition.fromPos.copy(camera.position);
      cameraTransition.toPos.copy(position);
      cameraTransition.fromTarget.copy(cameraTarget);
      cameraTransition.toTarget.copy(target);
      cameraTransition.fromNear = camera.near;
      cameraTransition.toNear = near;
      cameraTransition.fromFar = camera.far;
      cameraTransition.toFar = far;
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let focusedBillboard: THREE.Mesh | null = null;
    const focusOnBillboard = (board: THREE.Mesh) => {
      const normal = (board.userData.normal as THREE.Vector3 | undefined)?.clone() ??
        new THREE.Vector3(0, 0, 1);
      const size = (board.userData.size as [number, number] | undefined) ?? [12, 8];
      const focusDistance = Math.max(size[0], size[1]) * 1.3;
      const target = board.position.clone();
      const cameraOffset = normal.setLength(focusDistance);
      startCameraTransition({
        position: target.clone().add(cameraOffset),
        target,
        near: 0.1,
        far: Math.max(focusDistance * 10, defaultCameraState.far),
      });
      focusedBillboard = board;
      const ad = board.userData.ad as
        | { title: string; description: string; link: string; slug: string }
        | undefined;
      setActiveAd(ad ?? null);
    };

    const restoreCamera = () => {
      focusedBillboard = null;
      startCameraTransition({
        position: defaultCameraState.position,
        target: defaultCameraState.target,
        near: defaultCameraState.near,
        far: defaultCameraState.far,
      });
      setActiveAd(null);
    };

    Object.values(billboardPresets).forEach((group) => {
      group.forEach(({ position, normal, size }) => {
        addBillboardAt(new THREE.Vector3(...position), new THREE.Vector3(...normal), size);
      });
    });
    const handlePointerDown = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(billboards, false);
      if (intersects.length) {
        const board = intersects[0].object as THREE.Mesh;
        if (focusedBillboard && board === focusedBillboard) {
          const ad = board.userData.ad as
            | { title: string; description: string; link: string; slug: string }
            | undefined;
          if (ad?.link) {
            if (ad.link === 'page') {
              router.push(`/projects/${ad.slug}`);
            } else {
              window.open(ad.link, '_blank');
            }
            return;
          }
        }
        focusOnBillboard(board);
        return;
      }
      if (focusedBillboard) {
        restoreCamera();
      }
    };
    //#endregion Camera

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
      if (cameraTransition.active) {
        const now = performance.now();
        const t = Math.min(1, (now - cameraTransition.start) / cameraTransition.duration);
        const eased = easeOutCubic(t);
        camera.position.lerpVectors(cameraTransition.fromPos, cameraTransition.toPos, eased);
        cameraTarget.lerpVectors(cameraTransition.fromTarget, cameraTransition.toTarget, eased);
        camera.near = THREE.MathUtils.lerp(
          cameraTransition.fromNear,
          cameraTransition.toNear,
          eased,
        );
        camera.far = THREE.MathUtils.lerp(
          cameraTransition.fromFar,
          cameraTransition.toFar,
          eased,
        );
        camera.updateProjectionMatrix();
        if (t >= 1) {
          cameraTransition.active = false;
        }
      }
      camera.lookAt(cameraTarget);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      billboards.forEach((board) => {
        scene.remove(board);
      });
      billboardGeometries.forEach((geometry) => geometry.dispose());
      billboardMaterials.forEach((mat) => mat.dispose());
      adTextures.forEach(({ texture }) => texture.dispose());
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
      {activeAd && (
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-10 rounded-2xl border border-white/20 bg-navy/80 p-4 backdrop-blur">
          <div className="text-white font-semibold text-sm uppercase tracking-[0.12em]">
            {activeAd.title}
          </div>
          <div className="mt-1 text-white/80 text-sm leading-snug">{activeAd.description}</div>
          <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-electric/80">
            {activeAd.link === 'page'
              ? activeAd.slug
              : activeAd.link}
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_18%_20%,rgba(255,100,3,0.24),transparent_35%),radial-gradient(circle_at_82%_12%,rgba(18,248,186,0.2),transparent_30%),radial-gradient(circle_at_65%_78%,rgba(255,225,0,0.14),transparent_36%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/10 via-transparent to-transparent" />
    </div>
  );
}
