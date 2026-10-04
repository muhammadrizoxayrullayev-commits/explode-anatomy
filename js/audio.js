// Web Audio API Synthesizer for Medical Interface Sounds
class MedicalAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.heartbeatInterval = null;
        this.isHeartbeating = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSound() {
        this.enabled = !this.enabled;
        if (!this.enabled && this.isHeartbeating) {
            this.stopHeartbeat();
        }
        return this.enabled;
    }

    // Holographic UI click / tap
    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
    }

    // Organ select / target lock
    playSelect() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.05); // A5

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.18);
    }

    // Slider scrubbing whoosh
    playScrub(progress) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        // Throttle sound during fast scrubs
        const now = this.ctx.currentTime;
        if (this.lastScrub && now - this.lastScrub < 0.06) return;
        this.lastScrub = now;

        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        const baseFreq = 120 + progress * 240;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.05);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400 + progress * 800, now);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    // Realistic heart beat sound (lub-dub)
    playHeartbeat() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Lub (First sound)
        this._beatThump(now, 65, 0.22, 0.12);
        // Dub (Second sound, slightly higher and faster)
        this._beatThump(now + 0.16, 85, 0.18, 0.10);
    }

    _beatThump(time, startFreq, volume, duration) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.exponentialRampToValueAtTime(30, time + duration);

        gain.gain.setValueAtTime(volume, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + duration);
    }

    startHeartbeatLoop(bpm = 72) {
        if (this.isHeartbeating) return;
        this.isHeartbeating = true;
        const intervalMs = (60 / bpm) * 1000;
        this.playHeartbeat();
        this.heartbeatInterval = setInterval(() => {
            if (this.isHeartbeating) {
                this.playHeartbeat();
            }
        }, intervalMs);
    }

    stopHeartbeat() {
        this.isHeartbeating = false;
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    // Stethoscope: Lung breath sound (inhalation & exhalation)
    playBreathing() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Noise buffer for air flow
        const bufferSize = this.ctx.sampleRate * 1.2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.15;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(350, now);
        filter.frequency.linearRampToValueAtTime(600, now + 0.6);
        filter.frequency.linearRampToValueAtTime(250, now + 1.2);
        filter.Q.value = 3.0;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.5);
        gain.gain.linearRampToValueAtTime(0.01, now + 1.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
        noise.stop(now + 1.2);
    }

    // Laser Dissection Scan sweep sound
    playScanSweep() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.15);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    }
}

window.medicalAudio = new MedicalAudioEngine();
