// crystal.js — Three.js scene of a Silicon diamond-cubic lattice
// Cursor-parallax + auto-rotate + demo-triggered animation
// Module: imported via importmap pointing "three" -> unpkg

import * as THREE from "three";

const canvas = document.getElementById("crystal-canvas");
if (!canvas) {
  console.warn("[crystal] canvas not found");
} else {
  initScene(canvas);
}

function initScene(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // ───── Build Si diamond-cubic ─────
  // a₀ = 5.43 Å, 8 atoms / conventional cell
  const A = 1.0; // we'll scale the whole lattice instead of using real Å
  const basis = [
    [0, 0, 0],
    [0.5, 0.5, 0],
    [0, 0.5, 0.5],
    [0.5, 0, 0.5],
    [0.25, 0.25, 0.25],
    [0.75, 0.75, 0.25],
    [0.75, 0.25, 0.75],
    [0.25, 0.75, 0.75],
  ];

  // 3×3×3 supercell, centered
  const N = 1;
  const atoms = [];
  for (let i = -N; i <= N; i++) {
    for (let j = -N; j <= N; j++) {
      for (let k = -N; k <= N; k++) {
        for (const [bx, by, bz] of basis) {
          atoms.push([(i + bx) * A, (j + by) * A, (k + bz) * A]);
        }
      }
    }
  }
  // Center
  let cx = 0, cy = 0, cz = 0;
  for (const p of atoms) { cx += p[0]; cy += p[1]; cz += p[2]; }
  cx /= atoms.length; cy /= atoms.length; cz /= atoms.length;
  for (const p of atoms) { p[0] -= cx; p[1] -= cy; p[2] -= cz; }

  // ───── Atom mesh (instanced) ─────
  const atomGeo = new THREE.IcosahedronGeometry(0.085, 2);
  const atomMat = new THREE.MeshStandardMaterial({
    color: 0x6a8cff,
    emissive: 0x1e40af,
    emissiveIntensity: 0.5,
    metalness: 0.6,
    roughness: 0.3,
  });
  const atomMesh = new THREE.InstancedMesh(atomGeo, atomMat, atoms.length);
  const dummy = new THREE.Object3D();
  atoms.forEach((pos, i) => {
    dummy.position.set(pos[0], pos[1], pos[2]);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    atomMesh.setMatrixAt(i, dummy.matrix);
  });
  atomMesh.instanceMatrix.needsUpdate = true;

  // ───── Bonds (nearest neighbors) ─────
  const bondGroup = new THREE.Group();
  const bondMat = new THREE.MeshBasicMaterial({
    color: 0x7c9eff,
    transparent: true,
    opacity: 0.32,
  });
  const bondGeo = new THREE.CylinderGeometry(0.012, 0.012, 1, 6, 1);
  const cutoff = 0.5; // fractional, ≈ sqrt(3)/4 ≈ 0.433
  const upAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const a = atoms[i], b = atoms[j];
      const dx = a[0] - b[0], dy = a[1] - b[1], dz = a[2] - b[2];
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d < cutoff && d > 0.01) {
        const mid = new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
        const dir = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]).normalize();
        const bond = new THREE.Mesh(bondGeo, bondMat);
        bond.position.copy(mid);
        bond.scale.set(1, d, 1);
        bond.quaternion.setFromUnitVectors(upAxis, dir);
        bondGroup.add(bond);
      }
    }
  }

  // ───── Lattice group ─────
  const lattice = new THREE.Group();
  lattice.add(atomMesh);
  lattice.add(bondGroup);
  scene.add(lattice);

  // ───── Lighting ─────
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const dir = new THREE.DirectionalLight(0xffffff, 1.4);
  dir.position.set(5, 8, 6);
  scene.add(dir);

  const blueLight = new THREE.PointLight(0x4577ff, 6, 14);
  blueLight.position.set(-3, 1.5, 3);
  scene.add(blueLight);

  const amberLight = new THREE.PointLight(0xf59e0b, 3.5, 12);
  amberLight.position.set(3, -1.5, 3);
  scene.add(amberLight);

  // ───── Camera ─────
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  // ───── Resize handling ─────
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  // ───── Cursor parallax (damped) ─────
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // ───── Demo-driven animations ─────
  let pulse = 0;          // 0..1 envelope after a "step" event
  let relaxProgress = 0;  // 0..1, lattice shrinks slightly while running
  let computeAura = 0;    // 0..1, color flash while computing

  window.addEventListener("crystal:pulse", () => { pulse = 1; });
  window.addEventListener("crystal:relax", () => { relaxProgress = 1; });
  window.addEventListener("crystal:compute", () => { computeAura = 1; });
  window.addEventListener("crystal:reset", () => {
    pulse = 0;
    relaxProgress = 0;
    computeAura = 0;
  });

  // ───── Main render loop ─────
  let lastT = 0;
  function tick(t) {
    const dt = Math.min((t - lastT) / 1000, 0.05);
    lastT = t;

    // Damped parallax
    cur.x += (target.x - cur.x) * 0.06;
    cur.y += (target.y - cur.y) * 0.06;

    // Auto-rotate + parallax
    lattice.rotation.y = t * 0.00015 + cur.x * 0.35;
    lattice.rotation.x = Math.sin(t * 0.0001) * 0.15 + (-cur.y) * 0.22;

    // Pulse decay (atom emissive flash)
    if (pulse > 0) {
      pulse = Math.max(0, pulse - dt * 1.4);
      atomMat.emissiveIntensity = 0.5 + pulse * 1.4;
      bondMat.opacity = 0.32 + pulse * 0.5;
    }

    // Relax: lattice shrinks 2.5% during "computation"
    if (relaxProgress > 0) {
      relaxProgress = Math.max(0, relaxProgress - dt * 0.18);
      const shrink = 1 - Math.sin((1 - relaxProgress) * Math.PI) * 0.025;
      lattice.scale.setScalar(shrink);
    } else if (lattice.scale.x !== 1) {
      lattice.scale.setScalar(1);
    }

    // Compute aura: amber light pulses
    if (computeAura > 0) {
      computeAura = Math.max(0, computeAura - dt * 0.4);
      amberLight.intensity = 3.5 + Math.sin(t * 0.012) * 2 * computeAura;
    } else if (amberLight.intensity !== 3.5) {
      amberLight.intensity = 3.5;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
