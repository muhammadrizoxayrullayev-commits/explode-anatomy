/**
 * ANATOMA 3D // BIO-EXPLODE APPLICATION CORE
 * Interactive Human Anatomy Dissection & Exploded View Engine
 */

(function () {
    'use strict';

    // Expanded Pre-segmented Organ and Muscle Parts (All Viscera, Organs, Bones, Muscles)
    const PARTS_MANIFEST = [
        // Head & Sensory
        { "id": "brain", "name": "Bosh miya", "latin": "Encephalon & Cerebrum", "system": "nervous", "region": "head", "category": "organs", "dx": 0, "dy": -200, "dz": 180, "image": "part_brain.png", "w": 160, "h": 150, "x": 320, "y": 50, "cx": 400, "cy": 125 },
        { "id": "eye", "name": "Ko'z olmasi & ko'rish nervi", "latin": "Bulbus oculi & n. opticus", "system": "nervous", "region": "head", "category": "organs", "dx": 0, "dy": -160, "dz": 160, "image": "part_eye.png", "w": 120, "h": 60, "x": 340, "y": 90, "cx": 400, "cy": 120 },
        { "id": "head_muscles", "name": "Bosh & yuz muskullari", "latin": "Musculi capitis et faciei", "system": "muscular", "region": "head", "category": "muscular", "dx": 0, "dy": -110, "dz": 90, "image": "part_head_muscles.png", "w": 160, "h": 190, "x": 320, "y": 40, "cx": 400, "cy": 135 },
        { "id": "skull", "name": "Kalla suyagi (Kranium)", "latin": "Cranium", "system": "skeletal", "region": "head", "category": "skeletal", "dx": 0, "dy": -260, "dz": -100, "image": "part_skull.png", "w": 160, "h": 170, "x": 320, "y": 40, "cx": 400, "cy": 125 },

        // Neck & Respiratory & Heart
        { "id": "trachea", "name": "Hiqildoq & traxeya (Nafas yo'li)", "latin": "Larynx, Trachea et Gl. thyroidea", "system": "respiratory", "region": "neck", "category": "organs", "dx": 0, "dy": -90, "dz": 150, "image": "part_trachea.png", "w": 100, "h": 140, "x": 350, "y": 180, "cx": 400, "cy": 250 },
        { "id": "heart", "name": "Yurak va klapanlar", "latin": "Cor", "system": "cardiovascular", "region": "chest", "category": "organs", "dx": -70, "dy": -30, "dz": 240, "image": "part_heart.png", "w": 80, "h": 100, "x": 365, "y": 330, "cx": 405, "cy": 380 },
        { "id": "aorta", "name": "Aorta ravog'i & magistral tomirlar", "latin": "Arcus aortae et v. cava", "system": "cardiovascular", "region": "chest", "category": "organs", "dx": 60, "dy": -20, "dz": 200, "image": "part_aorta.png", "w": 130, "h": 260, "x": 340, "y": 250, "cx": 400, "cy": 380 },
        { "id": "lungs", "name": "O'pka (O'ng va chap)", "latin": "Pulmones", "system": "respiratory", "region": "chest", "category": "organs", "dx": 0, "dy": -50, "dz": 190, "image": "part_lungs.png", "w": 240, "h": 170, "x": 280, "y": 270, "cx": 400, "cy": 355 },

        // Digestive Viscera (Ichi-chavoqlar)
        { "id": "liver", "name": "Jigar va o't yo'llari", "latin": "Hepar et ductus biliares", "system": "digestive", "region": "abdomen", "category": "organs", "dx": -130, "dy": 50, "dz": 210, "image": "part_liver.png", "w": 130, "h": 100, "x": 305, "y": 410, "cx": 370, "cy": 460 },
        { "id": "stomach", "name": "Oshqozon (Me'da)", "latin": "Gaster (Ventriculus)", "system": "digestive", "region": "abdomen", "category": "organs", "dx": 130, "dy": 50, "dz": 210, "image": "part_stomach.png", "w": 100, "h": 100, "x": 390, "y": 410, "cx": 440, "cy": 460 },
        { "id": "pancreas", "name": "Oshqozon osti bezi & o't qopi", "latin": "Pancreas et vesica biliaris", "system": "digestive", "region": "abdomen", "category": "organs", "dx": 80, "dy": 80, "dz": 180, "image": "part_pancreas.png", "w": 120, "h": 90, "x": 340, "y": 440, "cx": 400, "cy": 485 },
        { "id": "spleen", "name": "Taloq (Qon deposi)", "latin": "Splen (Lien)", "system": "cardiovascular", "region": "abdomen", "category": "organs", "dx": 160, "dy": 70, "dz": 160, "image": "part_spleen.png", "w": 80, "h": 80, "x": 440, "y": 410, "cx": 480, "cy": 450 },
        { "id": "kidney_left", "name": "Chap buyrak", "latin": "Ren sinister", "system": "urinary", "region": "abdomen", "category": "organs", "dx": 130, "dy": 110, "dz": 140, "image": "part_kidney_left.png", "w": 80, "h": 90, "x": 440, "y": 470, "cx": 480, "cy": 515 },
        { "id": "kidney_right", "name": "O'ng buyrak", "latin": "Ren dexter", "system": "urinary", "region": "abdomen", "category": "organs", "dx": -130, "dy": 110, "dz": 140, "image": "part_kidney_right.png", "w": 80, "h": 90, "x": 290, "y": 480, "cx": 330, "cy": 525 },
        { "id": "intestines", "name": "Ingichka va yo'g'on ichak (Ich-chavoq)", "latin": "Intestinum tenue et colon", "system": "digestive", "region": "abdomen", "category": "organs", "dx": 0, "dy": 150, "dz": 220, "image": "part_intestines.png", "w": 180, "h": 190, "x": 310, "y": 490, "cx": 400, "cy": 585 },
        { "id": "bladder", "name": "Siydik pufagi (Qovuq)", "latin": "Vesica urinaria", "system": "urinary", "region": "pelvis", "category": "organs", "dx": 0, "dy": 180, "dz": 190, "image": "part_bladder.png", "w": 90, "h": 90, "x": 355, "y": 620, "cx": 400, "cy": 665 },

        // Skeletal Axial & Appendicular
        { "id": "ribcage", "name": "Ko'krak qafasi & qovurg'alar", "latin": "Thorax et Costae", "system": "skeletal", "region": "chest", "category": "skeletal", "dx": 0, "dy": -80, "dz": -130, "image": "part_ribcage.png", "w": 260, "h": 240, "x": 270, "y": 240, "cx": 400, "cy": 360 },
        { "id": "spine", "name": "Umurtqa pog'onasi", "latin": "Columna vertebralis", "system": "skeletal", "region": "spine", "category": "skeletal", "dx": 0, "dy": 40, "dz": -160, "image": "part_spine.png", "w": 70, "h": 340, "x": 365, "y": 230, "cx": 400, "cy": 400 },
        { "id": "pelvis", "name": "Tos suyagi & dumg'aza", "latin": "Pelvis & os sacrum", "system": "skeletal", "region": "pelvis", "category": "skeletal", "dx": 0, "dy": 110, "dz": -120, "image": "part_pelvis.png", "w": 260, "h": 170, "x": 270, "y": 550, "cx": 400, "cy": 635 },

        // Muscular Groups
        { "id": "pectoralis_major", "name": "Katta ko'krak mushagi", "latin": "Musculus pectoralis major", "system": "muscular", "region": "chest", "category": "muscular", "dx": 0, "dy": -40, "dz": 140, "image": "part_pectoralis_major.png", "w": 280, "h": 140, "x": 260, "y": 270, "cx": 400, "cy": 340 },
        { "id": "deltoid_left", "name": "Chap deltasimon mushak", "latin": "Musculus deltoideus sinister", "system": "muscular", "region": "chest", "category": "muscular", "dx": -170, "dy": -30, "dz": 110, "image": "part_deltoid_left.png", "w": 130, "h": 180, "x": 180, "y": 240, "cx": 245, "cy": 330 },
        { "id": "deltoid_right", "name": "O'ng deltasimon mushak", "latin": "Musculus deltoideus dexter", "system": "muscular", "region": "chest", "category": "muscular", "dx": 170, "dy": -30, "dz": 110, "image": "part_deltoid_right.png", "w": 130, "h": 180, "x": 490, "y": 240, "cx": 555, "cy": 330 },
        { "id": "arm_left", "name": "Chap qo'l (Biceps)", "latin": "Musculus biceps brachii sin.", "system": "muscular", "region": "arm", "category": "muscular", "dx": -210, "dy": 20, "dz": 90, "image": "part_arm_left.png", "w": 160, "h": 220, "x": 110, "y": 360, "cx": 190, "cy": 470 },
        { "id": "arm_right", "name": "O'ng qo'l (Biceps)", "latin": "Musculus biceps brachii dex.", "system": "muscular", "region": "arm", "category": "muscular", "dx": 210, "dy": 20, "dz": 90, "image": "part_arm_right.png", "w": 160, "h": 220, "x": 530, "y": 360, "cx": 610, "cy": 470 },
        { "id": "hand_left", "name": "Chap kaft & bilak", "latin": "Musculi manus et antebrachii sin.", "system": "muscular", "region": "arm", "category": "muscular", "dx": -250, "dy": 80, "dz": 70, "image": "part_hand_left.png", "w": 180, "h": 230, "x": 30, "y": 540, "cx": 120, "cy": 655 },
        { "id": "hand_right", "name": "O'ng kaft & bilak", "latin": "Musculi manus et antebrachii dex.", "system": "muscular", "region": "arm", "category": "muscular", "dx": 250, "dy": 80, "dz": 70, "image": "part_hand_right.png", "w": 180, "h": 230, "x": 590, "y": 540, "cx": 680, "cy": 655 },
        { "id": "rectus_abdominis", "name": "Qorin to'g'ri mushagi (Press)", "latin": "Musculus rectus abdominis", "system": "muscular", "region": "abdomen", "category": "muscular", "dx": 0, "dy": 50, "dz": 150, "image": "part_rectus_abdominis.png", "w": 180, "h": 260, "x": 310, "y": 380, "cx": 400, "cy": 510 },
        { "id": "quadriceps_left", "name": "Chap son (Kvadritseps)", "latin": "Musculus quadriceps femoris sin.", "system": "muscular", "region": "leg", "category": "muscular", "dx": -150, "dy": 130, "dz": 90, "image": "part_quadriceps_left.png", "w": 180, "h": 330, "x": 210, "y": 640, "cx": 300, "cy": 805 },
        { "id": "quadriceps_right", "name": "O'ng son (Kvadritseps)", "latin": "Musculus quadriceps femoris dex.", "system": "muscular", "region": "leg", "category": "muscular", "dx": 150, "dy": 130, "dz": 90, "image": "part_quadriceps_right.png", "w": 180, "h": 330, "x": 410, "y": 640, "cx": 500, "cy": 805 },
        { "id": "calves_left", "name": "Chap boldir (Ikra)", "latin": "Musculus gastrocnemius sin.", "system": "muscular", "region": "leg", "category": "muscular", "dx": -160, "dy": 210, "dz": 70, "image": "part_calves_left.png", "w": 160, "h": 380, "x": 230, "y": 960, "cx": 310, "cy": 1150 },
        { "id": "calves_right", "name": "O'ng boldir (Ikra)", "latin": "Musculus gastrocnemius dex.", "system": "muscular", "region": "leg", "category": "muscular", "dx": 160, "dy": 210, "dz": 70, "image": "part_calves_right.png", "w": 160, "h": 380, "x": 410, "y": 960, "cx": 490, "cy": 1150 }
    ];

    // State Variables
    let explodeProgress = 0; // 0 to 100
    let targetExplode = 0;
    let dispersionMultiplier = 1.0;
    let isPlaying = false;
    let playDirection = 1;
    let mouseTrackMode = false;
    let activeSystem = 'all';
    let activeRegion = 'all';
    let selectedItemId = null;
    let zoomLevel = 1.0;
    let camRotateX = 0;
    let camRotateY = 0;
    let xrayActive = false;
    let stethoscopeActive = false;
    let slicePlaneActive = false;
    let currentCameraPreset = 0; // 0: Frontal, 1: Isometric Galaxy, 2: Deep 3D Profile
    let isDraggingStage = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    // DOM Elements Cache
    const explodeSlider = document.getElementById('explodeSlider');
    const explodePercentBadge = document.getElementById('explodePercentBadge');
    const stageName = document.getElementById('stageName');
    const stageSubtext = document.getElementById('stageSubtext');
    const stageRig = document.getElementById('stageRig');
    const stageCenter = document.getElementById('stageCenter');
    const skinLeft = document.getElementById('skinLeft');
    const skinRight = document.getElementById('skinRight');
    const layerSkin = document.getElementById('layerSkin');
    const layerMuscles = document.getElementById('layerMuscles');
    const layerSkeleton = document.getElementById('layerSkeleton');
    const layerOrgans = document.getElementById('layerOrgans');
    const layerCirculatory = document.getElementById('layerCirculatory');
    const partsContainer = document.getElementById('partsContainer');
    const labelsContainer = document.getElementById('labelsContainer');
    const hologramSvg = document.getElementById('hologramSvg');
    const sidebarRight = document.getElementById('sidebarRight');
    const inspectorContent = document.getElementById('inspectorContent');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const mouseTrackBtn = document.getElementById('mouseTrackBtn');
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseText = document.getElementById('playPauseText');
    const dispersionSlider = document.getElementById('dispersionSlider');
    const dispersionVal = document.getElementById('dispersionVal');
    const xrayBtn = document.getElementById('xrayBtn');
    const xrayLens = document.getElementById('xrayLens');
    const ecgCanvas = document.getElementById('ecgCanvas');
    const totalVisibleCount = document.getElementById('totalVisibleCount');
    const stethoscopeBtn = document.getElementById('stethoscopeBtn');
    const stethoscopeSensor = document.getElementById('stethoscopeSensor');
    const stethoSoundLabel = document.getElementById('stethoSoundLabel');
    const slicePlaneBtn = document.getElementById('slicePlaneBtn');
    const laserSlicePlane = document.getElementById('laserSlicePlane');
    const sliceLevelText = document.getElementById('sliceLevelText');
    const angle3dBtn = document.getElementById('angle3dBtn');

    const explodedOrgansGallery = document.getElementById('explodedOrgansGallery');
    const galleryCardsGrid = document.getElementById('galleryCardsGrid');
    const galleryFilterChips = document.getElementById('galleryFilterChips');
    let currentGalleryFilter = 'all';

    // --- STAGE DEFINITIONS ---
    const STAGES = [
        { min: 0, max: 22, name: "1-BOSQICH: TERI VA TASHQI QAVAT OCHILISHI", sub: "Haqiqiy inson terisi lateral tomonga silliq ochilib, mushaklar qavatini ochadi" },
        { min: 22, max: 50, name: "2-BOSQICH: ALOHIDA MUSKULLAR AJRALISHI", sub: "Ko'krak, yelka, qo'l, press, son va boldir mushaklari ketma-ketlikda ajraladi" },
        { min: 50, max: 75, name: "3-BOSQICH: SKELET VA ICHKI A'ZOLAR (ICH-CHAVOQ)", sub: "Kalla, ko'z, yurak, o'pka, jigar, me'da, ichaklar va buyraklar oldinga suzib chiqadi" },
        { min: 75, max: 100, name: "4-BOSQICH: TANA O'NGGA SURILIB, BARCHA A'ZOLAR CHAPGA YIG'ILADI", sub: "Odam tanasi o'ng tomonga o'tadi va barcha ich-chavoq a'zolari chap tomonga tizimlanadi" }
    ];

    /**
     * Initialize Application
     */
    function init() {
        renderSegmentedParts();
        renderLeftGalleryCards();
        setupEventListeners();
        setupECGMonitor();
        updateDissectionStage(0);
        updateVisibleCount();

        // Start render loop
        requestAnimationFrame(renderLoop);
    }

    function getCategoryEmoji(part) {
        if (part.id === 'brain') return '🧠';
        if (part.id === 'eye') return '👁️';
        if (part.id === 'trachea') return '🫁';
        if (part.id === 'heart' || part.id === 'aorta') return '❤️';
        if (part.id === 'lungs') return '🫁';
        if (part.id === 'liver') return '🥩';
        if (part.id === 'stomach') return '🥣';
        if (part.id === 'pancreas') return '🥞';
        if (part.id === 'spleen') return '🩸';
        if (part.id.includes('kidney')) return '🫘';
        if (part.id === 'intestines') return '🌭';
        if (part.id === 'bladder') return '💧';
        if (part.category === 'skeletal') return '🦴';
        if (part.category === 'muscular') return '💪';
        return '🔬';
    }

    /**
     * Render Left Gallery Organ Cards (Finale Stage Catalog)
     */
    function renderLeftGalleryCards() {
        if (!galleryCardsGrid) return;
        galleryCardsGrid.innerHTML = '';

        const filteredParts = PARTS_MANIFEST.filter(part => {
            if (currentGalleryFilter === 'all') return true;
            return part.category === currentGalleryFilter;
        });

        filteredParts.forEach(part => {
            const card = document.createElement('div');
            card.className = 'gallery-organ-card';
            card.id = `gal_card_${part.id}`;
            card.dataset.id = part.id;
            card.dataset.category = part.category;

            card.innerHTML = `
                <div class="card-thumb-wrap">
                    <span class="card-emoji-bg">${getCategoryEmoji(part)}</span>
                    <img src="assets/images/${part.image}" alt="" onerror="this.style.display='none'">
                </div>
                <div class="card-details">
                    <div class="card-name">${part.name}</div>
                    <div class="card-latin">${part.latin}</div>
                    <div class="card-footer">
                        <span class="card-sys-tag">${part.system}</span>
                        <span class="card-inspect-arrow">TAHLIL →</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                selectAnatomicalPart(part.id);
                highlightGalleryCard(part.id);
            });

            galleryCardsGrid.appendChild(card);
        });

        // Filter chips setup
        if (galleryFilterChips) {
            galleryFilterChips.querySelectorAll('.chip').forEach(chip => {
                chip.onclick = () => {
                    galleryFilterChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    currentGalleryFilter = chip.dataset.filter;
                    renderLeftGalleryCards();
                    window.medicalAudio.playClick();
                };
            });
        }
    }

    function highlightGalleryCard(id) {
        document.querySelectorAll('.gallery-organ-card').forEach(c => c.classList.remove('selected'));
        const target = document.getElementById(`gal_card_${id}`);
        if (target) {
            target.classList.add('selected');
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    /**
     * Render DOM Elements for Segmented Parts and SVG Callout Cables
     */
    function renderSegmentedParts() {
        partsContainer.innerHTML = '';
        labelsContainer.innerHTML = '';

        const baseW = 800;
        const baseH = 1400;

        PARTS_MANIFEST.forEach(part => {
            // Part image wrapper
            const el = document.createElement('div');
            el.className = 'segmented-part';
            el.id = `part_${part.id}`;
            el.dataset.id = part.id;
            el.dataset.system = part.system;
            el.dataset.region = part.region;

            // Positioning in 800x1400 coordinates
            el.style.left = `${(part.x / baseW) * 100}%`;
            el.style.top = `${(part.y / baseH) * 100}%`;
            el.style.width = `${(part.w / baseW) * 100}%`;
            el.style.height = `${(part.h / baseH) * 100}%`;
            el.style.zIndex = 20;

            const img = document.createElement('img');
            img.src = `assets/images/${part.image}`;
            img.alt = ""; // CRITICAL: NEVER display alt text in 3D scene to prevent broken image text
            img.onerror = function() { this.style.display = 'none'; };
            el.appendChild(img);

            // Click listener
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                selectAnatomicalPart(part.id);
            });

            // Hover sound & pulse
            el.addEventListener('mouseenter', () => {
                if (part.id === 'heart') {
                    window.medicalAudio.startHeartbeatLoop(74);
                } else {
                    window.medicalAudio.playSelect();
                }
            });

            el.addEventListener('mouseleave', () => {
                if (part.id === 'heart' && selectedItemId !== 'heart') {
                    window.medicalAudio.stopHeartbeat();
                }
            });

            partsContainer.appendChild(el);

            // Floating Label Badge underneath part
            const labelEl = document.createElement('div');
            labelEl.className = 'hologram-label';
            labelEl.id = `label_${part.id}`;
            labelEl.dataset.id = part.id;
            labelEl.dataset.system = part.system;
            labelEl.dataset.region = part.region;

            labelEl.innerHTML = `
                <div class="hologram-badge">
                    <span class="badge-title">${part.name}</span>
                    <span class="badge-latin">${part.latin}</span>
                </div>
            `;

            labelEl.addEventListener('click', (e) => {
                e.stopPropagation();
                selectAnatomicalPart(part.id);
            });

            labelsContainer.appendChild(labelEl);
        });
    }

    /**
     * Main Animation & Render Loop (Smooth Lerp 60fps)
     */
    function renderLoop() {
        // Smooth lerp to target explode progress
        const diff = targetExplode - explodeProgress;
        if (Math.abs(diff) > 0.05) {
            explodeProgress += diff * 0.18;
            updateDissectionStage(explodeProgress);
        }

        // Auto tour playback
        if (isPlaying) {
            targetExplode += playDirection * 0.28;
            if (targetExplode >= 100) {
                targetExplode = 100;
                playDirection = -1;
            } else if (targetExplode <= 0) {
                targetExplode = 0;
                playDirection = 1;
            }
            explodeSlider.value = targetExplode;
        }

        requestAnimationFrame(renderLoop);
    }

    /**
     * Update Dissection Visuals according to Explode Progress (0 - 100)
     * Strictly sequential: Skin -> Muscles -> Skeletal & Viscera -> Right Shift + Left Gallery
     */
    function updateDissectionStage(val) {
        const p = Math.max(0, Math.min(100, val));
        explodePercentBadge.textContent = `${Math.round(p)}%`;

        // Update Stage Badge text
        const currentStage = STAGES.find(s => p >= s.min && p <= s.max) || STAGES[0];
        stageName.textContent = currentStage.name;
        stageSubtext.textContent = currentStage.sub;

        // Stage 4 Finale Body Shift: Body shifts to right side (p > 72)
        let bodyShiftX = 0;
        let bodyScale = 1.0;
        let galleryAlpha = 0;

        if (p > 72) {
            const shiftProgress = Math.min(1, (p - 72) / 28);
            bodyShiftX = shiftProgress * 240; // shift 240px right
            bodyScale = 1.0 - (shiftProgress * 0.16); // scale to 84%
            galleryAlpha = shiftProgress;
            if (explodedOrgansGallery) {
                explodedOrgansGallery.classList.add('active');
                explodedOrgansGallery.style.opacity = galleryAlpha;
            }
        } else {
            if (explodedOrgansGallery) {
                explodedOrgansGallery.classList.remove('active');
                explodedOrgansGallery.style.opacity = 0;
            }
        }

        applyRigTransform(bodyShiftX, bodyScale);

        // 1. Stage 1 (0 to 25%): Skin Halves Lateral Separation (Clean Peeling)
        // At 0%: 100% intact realistic skin. As p increases to 25%, skin glides laterally open.
        let skinOpen = 0;
        let skinOpacity = 1;
        let muscleBaseOpacity = 0;

        if (p <= 25) {
            skinOpen = p / 25;
            skinOpacity = Math.max(0, 1 - (p / 28));
            muscleBaseOpacity = p / 25; // Revealed directly beneath peeling skin
        } else {
            skinOpen = 1;
            skinOpacity = 0;
            muscleBaseOpacity = Math.max(0.1, 1 - (p - 25) / 35);
        }

        const skinShiftX = skinOpen * 180 * dispersionMultiplier;
        const skinRotY = skinOpen * 35;

        skinLeft.style.transform = `translateX(-${skinShiftX}px) rotateY(-${skinRotY}deg) translateZ(${skinOpen * 30}px)`;
        skinRight.style.transform = `translateX(${skinShiftX}px) rotateY(${skinRotY}deg) translateZ(${skinOpen * 30}px)`;
        layerSkin.style.opacity = skinOpacity;

        // Base Muscle Layer
        layerMuscles.style.opacity = muscleBaseOpacity;

        // Skeletal Layer: Only starts appearing after p > 30% inside the separated muscles!
        let skelOpacity = 0;
        if (p > 30 && p <= 75) {
            skelOpacity = (p - 30) / 25;
        } else if (p > 75) {
            skelOpacity = 0.8;
        }
        layerSkeleton.style.opacity = Math.min(1, skelOpacity);
        layerSkeleton.style.transform = `translateZ(-50px)`;

        // Full-body internal organs and circulatory: keep hidden to prevent conflicting ghosts!
        layerOrgans.style.opacity = 0;
        layerCirculatory.style.opacity = 0;

        // 2. Stage 2 (25% to 50%): Muscle Parts Separation
        let muscleSep = 0;
        if (p > 25 && p <= 50) {
            muscleSep = (p - 25) / 25;
        } else if (p > 50) {
            muscleSep = 1.0;
        }

        // 3. Stage 3 (50% to 75%): Visceral Organs Emerge Forward
        let visceraSep = 0;
        if (p > 50 && p <= 75) {
            visceraSep = (p - 50) / 25;
        } else if (p > 75) {
            visceraSep = 1.0;
        }

        // 4. Update Each Segmented Part
        let svgLinesHtml = '';
        const baseW = 800;
        const baseH = 1400;

        PARTS_MANIFEST.forEach(part => {
            const partEl = document.getElementById(`part_${part.id}`);
            const labelEl = document.getElementById(`label_${part.id}`);
            if (!partEl) return;

            // System filter visibility
            const isSystemMatch = activeSystem === 'all' || part.system === activeSystem;
            const isRegionMatch = activeRegion === 'all' || part.region === activeRegion;
            const isVisible = isSystemMatch && isRegionMatch;

            if (!isVisible) {
                partEl.style.opacity = '0';
                partEl.style.pointerEvents = 'none';
                if (labelEl) labelEl.style.display = 'none';
                return;
            }

            // Determine part visibility & separation
            let partSep = 0;
            let partOpacity = 0;

            if (part.category === 'muscular') {
                if (p > 25) {
                    partSep = muscleSep;
                    // Muscles separate and stay visible, slightly dimming when deep organs emerge
                    partOpacity = p > 55 ? 0.35 : Math.min(1, (p - 25) / 10);
                } else {
                    partOpacity = 0;
                }
            } else if (part.category === 'skeletal') {
                if (p > 35) {
                    partSep = Math.min(1, (p - 35) / 30);
                    partOpacity = Math.min(1, (p - 35) / 15);
                } else {
                    partOpacity = 0;
                }
            } else if (part.category === 'organs') {
                if (p > 50) {
                    partSep = visceraSep;
                    partOpacity = Math.min(1, (p - 50) / 12);
                } else {
                    partOpacity = 0;
                }
            }

            partEl.style.opacity = partOpacity;
            partEl.style.pointerEvents = partOpacity > 0.5 ? 'auto' : 'none';

            const curDx = part.dx * partSep * dispersionMultiplier;
            const curDy = part.dy * partSep * dispersionMultiplier;
            const curDz = part.dz * partSep * dispersionMultiplier;

            partEl.style.transform = `translate3d(${curDx}px, ${curDy}px, ${curDz}px)`;

            // Floating Label Badges on Body:
            // Only show during Stages 2 and 3 (p: 28% to 72%).
            // At Stage 4 (p > 72%), hide labels on body so the body is pristine, and left gallery displays everything!
            if (labelEl) {
                const showLabel = p > 28 && p < 72 && partOpacity > 0.6 && isVisible;

                if (showLabel) {
                    const originX = part.cx;
                    const originY = part.cy;
                    const explodedX = originX + curDx;
                    const explodedY = originY + curDy;

                    const labelPosX = (explodedX / baseW) * 100;
                    const labelPosY = ((explodedY + (part.h / 2) + 20) / baseH) * 100;

                    labelEl.style.left = `${labelPosX}%`;
                    labelEl.style.top = `${labelPosY}%`;
                    labelEl.style.display = 'block';
                    labelEl.style.opacity = '1';

                    // Laser connecting cable line
                    if (Math.abs(curDx) > 8 || Math.abs(curDy) > 8) {
                        svgLinesHtml += `
                            <line x1="${originX}" y1="${originY}" x2="${explodedX}" y2="${explodedY}" class="cable-line" />
                            <circle cx="${originX}" cy="${originY}" r="3.5" class="cable-point" />
                            <circle cx="${explodedX}" cy="${explodedY}" r="3.5" class="cable-point" />
                        `;
                    }
                } else {
                    labelEl.style.display = 'none';
                }
            }
        });

        hologramSvg.innerHTML = svgLinesHtml;

        // Checkpoint indicators active update
        document.querySelectorAll('.checkpoint-node').forEach(node => {
            const targetVal = parseFloat(node.dataset.target);
            if (Math.abs(p - targetVal) < 14) {
                node.classList.add('active-point');
            } else {
                node.classList.remove('active-point');
            }
        });
    }

    /**
     * Select & Inspect Anatomical Part (Open Clinical Dossier)
     */
    function selectAnatomicalPart(id) {
        selectedItemId = id;
        window.medicalAudio.playSelect();

        // Highlight in DOM
        document.querySelectorAll('.segmented-part').forEach(p => p.classList.remove('active-part'));
        document.querySelectorAll('.hologram-label').forEach(l => l.classList.remove('selected'));

        const partEl = document.getElementById(`part_${id}`);
        const labelEl = document.getElementById(`label_${id}`);
        if (partEl) partEl.classList.add('active-part');
        if (labelEl) labelEl.classList.add('selected');
        highlightGalleryCard(id);

        // Look up in comprehensive ANATOMY_DATABASE or fallback to manifest
        let dbItem = null;
        if (typeof ANATOMY_DATABASE !== 'undefined') {
            dbItem = ANATOMY_DATABASE.find(item => item.id === id || item.id.includes(id));
        }

        const manifestItem = PARTS_MANIFEST.find(p => p.id === id);

        const titleUz = dbItem ? dbItem.name_uz : (manifestItem ? manifestItem.name : id);
        const titleLa = dbItem ? dbItem.name_la : (manifestItem ? manifestItem.latin : '');
        const titleEn = dbItem ? dbItem.name_en : '';
        const systemUz = dbItem ? dbItem.system_uz : (manifestItem ? manifestItem.system : 'Anatomiya');
        const descUz = dbItem ? dbItem.desc_uz : "Inson organizmining asosiy funktsional anatomik strukturasi.";
        const funksiyasi = dbItem ? dbItem.funksiyasi : "Tana muvozanati, biomexanika va gomeostazni saqlash.";
        const klinik = dbItem ? dbItem.klinik : "Tibbiy diagnostika, travmatologiya va profilaktika.";
        const imgSrc = manifestItem ? `assets/images/${manifestItem.image}` : 'assets/images/part_heart.png';

        // Render Inspector Dossier
        sidebarRight.classList.remove('collapsed');
        inspectorContent.innerHTML = `
            <div class="organ-preview-box">
                <div class="organ-grid"></div>
                <img src="${imgSrc}" alt="${titleUz}">
            </div>

            <div class="organ-title-block">
                <h3>${titleUz}</h3>
                <div class="organ-latin-badge">${titleLa}</div>
                <div class="organ-tags">
                    <span class="organ-tag">${systemUz}</span>
                    ${titleEn ? `<span class="organ-tag" style="border-color: #ffd700; color: #ffd700;">${titleEn}</span>` : ''}
                </div>
            </div>

            <div class="dossier-card">
                <div class="dossier-card-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    Tavsifi va Joylashuvi
                </div>
                <div class="dossier-card-text">${descUz}</div>
            </div>

            <div class="dossier-card">
                <div class="dossier-card-title" style="color: #00ffaa;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                    Fiziologik Funksiyasi
                </div>
                <div class="dossier-card-text">${funksiyasi}</div>
            </div>

            <div class="dossier-card">
                <div class="dossier-card-title" style="color: #ff3366;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    Klinik Ahamiyati & Patologiyasi
                </div>
                <div class="dossier-card-text">${klinik}</div>
            </div>

            <button class="audio-pronounce-btn" id="pronounceBtn">
                <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                Ovozli Talaffuz (Pronounce)
            </button>
        `;

        document.getElementById('pronounceBtn').addEventListener('click', () => {
            speakName(titleUz, titleLa);
        });

        // If Heart, trigger heartbeat loop
        if (id === 'heart' || id.includes('heart') || id.includes('cardio')) {
            window.medicalAudio.startHeartbeatLoop(74);
        } else {
            window.medicalAudio.stopHeartbeat();
        }
    }

    /**
     * Speech Synthesis for Medical Pronunciation
     */
    function speakName(uz, la) {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const text = `${uz}. Tibbiy lotincha nomi: ${la}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    }

    /**
     * Real-time Electrocardiogram (ECG) Monitor Canvas
     */
    function setupECGMonitor() {
        if (!ecgCanvas) return;
        const ctx = ecgCanvas.getContext('2d');
        const width = ecgCanvas.width;
        const height = ecgCanvas.height;
        let points = new Array(width).fill(height / 2);
        let x = 0;
        let cycle = 0;

        function drawECG() {
            cycle = (cycle + 1) % 60;
            let val = height / 2;

            // Generate P-Q-R-S-T wave pulse
            if (cycle === 15) val = height / 2 - 4; // P wave
            else if (cycle === 20) val = height / 2 + 3; // Q
            else if (cycle === 22) val = height / 2 - 14; // R peak
            else if (cycle === 24) val = height / 2 + 7; // S dip
            else if (cycle === 32) val = height / 2 - 6; // T wave

            points[x] = val;
            x = (x + 1) % width;

            ctx.clearRect(0, 0, width, height);

            // Draw line
            ctx.beginPath();
            ctx.strokeStyle = '#00ffaa';
            ctx.lineWidth = 1.5;
            ctx.shadowColor = '#00ffaa';
            ctx.shadowBlur = 6;

            for (let i = 0; i < width; i++) {
                const px = (x + i) % width;
                const py = points[px];
                if (i === 0) ctx.moveTo(i, py);
                else ctx.lineTo(i, py);
            }
            ctx.stroke();

            requestAnimationFrame(drawECG);
        }

        drawECG();
    }

    /**
     * Setup Event Listeners
     */
    function setupEventListeners() {
        // Master Slider input
        explodeSlider.addEventListener('input', (e) => {
            targetExplode = parseFloat(e.target.value);
            window.medicalAudio.playScrub(targetExplode / 100);
        });

        // Mouse Tracking Mode Toggle ("Mishkani yurgassam sekin ajralib borishi kerak")
        mouseTrackBtn.addEventListener('click', () => {
            mouseTrackMode = !mouseTrackMode;
            mouseTrackBtn.classList.toggle('active', mouseTrackMode);
            mouseTrackBtn.querySelector('span').textContent = `Mishka Harakati: ${mouseTrackMode ? 'ON' : 'OFF'}`;
            window.medicalAudio.playClick();
        });

        // Stethoscope Mode Toggle
        stethoscopeBtn.addEventListener('click', () => {
            stethoscopeActive = !stethoscopeActive;
            stethoscopeBtn.classList.toggle('active', stethoscopeActive);
            stethoscopeBtn.querySelector('span').textContent = `Stetoskop: ${stethoscopeActive ? 'ON' : 'OFF'}`;
            stethoscopeSensor.classList.toggle('active', stethoscopeActive);
            if (!stethoscopeActive) {
                window.medicalAudio.stopHeartbeat();
            }
            window.medicalAudio.playClick();
        });

        // CT Laser Slice Plane Toggle
        slicePlaneBtn.addEventListener('click', () => {
            slicePlaneActive = !slicePlaneActive;
            slicePlaneBtn.classList.toggle('active', slicePlaneActive);
            laserSlicePlane.classList.toggle('active', slicePlaneActive);
            if (slicePlaneActive) {
                window.medicalAudio.playScanSweep();
            }
            window.medicalAudio.playClick();
        });

        // 3D Camera Angles Preset Button
        angle3dBtn.addEventListener('click', () => {
            currentCameraPreset = (currentCameraPreset + 1) % 3;
            if (currentCameraPreset === 0) {
                camRotateX = 0;
                camRotateY = 0;
                zoomLevel = 1.0;
            } else if (currentCameraPreset === 1) {
                // Isometric Galaxy Explode Angle
                camRotateX = 18;
                camRotateY = -28;
                zoomLevel = 1.1;
                targetExplode = Math.max(50, targetExplode);
                explodeSlider.value = targetExplode;
            } else {
                // Profile Deep Dissection Angle
                camRotateX = 8;
                camRotateY = 42;
                zoomLevel = 1.15;
            }
            applyRigTransform();
            window.medicalAudio.playClick();
        });

        // Free 3D Mouse Orbit on Stage (Drag with Right Click or Shift+Click)
        stageCenter.addEventListener('mousedown', (e) => {
            if (e.button === 2 || e.shiftKey || e.button === 1) {
                isDraggingStage = true;
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
                e.preventDefault();
            }
        });

        window.addEventListener('mouseup', () => {
            isDraggingStage = false;
        });

        stageCenter.addEventListener('contextmenu', (e) => e.preventDefault());

        // Viewport Mouse Move for continuous scrubbing & tool interactions
        window.addEventListener('mousemove', (e) => {
            // Free orbit rotation
            if (isDraggingStage) {
                const deltaX = e.clientX - prevMouseX;
                const deltaY = e.clientY - prevMouseY;
                camRotateY += deltaX * 0.4;
                camRotateX -= deltaY * 0.4;
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
                applyRigTransform();
                return;
            }

            if (mouseTrackMode) {
                // Map mouse X across screen to 0 - 100%
                const pct = (e.clientX / window.innerWidth) * 100;
                targetExplode = Math.max(0, Math.min(100, pct));
                explodeSlider.value = targetExplode;
                window.medicalAudio.playScrub(targetExplode / 100);
            }

            // Subtle 3D Parallax tilt on rig when not orbiting
            if (!isDraggingStage && currentCameraPreset === 0) {
                const normX = (e.clientX / window.innerWidth) - 0.5;
                const normY = (e.clientY / window.innerHeight) - 0.5;
                camRotateY = normX * 16;
                camRotateX = -normY * 12;
                applyRigTransform();
            }

            // X-Ray lens tracking
            if (xrayActive) {
                xrayLens.style.left = `${e.clientX}px`;
                xrayLens.style.top = `${e.clientY}px`;
            }

            // Stethoscope follower and auscultation trigger
            if (stethoscopeActive) {
                stethoscopeSensor.style.left = `${e.clientX}px`;
                stethoscopeSensor.style.top = `${e.clientY}px`;

                // Detect anatomical zone under mouse
                const stageRect = stageCenter.getBoundingClientRect();
                const relY = (e.clientY - stageRect.top) / stageRect.height; // 0 to 1
                const relX = (e.clientX - stageRect.left) / stageRect.width;

                if (relY > 0.22 && relY < 0.36 && relX > 0.42 && relX < 0.58) {
                    // Heart area
                    stethoSoundLabel.textContent = "Auskultatsiya: Yurak Ritmi (74 BPM - Lub-Dub)";
                    stethoSoundLabel.style.borderColor = "#ff3366";
                    window.medicalAudio.startHeartbeatLoop(74);
                } else if (relY > 0.20 && relY < 0.38 && (relX < 0.42 || relX > 0.58)) {
                    // Lungs area
                    stethoSoundLabel.textContent = "Auskultatsiya: Vezikulyar Nafas (O'pka)";
                    stethoSoundLabel.style.borderColor = "#00f0ff";
                    window.medicalAudio.stopHeartbeat();
                    window.medicalAudio.playBreathing();
                } else if (relY > 0.12 && relY < 0.22) {
                    // Neck / Carotid
                    stethoSoundLabel.textContent = "Auskultatsiya: Uyqu Arteriyasi Pulsi (Karotid)";
                    stethoSoundLabel.style.borderColor = "#ffd700";
                    window.medicalAudio.stopHeartbeat();
                } else if (relY > 0.38 && relY < 0.55) {
                    // Abdomen
                    stethoSoundLabel.textContent = "Auskultatsiya: Me'da-ichak Peristaltikasi";
                    stethoSoundLabel.style.borderColor = "#00ffaa";
                    window.medicalAudio.stopHeartbeat();
                } else {
                    stethoSoundLabel.textContent = "Auskultatsiya: To'qima fon shovqini";
                    stethoSoundLabel.style.borderColor = "var(--border-color)";
                    window.medicalAudio.stopHeartbeat();
                }
            }

            // CT Slicing Plane tracking
            if (slicePlaneActive) {
                const stageRect = stageRig.getBoundingClientRect();
                const planeRelY = Math.max(0, Math.min(1, (e.clientY - stageRect.top) / stageRect.height));
                const planePercent = planeRelY * 100;
                laserSlicePlane.style.top = `${planePercent}%`;

                // Calculate anatomical cross-section label
                let levelStr = "";
                const cm = Math.round(planeRelY * 175); // approx 175 cm human height
                if (planePercent < 15) levelStr = `Kraniofatsial Kesim (Kalla & Bosh Miya) // ${cm} cm`;
                else if (planePercent < 24) levelStr = `C1-C7 Bo'yin & Halqum Kesimi // ${cm} cm`;
                else if (planePercent < 42) levelStr = `Th1-Th8 Ko'krak Qafasi (Yurak & O'pka) // ${cm} cm`;
                else if (planePercent < 56) levelStr = `Th9-L2 Epigastral Kesim (Jigar & Me'da) // ${cm} cm`;
                else if (planePercent < 68) levelStr = `L3-L5 Bel & Buyraklar Kesimi // ${cm} cm`;
                else if (planePercent < 78) levelStr = `Pelvis (Tos & Qovuq) Kesimi // ${cm} cm`;
                else if (planePercent < 90) levelStr = `Femur (Son & Kvadritseps) Kesimi // ${cm} cm`;
                else levelStr = `Tibia & Fibula (Boldir & Panja) Kesimi // ${cm} cm`;

                sliceLevelText.textContent = levelStr;
            }
        });

        // Play/Pause Auto Dissection
        playPauseBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playPauseBtn.classList.toggle('active', isPlaying);
            playPauseText.textContent = isPlaying ? "To'xtatish" : "Avto-yurgazish";
            window.medicalAudio.playClick();
        });

        // Dissection Reset Button (0%)
        document.getElementById('dissectResetBtn').addEventListener('click', () => {
            targetExplode = 0;
            explodeSlider.value = 0;
            isPlaying = false;
            playPauseBtn.classList.remove('active');
            playPauseText.textContent = "Avto-yurgazish";
            window.medicalAudio.playClick();
        });

        // Checkpoint Milestones Click
        document.querySelectorAll('.checkpoint-node').forEach(node => {
            node.addEventListener('click', () => {
                targetExplode = parseFloat(node.dataset.target);
                explodeSlider.value = targetExplode;
                window.medicalAudio.playClick();
            });
        });

        // Dispersion Multiplier Slider
        dispersionSlider.addEventListener('input', (e) => {
            dispersionMultiplier = parseFloat(e.target.value);
            dispersionVal.textContent = `${dispersionMultiplier.toFixed(1)}x`;
            updateDissectionStage(explodeProgress);
        });

        // System Filters (Left sidebar)
        document.querySelectorAll('.system-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.system-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeSystem = btn.dataset.system;
                updateDissectionStage(explodeProgress);
                updateVisibleCount();
                window.medicalAudio.playClick();
            });
        });

        // Region Pills
        document.querySelectorAll('.region-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                document.querySelectorAll('.region-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeRegion = pill.dataset.region;
                updateDissectionStage(explodeProgress);
                updateVisibleCount();
                window.medicalAudio.playClick();
            });
        });

        // Sound Toggle
        soundToggleBtn.addEventListener('click', () => {
            const enabled = window.medicalAudio.toggleSound();
            soundToggleBtn.classList.toggle('active', enabled);
            soundToggleBtn.querySelector('span').textContent = `Ovoz: ${enabled ? 'ON' : 'OFF'}`;
        });

        // X-Ray Mode Toggle
        xrayBtn.addEventListener('click', () => {
            xrayActive = !xrayActive;
            xrayBtn.classList.toggle('active', xrayActive);
            xrayLens.classList.toggle('active', xrayActive);
            window.medicalAudio.playClick();
        });

        // Zoom & Reset buttons
        document.getElementById('zoomInBtn').addEventListener('click', () => {
            zoomLevel = Math.min(2.0, zoomLevel + 0.15);
            applyRigTransform();
            window.medicalAudio.playClick();
        });

        document.getElementById('zoomOutBtn').addEventListener('click', () => {
            zoomLevel = Math.max(0.6, zoomLevel - 0.15);
            applyRigTransform();
            window.medicalAudio.playClick();
        });

        document.getElementById('resetCamBtn').addEventListener('click', () => {
            zoomLevel = 1.0;
            camRotateX = 0;
            camRotateY = 0;
            applyRigTransform();
            window.medicalAudio.playClick();
        });

        // Auto Tour
        document.getElementById('autoTourBtn').addEventListener('click', () => {
            isPlaying = true;
            playPauseBtn.classList.add('active');
            playPauseText.textContent = "To'xtatish";
            targetExplode = targetExplode > 50 ? 0 : 100;
            window.medicalAudio.playClick();
        });

        // Close Inspector
        document.getElementById('closeInspectorBtn').addEventListener('click', () => {
            sidebarRight.classList.add('collapsed');
            window.medicalAudio.stopHeartbeat();
            window.medicalAudio.playClick();
        });

        // Search Input & Autocomplete
        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value.trim());
        });

        // Keyboard Shortcuts
        window.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            if (e.code === 'Space') {
                e.preventDefault();
                playPauseBtn.click();
            } else if (e.code === 'ArrowRight') {
                targetExplode = Math.min(100, targetExplode + 5);
                explodeSlider.value = targetExplode;
            } else if (e.code === 'ArrowLeft') {
                targetExplode = Math.max(0, targetExplode - 5);
                explodeSlider.value = targetExplode;
            } else if (e.code === 'KeyX') {
                xrayBtn.click();
            } else if (e.code === 'KeyM') {
                mouseTrackBtn.click();
            }
        });

        // Document click to close search
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    let lastBodyShiftX = 0;
    let lastBodyScale = 1.0;

    /**
     * Apply Camera & Rig 3D Transform
     */
    function applyRigTransform(shiftX = null, extraScale = null) {
        if (shiftX !== null) lastBodyShiftX = shiftX;
        if (extraScale !== null) lastBodyScale = extraScale;

        const effectiveScale = zoomLevel * lastBodyScale;
        stageRig.style.transform = `translateX(${lastBodyShiftX}px) scale(${effectiveScale}) rotateX(${camRotateX}deg) rotateY(${camRotateY}deg)`;
    }

    /**
     * Update Visible Items Counter in Left Sidebar
     */
    function updateVisibleCount() {
        let count = 0;
        if (typeof ANATOMY_DATABASE !== 'undefined') {
            count = ANATOMY_DATABASE.filter(item => {
                const sysMatch = activeSystem === 'all' || item.system === activeSystem;
                const regMatch = activeRegion === 'all' || item.region === activeRegion;
                return sysMatch && regMatch;
            }).length;
        } else {
            count = PARTS_MANIFEST.length;
        }
        totalVisibleCount.textContent = `${count} ta`;
    }

    /**
     * Handle Search Query across 680+ anatomical structures
     */
    function handleSearch(q) {
        if (!q || q.length < 2) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
            return;
        }

        const query = q.toLowerCase();
        let matches = [];

        if (typeof ANATOMY_DATABASE !== 'undefined') {
            matches = ANATOMY_DATABASE.filter(item => 
                item.name_uz.toLowerCase().includes(query) ||
                item.name_la.toLowerCase().includes(query) ||
                item.name_en.toLowerCase().includes(query)
            ).slice(0, 15);
        }

        if (matches.length === 0) {
            searchResults.innerHTML = `<div style="padding: 12px; color: var(--text-dim); text-align: center;">Hech narsa topilmadi</div>`;
            searchResults.classList.add('active');
            return;
        }

        searchResults.innerHTML = matches.map(item => `
            <div class="search-item" data-id="${item.id}">
                <div class="search-item-info">
                    <span class="search-item-name">${item.name_uz}</span>
                    <span class="search-item-latin">${item.name_la}</span>
                </div>
                <span class="search-item-sys">${item.system_uz || item.system}</span>
            </div>
        `).join('');

        searchResults.classList.add('active');

        // Search item click handler
        searchResults.querySelectorAll('.search-item').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.dataset.id;
                searchResults.classList.remove('active');
                searchInput.value = '';

                // Find matching manifest part or closest anatomical node
                const part = PARTS_MANIFEST.find(p => p.id === id || id.includes(p.id));
                if (part) {
                    targetExplode = Math.max(45, targetExplode);
                    explodeSlider.value = targetExplode;
                    selectAnatomicalPart(part.id);
                } else {
                    selectAnatomicalPart(id);
                }
            });
        });
    }

    // Initialize once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
