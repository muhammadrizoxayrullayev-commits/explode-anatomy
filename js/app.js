/**
 * ANATOMA 3D // BIO-EXPLODE APPLICATION CORE
 * Interactive Human Anatomy Dissection & Exploded View Engine
 */

(function () {
    'use strict';

    // 22 Pre-segmented Organ and Muscle Parts with 3D Explode Vectors
    const PARTS_MANIFEST = [
        { "id": "head_muscles", "name": "Bosh va yuz muskullari", "latin": "Musculi capitis et faciei", "system": "muscular", "region": "head", "dx": 0, "dy": -130, "dz": 100, "image": "part_head_muscles.png", "w": 160, "h": 190, "x": 320, "y": 40, "cx": 400, "cy": 135 },
        { "id": "pectoralis_major", "name": "Katta ko'krak mushagi", "latin": "Musculus pectoralis major", "system": "muscular", "region": "chest", "dx": 0, "dy": -40, "dz": 140, "image": "part_pectoralis_major.png", "w": 280, "h": 140, "x": 260, "y": 270, "cx": 400, "cy": 340 },
        { "id": "deltoid_left", "name": "Chap deltasimon mushak", "latin": "Musculus deltoideus sinister", "system": "muscular", "region": "chest", "dx": -170, "dy": -30, "dz": 110, "image": "part_deltoid_left.png", "w": 130, "h": 180, "x": 180, "y": 240, "cx": 245, "cy": 330 },
        { "id": "deltoid_right", "name": "O'ng deltasimon mushak", "latin": "Musculus deltoideus dexter", "system": "muscular", "region": "chest", "dx": 170, "dy": -30, "dz": 110, "image": "part_deltoid_right.png", "w": 130, "h": 180, "x": 490, "y": 240, "cx": 555, "cy": 330 },
        { "id": "arm_left", "name": "Chap qo'l (Biceps)", "latin": "Musculus biceps brachii sin.", "system": "muscular", "region": "arm", "dx": -210, "dy": 20, "dz": 90, "image": "part_arm_left.png", "w": 160, "h": 220, "x": 110, "y": 360, "cx": 190, "cy": 470 },
        { "id": "arm_right", "name": "O'ng qo'l (Biceps)", "latin": "Musculus biceps brachii dex.", "system": "muscular", "region": "arm", "dx": 210, "dy": 20, "dz": 90, "image": "part_arm_right.png", "w": 160, "h": 220, "x": 530, "y": 360, "cx": 610, "cy": 470 },
        { "id": "hand_left", "name": "Chap kaft & bilak", "latin": "Musculi manus et antebrachii sin.", "system": "muscular", "region": "arm", "dx": -250, "dy": 80, "dz": 70, "image": "part_hand_left.png", "w": 180, "h": 230, "x": 30, "y": 540, "cx": 120, "cy": 655 },
        { "id": "hand_right", "name": "O'ng kaft & bilak", "latin": "Musculi manus et antebrachii dex.", "system": "muscular", "region": "arm", "dx": 250, "dy": 80, "dz": 70, "image": "part_hand_right.png", "w": 180, "h": 230, "x": 590, "y": 540, "cx": 680, "cy": 655 },
        { "id": "rectus_abdominis", "name": "Qorin to'g'ri mushagi (Press)", "latin": "Musculus rectus abdominis", "system": "muscular", "region": "abdomen", "dx": 0, "dy": 50, "dz": 150, "image": "part_rectus_abdominis.png", "w": 180, "h": 260, "x": 310, "y": 380, "cx": 400, "cy": 510 },
        { "id": "quadriceps_left", "name": "Chap son (Kvadritseps)", "latin": "Musculus quadriceps femoris sin.", "system": "muscular", "region": "leg", "dx": -150, "dy": 130, "dz": 90, "image": "part_quadriceps_left.png", "w": 180, "h": 330, "x": 210, "y": 640, "cx": 300, "cy": 805 },
        { "id": "quadriceps_right", "name": "O'ng son (Kvadritseps)", "latin": "Musculus quadriceps femoris dex.", "system": "muscular", "region": "leg", "dx": 150, "dy": 130, "dz": 90, "image": "part_quadriceps_right.png", "w": 180, "h": 330, "x": 410, "y": 640, "cx": 500, "cy": 805 },
        { "id": "calves_left", "name": "Chap boldir (Ikra)", "latin": "Musculus gastrocnemius sin.", "system": "muscular", "region": "leg", "dx": -160, "dy": 210, "dz": 70, "image": "part_calves_left.png", "w": 160, "h": 380, "x": 230, "y": 960, "cx": 310, "cy": 1150 },
        { "id": "calves_right", "name": "O'ng boldir (Ikra)", "latin": "Musculus gastrocnemius dex.", "system": "muscular", "region": "leg", "dx": 160, "dy": 210, "dz": 70, "image": "part_calves_right.png", "w": 160, "h": 380, "x": 410, "y": 960, "cx": 490, "cy": 1150 },
        { "id": "brain", "name": "Bosh miya", "latin": "Cerebrum & Encephalon", "system": "nervous", "region": "head", "dx": 0, "dy": -200, "dz": 180, "image": "part_brain.png", "w": 160, "h": 150, "x": 320, "y": 50, "cx": 400, "cy": 125 },
        { "id": "heart", "name": "Yurak", "latin": "Cor", "system": "cardiovascular", "region": "chest", "dx": -60, "dy": -30, "dz": 240, "image": "part_heart.png", "w": 80, "h": 100, "x": 365, "y": 330, "cx": 405, "cy": 380 },
        { "id": "lungs", "name": "O'pka", "latin": "Pulmones", "system": "respiratory", "region": "chest", "dx": 0, "dy": -50, "dz": 190, "image": "part_lungs.png", "w": 240, "h": 170, "x": 280, "y": 270, "cx": 400, "cy": 355 },
        { "id": "liver", "name": "Jigar", "latin": "Hepar", "system": "digestive", "region": "abdomen", "dx": -120, "dy": 50, "dz": 210, "image": "part_liver.png", "w": 130, "h": 100, "x": 305, "y": 410, "cx": 370, "cy": 460 },
        { "id": "stomach", "name": "Oshqozon", "latin": "Gaster", "system": "digestive", "region": "abdomen", "dx": 120, "dy": 50, "dz": 210, "image": "part_stomach.png", "w": 100, "h": 100, "x": 390, "y": 410, "cx": 440, "cy": 460 },
        { "id": "intestines", "name": "Ichaklar", "latin": "Intestinum tenue et colon", "system": "digestive", "region": "abdomen", "dx": 0, "dy": 140, "dz": 220, "image": "part_intestines.png", "w": 180, "h": 190, "x": 310, "y": 490, "cx": 400, "cy": 585 },
        { "id": "skull", "name": "Kalla suyagi", "latin": "Cranium", "system": "skeletal", "region": "head", "dx": 0, "dy": -260, "dz": -100, "image": "part_skull.png", "w": 160, "h": 170, "x": 320, "y": 40, "cx": 400, "cy": 125 },
        { "id": "ribcage", "name": "Ko'krak qafasi & qovurg'alar", "latin": "Thorax et Costae", "system": "skeletal", "region": "chest", "dx": 0, "dy": -80, "dz": -130, "image": "part_ribcage.png", "w": 260, "h": 240, "x": 270, "y": 240, "cx": 400, "cy": 360 },
        { "id": "pelvis", "name": "Tos suyagi", "latin": "Pelvis", "system": "skeletal", "region": "pelvis", "dx": 0, "dy": 100, "dz": -120, "image": "part_pelvis.png", "w": 260, "h": 170, "x": 270, "y": 550, "cx": 400, "cy": 635 }
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

    // --- STAGE DEFINITIONS ---
    const STAGES = [
        { min: 0, max: 20, name: "1-BOSQICH: TERI VA TASHQI QAVAT", sub: "Haqiqiy odam ko'rinishi: teri qatlami ajralishga tayyor" },
        { min: 20, max: 40, name: "2-BOSQICH: TERI QATLAMI AJRALISHI", sub: "Epidermis va teri lateral tomonga ochilib, mushaklar qavati ochiladi" },
        { min: 40, max: 65, name: "3-BOSQICH: MUSHAKLAR PORTLASHI", sub: "Ko'krak, yelka, press, son va boldir mushaklari alohida guruhlarga ajraladi" },
        { min: 65, max: 85, name: "4-BOSQICH: SKELET VA ICHKI A'ZOLAR", sub: "Yurak, o'pka, jigar, oshqozon va kalla suyagi fonga suzib chiqadi" },
        { min: 85, max: 100, name: "5-BOSQICH: MIKROSKOPIK & QON-TOMIR TO'RI", sub: "Magistral arteriyalar, neyronlar, kapillyarlar va chuqur to'qimalar fazoda yoyiladi" }
    ];

    /**
     * Initialize Application
     */
    function init() {
        renderSegmentedParts();
        setupEventListeners();
        setupECGMonitor();
        updateDissectionStage(0);
        updateVisibleCount();

        // Start render loop
        requestAnimationFrame(renderLoop);
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
            img.alt = part.name;
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
     */
    function updateDissectionStage(val) {
        const p = Math.max(0, Math.min(100, val));
        explodePercentBadge.textContent = `${Math.round(p)}%`;

        // Update Stage Badge text
        const currentStage = STAGES.find(s => p >= s.min && p <= s.max) || STAGES[0];
        stageName.textContent = currentStage.name;
        stageSubtext.textContent = currentStage.sub;

        // 1. Skin Halves Lateral Separation (Peeling effect)
        const skinOpen = Math.min(1, p / 35); // 0 to 1 as p goes 0 to 35
        const skinShiftX = skinOpen * 180 * dispersionMultiplier;
        const skinRotY = skinOpen * 35;
        const skinOpacity = Math.max(0, 1 - (p / 40));

        skinLeft.style.transform = `translateX(-${skinShiftX}px) rotateY(-${skinRotY}deg) translateZ(${skinOpen * 40}px)`;
        skinRight.style.transform = `translateX(${skinShiftX}px) rotateY(${skinRotY}deg) translateZ(${skinOpen * 40}px)`;
        layerSkin.style.opacity = skinOpacity;

        // 2. Base Muscle Layer Opacity & Separation
        const muscleBaseOpacity = p < 20 ? 1 : Math.max(0.15, 1 - (p - 20) / 60);
        layerMuscles.style.opacity = muscleBaseOpacity;

        // 3. Skeleton Layer Elevation
        const skelZ = (p / 100) * -80 * dispersionMultiplier;
        const skelOpacity = p < 15 ? (p / 15) : 1;
        layerSkeleton.style.transform = `translateZ(${skelZ}px)`;
        layerSkeleton.style.opacity = skelOpacity;

        // 4. Visceral Organs Elevation
        const organsZ = (p / 100) * 110 * dispersionMultiplier;
        layerOrgans.style.transform = `translateZ(${organsZ}px)`;

        // 5. Circulatory Tree Glow & Spread
        const circZ = (p / 100) * 160 * dispersionMultiplier;
        layerCirculatory.style.transform = `translateZ(${circZ}px) scale(${1 + (p / 500)})`;
        layerCirculatory.style.opacity = p > 30 ? Math.min(1, (p - 30) / 40) : 0;

        // 6. Explode Segmented Parts & Draw Hologram SVG Cables
        let svgLinesHtml = '';
        const baseW = 800;
        const baseH = 1400;

        // Effective separation factor
        const sepFactor = Math.max(0, (p - 10) / 90);

        PARTS_MANIFEST.forEach(part => {
            const partEl = document.getElementById(`part_${part.id}`);
            const labelEl = document.getElementById(`label_${part.id}`);
            if (!partEl || !labelEl) return;

            // System filter visibility
            const isSystemMatch = activeSystem === 'all' || part.system === activeSystem;
            const isRegionMatch = activeRegion === 'all' || part.region === activeRegion;
            const isVisible = isSystemMatch && isRegionMatch;

            if (!isVisible) {
                partEl.style.opacity = '0.08';
                partEl.style.pointerEvents = 'none';
                labelEl.style.display = 'none';
                return;
            } else {
                partEl.style.opacity = '1';
                partEl.style.pointerEvents = 'auto';
            }

            // Calculate current exploded offsets
            const curDx = part.dx * sepFactor * dispersionMultiplier;
            const curDy = part.dy * sepFactor * dispersionMultiplier;
            const curDz = part.dz * sepFactor * dispersionMultiplier;

            // Apply 3D Transform to Part
            partEl.style.transform = `translate3d(${curDx}px, ${curDy}px, ${curDz}px)`;

            // Calculate exploded center in 800x1400 coordinates
            const originX = part.cx;
            const originY = part.cy;
            const explodedX = originX + curDx;
            const explodedY = originY + curDy;

            // Position Label under/near the exploded part
            const labelPosX = (explodedX / baseW) * 100;
            // Position label slightly below the bottom edge of part
            const labelPosY = ((explodedY + (part.h / 2) + 24) / baseH) * 100;

            labelEl.style.left = `${labelPosX}%`;
            labelEl.style.top = `${labelPosY}%`;

            // Label visibility based on explosion threshold
            const showLabel = p > 18 && isVisible;
            labelEl.style.display = showLabel ? 'block' : 'none';
            labelEl.style.opacity = showLabel ? Math.min(1, (p - 18) / 15) : 0;

            // Draw SVG connecting cable from origin to exploded point
            if (p > 18 && isVisible && (Math.abs(curDx) > 8 || Math.abs(curDy) > 8)) {
                svgLinesHtml += `
                    <line x1="${originX}" y1="${originY}" x2="${explodedX}" y2="${explodedY}" class="cable-line" />
                    <circle cx="${originX}" cy="${originY}" r="4" class="cable-point" />
                    <circle cx="${explodedX}" cy="${explodedY}" r="4" class="cable-point" />
                `;
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

        // Viewport Mouse Move for continuous scrubbing
        window.addEventListener('mousemove', (e) => {
            if (mouseTrackMode) {
                // Map mouse X across screen to 0 - 100%
                const pct = (e.clientX / window.innerWidth) * 100;
                targetExplode = Math.max(0, Math.min(100, pct));
                explodeSlider.value = targetExplode;
                window.medicalAudio.playScrub(targetExplode / 100);
            }

            // 3D Parallax tilt on rig
            const normX = (e.clientX / window.innerWidth) - 0.5;
            const normY = (e.clientY / window.innerHeight) - 0.5;
            camRotateY = normX * 16;
            camRotateX = -normY * 12;
            applyRigTransform();

            // X-Ray lens tracking
            if (xrayActive) {
                xrayLens.style.left = `${e.clientX}px`;
                xrayLens.style.top = `${e.clientY}px`;
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

    /**
     * Apply Camera & Rig 3D Transform
     */
    function applyRigTransform() {
        stageRig.style.transform = `scale(${zoomLevel}) rotateX(${camRotateX}deg) rotateY(${camRotateY}deg)`;
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
