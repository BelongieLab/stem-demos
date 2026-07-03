<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kinematic Canvas Engine: Pulleys</title>
    
    <!-- Tailwind CSS for rapid UI styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Three.js and OrbitControls -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
        
        body {
            margin: 0;
            overflow: hidden;
            font-family: 'Space Grotesk', sans-serif;
            background-color: #020617;
            color: white;
        }

        #canvas-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 1;
        }

        /* UI Overlays */
        .glass-panel {
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
            z-index: 10;
            pointer-events: auto;
        }

        .ui-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none; /* Let clicks pass through to 3D canvas unless on a panel */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        /* Custom Slider Styling */
        input[type=range] {
            -webkit-appearance: none;
            width: 100%;
            background: transparent;
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            margin-top: -10px;
            box-shadow: 0 0 15px rgba(255,255,255,0.8);
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 6px;
            cursor: pointer;
            background: rgba(255,255,255,0.2);
            border-radius: 3px;
        }

        /* Floating 3D Labels */
        .floating-label {
            position: absolute;
            transform: translate(-50%, -50%);
            color: white;
            font-weight: bold;
            font-size: 14px;
            text-shadow: 0px 2px 4px rgba(0,0,0,1);
            pointer-events: none;
            z-index: 5;
            text-align: center;
        }

        /* Scrollbar hiding for clean UI */
        ::-webkit-scrollbar { display: none; }
    </style>
</head>
<body>

    <!-- 3D Viewport -->
    <div id="canvas-container"></div>

    <!-- 3D World Floating Labels (Updated via JS) -->
    <div id="label-sys1" class="floating-label text-rose-500">Fixed<br>MA = 1</div>
    <div id="label-sys2" class="floating-label text-yellow-400">Movable<br>MA = 2</div>
    <div id="label-sys3" class="floating-label text-cyan-400">Block & Tackle<br>MA = 4</div>
    <div id="label-hand1" class="floating-label">Pull Here</div>
    <div id="label-hand2" class="floating-label">Pull Here</div>
    <div id="label-hand3" class="floating-label">Pull Here</div>

    <!-- 2D UI Overlay -->
    <div class="ui-layer p-4 md:p-8">
        
        <!-- Top Section: Header & Telemetry -->
        <div class="flex flex-col lg:flex-row justify-between items-start gap-4">
            
            <!-- Explainer Panel -->
            <div class="glass-panel p-6 rounded-2xl w-full lg:w-1/3 max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center cursor-pointer mb-2" id="explainer-toggle">
                    <h1 class="text-2xl md:text-3xl font-bold tracking-tight m-0">The Magic of Pulleys</h1>
                    <svg id="explainer-icon" class="w-6 h-6 transform transition-transform text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                </div>
                
                <div id="explainer-content" class="transition-all duration-300">
                    <p class="text-slate-300 text-sm mb-4 mt-2">
                        Imagine lifting a heavy 120 kg treasure chest. Hard, right? Pulleys act like physical cheat codes. They let you trade <strong>distance</strong> to gain <strong>power</strong>!
                    </p>
                    
                    <div class="space-y-4">
                        <div class="border-l-4 border-rose-500 pl-3">
                            <h2 class="font-bold text-rose-400">1. Fixed Pulley (Red)</h2>
                            <p class="text-xs text-slate-400">The wheel doesn't move. You pull down, the box goes up. It's not lighter, but it's easier to use your body weight to pull down. <strong>Effort = 120kg.</strong></p>
                        </div>
                        <div class="border-l-4 border-yellow-400 pl-3">
                            <h2 class="font-bold text-yellow-400">2. Movable Pulley (Yellow)</h2>
                            <p class="text-xs text-slate-400">One wheel moves with the load. The rope pulls up on the weight <em>twice</em>. This cuts the effort in half! But you must pull twice as much rope. <strong>Effort = 60kg.</strong></p>
                        </div>
                        <div class="border-l-4 border-cyan-400 pl-3">
                            <h2 class="font-bold text-cyan-400">3. Block & Tackle (Cyan)</h2>
                            <p class="text-xs text-slate-400">Four ropes support the load. You only need 1/4th the strength to lift it! You can lift 120kg with just a 30kg pull. <strong>Effort = 30kg.</strong></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Live Telemetry Dashboard -->
            <div class="glass-panel p-6 rounded-2xl w-full lg:w-auto min-w-[300px]">
                <div class="flex justify-between items-center cursor-pointer mb-4" id="telemetry-toggle">
                    <h2 class="text-sm uppercase tracking-widest text-slate-400 m-0">Live Telemetry</h2>
                    <div class="flex items-center gap-3">
                        <span class="text-emerald-400 text-xs font-bold tracking-wider">● ONLINE</span>
                        <svg id="telemetry-icon" class="w-5 h-5 transform transition-transform text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                    </div>
                </div>
                
                <div id="telemetry-content" class="transition-all duration-300">
                    <div class="grid grid-cols-3 gap-6 text-center">
                        
                        <!-- Sys 1 Stats -->
                        <div class="flex flex-col gap-1">
                            <div class="w-full h-1 bg-rose-500 rounded-full mb-2"></div>
                            <span class="text-xs text-slate-400">Your Pull Force</span>
                            <span class="text-xl font-bold text-white">1200 N</span>
                            <span class="text-xs text-slate-400 mt-2">Rope Pulled</span>
                            <span id="tel-rope-1" class="text-lg font-mono text-rose-400">0.0 m</span>
                            <span class="text-xs text-slate-400 mt-2">Load Lifted</span>
                            <span id="tel-load-1" class="text-lg font-mono text-rose-400">0.0 m</span>
                        </div>

                        <!-- Sys 2 Stats -->
                        <div class="flex flex-col gap-1">
                            <div class="w-full h-1 bg-yellow-400 rounded-full mb-2"></div>
                            <span class="text-xs text-slate-400">Your Pull Force</span>
                            <span class="text-xl font-bold text-white">600 N</span>
                            <span class="text-xs text-slate-400 mt-2">Rope Pulled</span>
                            <span id="tel-rope-2" class="text-lg font-mono text-yellow-400">0.0 m</span>
                            <span class="text-xs text-slate-400 mt-2">Load Lifted</span>
                            <span id="tel-load-2" class="text-lg font-mono text-yellow-400">0.0 m</span>
                        </div>

                        <!-- Sys 3 Stats -->
                        <div class="flex flex-col gap-1">
                            <div class="w-full h-1 bg-cyan-400 rounded-full mb-2"></div>
                            <span class="text-xs text-slate-400">Your Pull Force</span>
                            <span class="text-xl font-bold text-white">300 N</span>
                            <span class="text-xs text-slate-400 mt-2">Rope Pulled</span>
                            <span id="tel-rope-3" class="text-lg font-mono text-cyan-400">0.0 m</span>
                            <span class="text-xs text-slate-400 mt-2">Load Lifted</span>
                            <span id="tel-load-3" class="text-lg font-mono text-cyan-400">0.0 m</span>
                        </div>
                    </div>

                    <div class="mt-6 pt-4 border-t border-slate-700 flex justify-between items-end">
                        <div>
                            <span class="text-xs text-slate-400 block mb-1">Golden Rule of Physics: Work = Force × Distance</span>
                            <span class="text-sm font-bold text-white">Total Work Done:</span>
                        </div>
                        <span id="tel-work" class="text-2xl font-mono text-emerald-400 tracking-wider">0 J</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Section: Interactive Controls -->
        <div class="flex justify-center mt-auto w-full max-w-4xl mx-auto pb-4">
            <div class="glass-panel p-6 rounded-2xl w-full flex flex-col sm:flex-row items-center gap-6">
                
                <button id="auto-btn" class="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg font-semibold whitespace-nowrap border border-white/20 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    Auto-Pull
                </button>

                <div class="flex-grow w-full">
                    <div class="flex justify-between text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                        <span>Rest</span>
                        <span>Pull the rope!</span>
                        <span>Max Lift</span>
                    </div>
                    <input type="range" id="pull-slider" min="0" max="8" step="0.01" value="0">
                </div>
            </div>
        </div>

    </div>

    <!-- Application Logic -->
    <script>
        // --- 1. GLOBAL VARIABLES & CONSTANTS ---
        const P_RADIUS = 0.8;      // Radius of the pulleys
        const P_WIDTH = 0.4;       // Thickness of the pulleys
        const ROPE_RAD = 0.06;     // Thickness of the ropes
        const LOAD_WEIGHT = 1200;  // Newtons (approx 120 kg)
        
        let targetPull = 0;
        let currentPull = 0;
        let isAutoPlaying = false;
        let autoTime = 0;

        // --- 2. THREE.JS INITIALIZATION ---
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020617, 0.015); // Match background
        
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 28);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 5, 0);
        controls.maxPolarAngle = Math.PI / 2 + 0.2; // Don't allow looking entirely from below
        controls.minDistance = 10;
        controls.maxDistance = 50;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(10, 20, 15);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.left = -20;
        dirLight.shadow.camera.right = 20;
        dirLight.shadow.camera.top = 20;
        dirLight.shadow.camera.bottom = -10;
        scene.add(dirLight);

        const rimLight = new THREE.PointLight(0x4488ff, 2, 50);
        rimLight.position.set(0, -5, -10);
        scene.add(rimLight);

        // --- 3. PROCEDURAL GEOMETRY GENERATORS ---

        // Material Palette
        const matMetal = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.8, roughness: 0.3 });
        const matRope = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.9, metalness: 0.1 });
        const matWood = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.1, roughness: 0.8 }); // Dark structural beam

        // Creates a highly detailed grooved pulley wheel using LatheGeometry
        function createPulley(colorHex) {
            const points = [];
            const r = P_RADIUS;
            const w = P_WIDTH;
            
            // Generate cross-section profile for the pulley (lying flat on X-axis)
            points.push(new THREE.Vector2(r * 0.2, -w/2));      // Bottom hub
            points.push(new THREE.Vector2(r * 0.9, -w/2));      // Bottom outer flange
            points.push(new THREE.Vector2(r, -w * 0.3));        // Flange lip
            points.push(new THREE.Vector2(r * 0.8, 0));         // Center Groove (Rope sits here)
            points.push(new THREE.Vector2(r, w * 0.3));         // Top flange lip
            points.push(new THREE.Vector2(r * 0.9, w/2));       // Top outer flange
            points.push(new THREE.Vector2(r * 0.2, w/2));       // Top hub
            points.push(new THREE.Vector2(r * 0.2, -w/2));      // Close shape

            const geo = new THREE.LatheGeometry(points, 32);
            // Stand it up so it rotates around the Z-axis
            geo.rotateX(Math.PI / 2);
            
            const mesh = new THREE.Mesh(geo, matMetal);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Add a neon visual marker to make rotation strictly obvious
            const markerGeo = new THREE.SphereGeometry(r * 0.15, 16, 16);
            const markerMat = new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 1 });
            const marker = new THREE.Mesh(markerGeo, markerMat);
            marker.position.set(r * 0.6, 0, w/2);
            mesh.add(marker);
            
            // Add a central axle peg
            const axleGeo = new THREE.CylinderGeometry(r * 0.25, r * 0.25, w * 1.2, 16);
            axleGeo.rotateX(Math.PI / 2);
            const axle = new THREE.Mesh(axleGeo, matMetal);
            mesh.add(axle);

            return mesh;
        }

        function createWeight(colorHex, labelText) {
            const group = new THREE.Group();
            
            // The main iron block
            const boxGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
            const boxMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.6, roughness: 0.7 });
            const box = new THREE.Mesh(boxGeo, boxMat);
            box.castShadow = true;
            box.receiveShadow = true;
            group.add(box);

            // Colored glowing strip indicating the system
            const stripGeo = new THREE.BoxGeometry(2.6, 0.5, 2.6);
            const stripMat = new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 0.5 });
            const strip = new THREE.Mesh(stripGeo, stripMat);
            group.add(strip);

            // Hook on top
            const hookGeo = new THREE.TorusGeometry(0.3, 0.1, 8, 16, Math.PI);
            const hook = new THREE.Mesh(hookGeo, matMetal);
            hook.position.set(0, 1.25, 0);
            group.add(hook);

            return group;
        }

        function createHandHandle() {
            const group = new THREE.Group();
            const handleGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 16);
            handleGeo.rotateZ(Math.PI / 2);
            const handleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x444444 });
            const handle = new THREE.Mesh(handleGeo, handleMat);
            group.add(handle);
            return group;
        }

        // Helper to stretch a cylinder between two 3D coordinates (used for straight ropes)
        function updateRopeSegment(mesh, ptA, ptB) {
            const distance = ptA.distanceTo(ptB);
            mesh.scale.set(1, distance, 1);
            mesh.position.copy(ptA).lerp(ptB, 0.5);
            mesh.lookAt(ptB);
            mesh.rotateX(Math.PI / 2); // Align cylinder to lookAt axis
        }

        // Helper to create a straight rope mesh
        function createStraightRope() {
            const geo = new THREE.CylinderGeometry(ROPE_RAD, ROPE_RAD, 1, 8);
            // Default cylinder is along Y. We'll handle rotation in updateRopeSegment
            const mesh = new THREE.Mesh(geo, matRope);
            mesh.castShadow = true;
            scene.add(mesh);
            return mesh;
        }

        // Helper to create a half-torus wrap around a pulley
        function createRopeWrap(pulleyGroup, wrapAngleStart, isTop) {
            // Torus represents rope sitting in the groove
            const geo = new THREE.TorusGeometry(P_RADIUS, ROPE_RAD, 8, 32, Math.PI);
            const mesh = new THREE.Mesh(geo, matRope);
            mesh.castShadow = true;
            // Align to pulley XY plane
            // By default torus is in XY plane. 
            // Math.PI arc starts from X axis and goes CCW.
            // If top wrap, we want it over the top: arc from X=R to X=-R.
            if (!isTop) {
                mesh.rotation.z = Math.PI; // flip to bottom
            }
            pulleyGroup.add(mesh);
            return mesh;
        }

        // --- 4. BUILD THE ENVIRONMENT ---
        
        // Ceiling Beam
        const beamGeo = new THREE.BoxGeometry(40, 1, 2);
        const beam = new THREE.Mesh(beamGeo, matWood);
        beam.position.set(0, 10.5, 0);
        beam.castShadow = true;
        beam.receiveShadow = true;
        scene.add(beam);
        
        // Floor Grid
        const grid = new THREE.GridHelper(50, 25, 0x334155, 0x1e293b);
        grid.position.y = -1;
        scene.add(grid);

        // --- 5. BUILD PULLEY SYSTEMS ---
        
        // Data Structures to hold kinematic refs
        const sys1 = { color: 0xf43f5e }; // Rose / Red
        const sys2 = { color: 0xfacc15 }; // Yellow
        const sys3 = { color: 0x22d3ee }; // Cyan

        // === SYSTEM 1: FIXED (MA = 1) ===
        const offset1 = -10;
        sys1.p1 = createPulley(sys1.color);
        sys1.p1.position.set(offset1, 10, 0);
        scene.add(sys1.p1);
        createRopeWrap(sys1.p1, 0, true); // Wrap top

        sys1.weight = createWeight(sys1.color, "120 kg");
        scene.add(sys1.weight);
        
        sys1.hand = createHandHandle();
        scene.add(sys1.hand);

        sys1.rope1 = createStraightRope(); // Weight to P1 Left
        sys1.rope2 = createStraightRope(); // P1 Right to Hand

        // === SYSTEM 2: MOVABLE (MA = 2) ===
        const offset2 = 0;
        sys2.p1 = createPulley(sys2.color); // Fixed Upper
        sys2.p1.position.set(offset2, 10, 0);
        scene.add(sys2.p1);
        createRopeWrap(sys2.p1, 0, true);

        sys2.p2Grp = new THREE.Group(); // Movable Lower
        scene.add(sys2.p2Grp);
        sys2.p2 = createPulley(sys2.color);
        sys2.p2Grp.add(sys2.p2);
        createRopeWrap(sys2.p2Grp, 0, false); // Wrap bottom
        
        // Connect weight to movable pulley
        sys2.weight = createWeight(sys2.color, "120 kg");
        scene.add(sys2.weight);
        
        sys2.hand = createHandHandle();
        scene.add(sys2.hand);

        sys2.rope1 = createStraightRope(); // Hand to P1 Left
        sys2.rope2 = createStraightRope(); // P1 Right to P2 Left
        sys2.rope3 = createStraightRope(); // P2 Right to Ceiling Anchor

        // Ceiling anchor block
        const anchorGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const anchorMesh = new THREE.Mesh(anchorGeo, matMetal);
        anchorMesh.position.set(offset2 + P_RADIUS * 3, 10.25, 0);
        scene.add(anchorMesh);


        // === SYSTEM 3: BLOCK & TACKLE (MA = 4) ===
        const offset3 = 10;
        // Upper Block (Fixed)
        sys3.p1_u = createPulley(sys3.color);
        sys3.p1_u.position.set(offset3, 10, 0);
        createRopeWrap(sys3.p1_u, 0, true);
        scene.add(sys3.p1_u);

        sys3.p2_u = createPulley(sys3.color);
        sys3.p2_u.position.set(offset3, 10, -P_WIDTH * 1.5); // Offset in Z
        createRopeWrap(sys3.p2_u, 0, true);
        scene.add(sys3.p2_u);

        // Lower Block (Movable)
        sys3.lowerGrp = new THREE.Group();
        scene.add(sys3.lowerGrp);
        
        sys3.p1_l = createPulley(sys3.color);
        sys3.p1_l.position.set(0, 0, -P_WIDTH * 0.75); // Staggered in Z for realistic rope diagonal
        createRopeWrap(sys3.lowerGrp, 0, false).position.z = -P_WIDTH * 0.75;
        sys3.lowerGrp.add(sys3.p1_l);

        sys3.p2_l = createPulley(sys3.color);
        sys3.p2_l.position.set(0, 0, -P_WIDTH * 2.25);
        createRopeWrap(sys3.lowerGrp, 0, false).position.z = -P_WIDTH * 2.25;
        sys3.lowerGrp.add(sys3.p2_l);

        sys3.weight = createWeight(sys3.color, "120 kg");
        scene.add(sys3.weight);

        sys3.hand = createHandHandle();
        scene.add(sys3.hand);

        // Ropes for Sys 3 (MA=4 means 4 strands supporting load)
        sys3.r1 = createStraightRope(); // Hand to P1_U Left
        sys3.r2 = createStraightRope(); // P1_U Right to P1_L Right
        sys3.r3 = createStraightRope(); // P1_L Left to P2_U Left
        sys3.r4 = createStraightRope(); // P2_U Right to P2_L Right
        sys3.r5 = createStraightRope(); // P2_L Left to Anchor

        // Anchor on upper block
        const anchor3 = new THREE.Mesh(anchorGeo, matMetal);
        anchor3.position.set(offset3 - P_RADIUS, 10, -P_WIDTH * 2.25);
        scene.add(anchor3);


        // --- 6. KINEMATIC UPDATE ENGINE ---
        // This is the core logic teaching the math. It calculates absolute positions
        // based purely on a single input variable: "d" (amount of rope pulled by user)

        const vA = new THREE.Vector3();
        const vB = new THREE.Vector3();

        function updateKinematics(d) {
            
            // === SYS 1: Fixed (MA=1) ===
            // Math: Weight rises exactly 'd'.
            let w1_y = Math.min(1 + d, 8); // Start at Y=1, cap at 8 to prevent collision
            let real_d_1 = w1_y - 1; // Actual pull achieved
            
            sys1.weight.position.set(offset1 - P_RADIUS, w1_y, 0);
            sys1.hand.position.set(offset1 + P_RADIUS, 8 - real_d_1, 0);
            
            // Pulley Rotation = Arc Length / Radius
            sys1.p1.rotation.z = real_d_1 / P_RADIUS;

            // Ropes
            vA.set(offset1 - P_RADIUS, 10, 0); // P1 Left
            updateRopeSegment(sys1.rope1, vA, sys1.weight.position.clone().add(new THREE.Vector3(0,1.5,0)));
            
            vB.set(offset1 + P_RADIUS, 10, 0); // P1 Right
            updateRopeSegment(sys1.rope2, vB, sys1.hand.position);


            // === SYS 2: Movable (MA=2) ===
            // Math: To pull 'd' rope, weight rises 'd/2'. 
            let w2_y = 1 + (d / 2);
            let real_d_2 = d;
            
            sys2.p2Grp.position.set(offset2 + P_RADIUS*2, w2_y + 1.5, 0);
            sys2.weight.position.set(offset2 + P_RADIUS*2, w2_y, 0);
            sys2.hand.position.set(offset2 - P_RADIUS, 8 - real_d_2, 0);

            // Rotations
            // P2 (Lower) rolls up the right rope. Rope speed relative to center is d/2.
            sys2.p2.rotation.z = (real_d_2 / 2) / P_RADIUS;
            // P1 (Upper) must pull the full 'd' distance.
            sys2.p1.rotation.z = real_d_2 / P_RADIUS;

            // Ropes
            vA.set(offset2 - P_RADIUS, 10, 0); // P1 Left
            updateRopeSegment(sys2.rope1, vA, sys2.hand.position);
            
            vB.set(offset2 + P_RADIUS, 10, 0); // P1 Right
            const vC = new THREE.Vector3(offset2 + P_RADIUS, sys2.p2Grp.position.y, 0); // P2 Left
            updateRopeSegment(sys2.rope2, vB, vC);
            
            const vD = new THREE.Vector3(offset2 + P_RADIUS*3, sys2.p2Grp.position.y, 0); // P2 Right
            const vE = new THREE.Vector3(offset2 + P_RADIUS*3, 10, 0); // Ceiling Anchor
            updateRopeSegment(sys2.rope3, vD, vE);


            // === SYS 3: Block & Tackle (MA=4) ===
            // Math: Weight rises 'd/4'.
            let w3_y = 1 + (d / 4);
            let real_d_3 = d;
            
            sys3.lowerGrp.position.set(offset3, w3_y + 1.5, 0);
            sys3.weight.position.set(offset3, w3_y, -P_WIDTH * 1.5 / 2); // Center weight between pulleys
            sys3.hand.position.set(offset3 - P_RADIUS, 8 - real_d_3, 0);

            // Rotations based on rope speed differential
            // Lowest strand speed = V = d/4. 
            let V = real_d_3 / 4;
            sys3.p2_l.rotation.z = V / P_RADIUS;
            sys3.p2_u.rotation.z = (2*V) / P_RADIUS;
            sys3.p1_l.rotation.z = (3*V) / P_RADIUS;
            sys3.p1_u.rotation.z = (4*V) / P_RADIUS;

            // Ropes (Accounting for Z staggering)
            const z_u1 = 0;
            const z_l1 = -P_WIDTH * 0.75;
            const z_u2 = -P_WIDTH * 1.5;
            const z_l2 = -P_WIDTH * 2.25;

            // Hand to P1_U L
            updateRopeSegment(sys3.r1, sys3.hand.position, new THREE.Vector3(offset3 - P_RADIUS, 10, z_u1));
            // P1_U R to P1_L R (diagonal Z drop)
            updateRopeSegment(sys3.r2, new THREE.Vector3(offset3 + P_RADIUS, 10, z_u1), new THREE.Vector3(offset3 + P_RADIUS, sys3.lowerGrp.position.y, z_l1));
            // P1_L L to P2_U L (diagonal Z rise)
            updateRopeSegment(sys3.r3, new THREE.Vector3(offset3 - P_RADIUS, sys3.lowerGrp.position.y, z_l1), new THREE.Vector3(offset3 - P_RADIUS, 10, z_u2));
            // P2_U R to P2_L R (diagonal Z drop)
            updateRopeSegment(sys3.r4, new THREE.Vector3(offset3 + P_RADIUS, 10, z_u2), new THREE.Vector3(offset3 + P_RADIUS, sys3.lowerGrp.position.y, z_l2));
            // P2_L L to Anchor (straight rise)
            updateRopeSegment(sys3.r5, new THREE.Vector3(offset3 - P_RADIUS, sys3.lowerGrp.position.y, z_l2), anchor3.position);

            // Update DOM Labels Position
            updateLabel(sys1.weight.position.clone().add(new THREE.Vector3(0,-2,0)), document.getElementById('label-sys1'));
            updateLabel(sys2.weight.position.clone().add(new THREE.Vector3(0,-2,0)), document.getElementById('label-sys2'));
            updateLabel(sys3.weight.position.clone().add(new THREE.Vector3(0,-2,0)), document.getElementById('label-sys3'));
            
            updateLabel(sys1.hand.position.clone().add(new THREE.Vector3(0,-1,0)), document.getElementById('label-hand1'));
            updateLabel(sys2.hand.position.clone().add(new THREE.Vector3(0,-1,0)), document.getElementById('label-hand2'));
            updateLabel(sys3.hand.position.clone().add(new THREE.Vector3(0,-1,0)), document.getElementById('label-hand3'));

            // Update Telemetry Panel
            document.getElementById('tel-rope-1').innerText = real_d_1.toFixed(1) + ' m';
            document.getElementById('tel-load-1').innerText = real_d_1.toFixed(1) + ' m';
            
            document.getElementById('tel-rope-2').innerText = real_d_2.toFixed(1) + ' m';
            document.getElementById('tel-load-2').innerText = (real_d_2/2).toFixed(1) + ' m';
            
            document.getElementById('tel-rope-3').innerText = real_d_3.toFixed(1) + ' m';
            document.getElementById('tel-load-3').innerText = (real_d_3/4).toFixed(1) + ' m';

            // Work = Force * Load Distance. Since Work is conserved, it's the same for all (1200N * load_dist = EffortForce * d)
            // Example using Sys1 calculation: 1200 N * real_d_1 = Work in Joules
            const work = 1200 * real_d_1; 
            document.getElementById('tel-work').innerText = Math.round(work) + ' Joules';
        }

        // Project 3D coordinate to 2D screen coordinate for DOM overlays
        function updateLabel(vector3D, htmlElement) {
            const tempV = vector3D.clone();
            tempV.project(camera);
            const x = (tempV.x * .5 + .5) * window.innerWidth;
            const y = (tempV.y * -.5 + .5) * window.innerHeight;
            
            // Only show if in front of camera
            if (tempV.z < 1) {
                htmlElement.style.display = 'block';
                htmlElement.style.left = `${x}px`;
                htmlElement.style.top = `${y}px`;
            } else {
                htmlElement.style.display = 'none';
            }
        }


        // --- 7. INTERACTION & ANIMATION LOOP ---
        
        const slider = document.getElementById('pull-slider');
        const autoBtn = document.getElementById('auto-btn');

        // UI Collapsible Panels Logic
        const setupToggle = (toggleId, contentId, iconId) => {
            const toggle = document.getElementById(toggleId);
            const content = document.getElementById(contentId);
            const icon = document.getElementById(iconId);
            
            toggle.addEventListener('click', () => {
                content.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
        };
        setupToggle('explainer-toggle', 'explainer-content', 'explainer-icon');
        setupToggle('telemetry-toggle', 'telemetry-content', 'telemetry-icon');

        slider.addEventListener('input', (e) => {
            targetPull = parseFloat(e.target.value);
            isAutoPlaying = false;
            autoBtn.classList.remove('bg-white/30');
            autoBtn.classList.add('bg-white/10');
        });

        autoBtn.addEventListener('click', () => {
            isAutoPlaying = !isAutoPlaying;
            if(isAutoPlaying) {
                autoBtn.classList.remove('bg-white/10');
                autoBtn.classList.add('bg-white/30', 'text-emerald-300');
                autoTime = Math.asin((targetPull - 4)/4); // smooth transition into sine wave
                if (isNaN(autoTime)) autoTime = 0;
            } else {
                autoBtn.classList.remove('bg-white/30', 'text-emerald-300');
                autoBtn.classList.add('bg-white/10');
                targetPull = currentPull;
                slider.value = targetPull;
            }
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);

            if (isAutoPlaying) {
                const dt = clock.getDelta();
                autoTime += dt * 1.0; // speed
                // Oscillate between 0 and 8
                targetPull = 4 + Math.sin(autoTime) * 4;
                slider.value = targetPull;
            } else {
                clock.getDelta(); // keep clock ticking so dt doesn't spike
            }

            // Smoothly interpolate the actual pull distance for physical weightiness
            currentPull += (targetPull - currentPull) * 0.1;
            
            // Calculate physics based on current pull
            updateKinematics(currentPull);

            controls.update();
            renderer.render(scene, camera);
        }

        // Initialize to 0
        updateKinematics(0);
        animate();

    </script>
</body>
</html>