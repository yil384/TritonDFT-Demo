// demo.js — Interactive hero prompt simulator
// Drives both the on-screen agent log and the crystal 3D animation
// (via window.dispatchEvent of "crystal:pulse" / ":relax" / ":compute" / ":reset")

(function () {
  "use strict";

  const input = document.getElementById("demo-input");
  const runBtn = document.getElementById("demo-run");
  const output = document.getElementById("demo-output");
  const suggestions = document.getElementById("demo-suggestions");
  if (!input || !runBtn || !output) return;

  // ───── Canned response templates ─────
  // Each entry generates an array of {tag, text, delay (ms), crystalEvent (optional)}.
  const TEMPLATES = {
    Si: (mat) => [
      { tag: "planner", text: `Parsing intent → <span class="val">${mat}</span>, vc-relax + LDA`, delay: 200 },
      { tag: "planner", text: `Workflow plan: <span class="val">vc-relax</span> → <span class="val">scf</span> → <span class="val">bands</span>`, delay: 500, ev: "crystal:pulse" },
      { tag: "executor", text: `Configured: <span class="val">ecutwfc=30 Ry</span>, k-grid <span class="val">8×8×8</span>`, delay: 500 },
      { tag: "executor", text: `Generating <code>pw.x</code> input ... <span class="ok">✓</span>`, delay: 350 },
      { tag: "executor", text: `Submitting to HPC: <span class="val">12 cores</span> ...`, delay: 600, ev: "crystal:compute" },
      { tag: "executor", text: `Iter 1 ▸ E = <span class="val">-185.123 Ry</span>`, delay: 650, ev: "crystal:relax" },
      { tag: "executor", text: `Iter 7 ▸ E = <span class="val">-185.231 Ry</span> (Δ=4e-9) <span class="ok">✓ converged</span>`, delay: 700, ev: "crystal:pulse" },
      { tag: "analyzer", text: `Lattice constant a₀ = <span class="val">5.39 Å</span> (target 5.43)`, delay: 500 },
      { tag: "analyzer", text: `Bulk modulus B = <span class="val">97.4 GPa</span>`, delay: 500 },
      { tag: "analyzer", text: `Band gap (NSCF) = <span class="val">0.62 eV</span> <span class="ok">✓ indirect</span>`, delay: 600, ev: "crystal:pulse" },
      { tag: "refiner", text: `Pareto check: ecutwfc=30 Ry is optimal (cost-accuracy)`, delay: 500 },
      { tag: "system", text: `Done in <span class="val">47s</span> &middot; cost ≈ <span class="val">$0.04</span>`, delay: 500 },
    ],
    Graphene: (mat) => [
      { tag: "planner", text: `Parsing intent → <span class="val">${mat}</span>, 2D system + PBE`, delay: 200 },
      { tag: "planner", text: `Detected periodicity: <span class="val">2D</span>, vacuum gap 15 Å`, delay: 500, ev: "crystal:pulse" },
      { tag: "executor", text: `Configured: <span class="val">ecutwfc=60 Ry</span>, k-grid <span class="val">16×16×1</span>`, delay: 500 },
      { tag: "executor", text: `Submitting scf ...`, delay: 500, ev: "crystal:compute" },
      { tag: "executor", text: `scf converged in <span class="val">11 iter</span> <span class="ok">✓</span>`, delay: 650, ev: "crystal:pulse" },
      { tag: "analyzer", text: `Dirac point at <span class="val">K</span>, Fermi velocity ≈ <span class="val">10⁶ m/s</span>`, delay: 600 },
      { tag: "analyzer", text: `Band gap = <span class="val">0 eV</span> (semimetal) <span class="ok">✓</span>`, delay: 500 },
      { tag: "system", text: `Done in <span class="val">22s</span> &middot; cost ≈ <span class="val">$0.02</span>`, delay: 500 },
    ],
    Fe: (mat) => [
      { tag: "planner", text: `Parsing intent → <span class="val">${mat}</span> bcc, magnetic`, delay: 200 },
      { tag: "planner", text: `Spin-polarized scf + Hubbard U on 3d`, delay: 500, ev: "crystal:pulse" },
      { tag: "executor", text: `Configured: <span class="val">U=4.5 eV</span>, ecutwfc=50 Ry`, delay: 500 },
      { tag: "executor", text: `Submitting LDA+U ...`, delay: 500, ev: "crystal:compute" },
      { tag: "executor", text: `Convergence reached <span class="ok">✓</span>`, delay: 700, ev: "crystal:pulse" },
      { tag: "analyzer", text: `Magnetic moment μ = <span class="val">2.21 μ_B</span> (exp: 2.22)`, delay: 600 },
      { tag: "analyzer", text: `Lattice a₀ = <span class="val">2.87 Å</span> ✓`, delay: 500 },
      { tag: "system", text: `Done in <span class="val">53s</span> &middot; cost ≈ <span class="val">$0.05</span>`, delay: 500 },
    ],
    TiO2: (mat) => [
      { tag: "planner", text: `Parsing intent → <span class="val">${mat}</span> rutile, band structure`, delay: 200 },
      { tag: "planner", text: `Plan: scf → bands along Γ–X–M–R–Γ`, delay: 500, ev: "crystal:pulse" },
      { tag: "executor", text: `Configured: ecutwfc=50 Ry, 6×6×8 k-grid`, delay: 500 },
      { tag: "executor", text: `Running scf ... <span class="ok">✓</span>`, delay: 600, ev: "crystal:compute" },
      { tag: "executor", text: `Running bands along high-symmetry path ...`, delay: 700, ev: "crystal:relax" },
      { tag: "analyzer", text: `Band gap = <span class="val">1.92 eV</span> (DFT/PBE underestimates exp 3.0 eV)`, delay: 700, ev: "crystal:pulse" },
      { tag: "refiner", text: `Suggest: try <span class="val">HSE06</span> hybrid for accurate gap`, delay: 500 },
      { tag: "system", text: `Done in <span class="val">68s</span> &middot; cost ≈ <span class="val">$0.07</span>`, delay: 500 },
    ],
  };

  function detectMaterial(text) {
    const t = text.toLowerCase();
    if (/graph(e|en|ene)/.test(t)) return ["Graphene", "Graphene"];
    if (/fe\b|iron/.test(t)) return ["Fe", "Iron (bcc, magnetic)"];
    if (/tio2|titanium\s*dioxide|rutile|anatase/.test(t)) return ["TiO2", "TiO₂ (rutile)"];
    if (/\bsi\b|silicon|diamond cubic/.test(t)) return ["Si", "Silicon (diamond cubic)"];
    return ["Si", "Silicon (diamond cubic)"]; // default
  }

  // ───── Render a single output line ─────
  function appendLine(line) {
    const div = document.createElement("div");
    div.className = `demo-line ${line.tag}`;
    const tagLabel = {
      planner: "Planner",
      executor: "Executor",
      analyzer: "Analyzer",
      refiner: "Refiner",
      system: "System",
    }[line.tag] || line.tag;
    div.innerHTML = `<span class="tag">[${tagLabel}]</span><span class="text">▸ ${line.text}</span>`;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
    if (line.ev) window.dispatchEvent(new CustomEvent(line.ev));
  }

  // ───── Run a sequence ─────
  let running = false;
  async function runSequence(materialKey, materialDisplay) {
    if (running) return;
    running = true;
    runBtn.disabled = true;
    runBtn.textContent = "Running…";

    output.innerHTML = "";
    output.classList.add("active");

    const tmpl = TEMPLATES[materialKey] || TEMPLATES.Si;
    const steps = tmpl(materialDisplay);

    for (const step of steps) {
      await sleep(step.delay);
      appendLine(step);
    }

    // Final CTA card
    await sleep(400);
    const final = document.createElement("div");
    final.className = "demo-final";
    final.innerHTML = `
      <span><span class="ok" style="color:#10b981">✓</span> This is a simulation.
      <strong>Run real DFT for free</strong> on the live chat →</span>
      <a href="https://chat.tritondft.com" target="_blank" rel="noopener">chat.tritondft.com →</a>
    `;
    output.appendChild(final);
    output.scrollTop = output.scrollHeight;

    runBtn.disabled = false;
    runBtn.textContent = "▶ Run again";
    running = false;
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  // ───── Event wiring ─────
  function handleRun() {
    const text = input.value.trim() || "Silicon, vc-relax with LDA";
    if (!input.value.trim()) input.value = "Si diamond cubic, vc-relax with LDA, ecutwfc 30 Ry";
    const [key, display] = detectMaterial(text);
    window.dispatchEvent(new CustomEvent("crystal:reset"));
    runSequence(key, display);
  }

  runBtn.addEventListener("click", handleRun);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRun();
    }
  });

  if (suggestions) {
    suggestions.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-prompt]");
      if (!btn) return;
      input.value = btn.dataset.prompt;
      input.focus();
      handleRun();
    });
  }
})();
