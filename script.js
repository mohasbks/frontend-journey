class Piano {
    constructor() {
        this.keys = document.querySelectorAll('.key');
        this.volumeControl = document.getElementById('volume');
        this.soundWaves = document.querySelector('.sound-waves');
        this.audioContext = null;
        this.sounds = {};
        this.isLoaded = false;
        
        this.keyMap = {
            'a': 'C', 's': 'D', 'd': 'E', 'f': 'F',
            'g': 'G', 'h': 'A', 'j': 'B',
            'w': 'C#', 'e': 'D#', 't': 'F#', 'y': 'G#', 'u': 'A#'
        };
        
        this.init();
    }
    
    async init() {
        await this.loadSounds();
        this.setupEventListeners();
        this.showLoadingComplete();
    }
    
    async loadSounds() {
        const soundFiles = [
            'kick.wav', 'snare.wav', 'hihat.wav', 'clap.wav',
            'boom.wav', 'tink.wav', 'tom.wav', 'openhat.wav', 'ride.wav'
        ];
        
        for (const file of soundFiles) {
            try {
                const audio = new Audio(file);
                audio.preload = 'auto';
                audio.volume = 0.7;
                this.sounds[file] = audio;
                
                
                await new Promise((resolve, reject) => {
                    audio.addEventListener('canplaythrough', resolve);
                    audio.addEventListener('error', reject);
                    audio.load();
                });
            } catch (error) {
                console.warn(`Could not load sound: ${file}`, error);
            }
        }
        
        this.isLoaded = true;
    }
    
    setupEventListeners() {
        
        this.keys.forEach(key => {
            key.addEventListener('mousedown', (e) => this.playKey(e.target));
            key.addEventListener('mouseup', (e) => this.releaseKey(e.target));
            key.addEventListener('mouseleave', (e) => this.releaseKey(e.target));
            
           
            key.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.playKey(e.target);
            });
            key.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.releaseKey(e.target);
            });
        });
        
        
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        
        this.volumeControl.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });
        
        
        document.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        }, { once: true });
    }
    
    playKey(keyElement) {
        if (!this.isLoaded || keyElement.classList.contains('active')) return;
        
        const soundFile = keyElement.getAttribute('data-sound');
        const note = keyElement.getAttribute('data-note');
        
        keyElement.classList.add('active');
        this.createParticles(keyElement);
        this.showSoundWaves();
        
        
        
        this.playSound(soundFile);
        
        
        this.createRipple(keyElement);
    }
    
    releaseKey(keyElement) {
        keyElement.classList.remove('active');
    }
    
    handleKeyDown(e) {
        const key = e.key.toLowerCase();
        if (this.keyMap[key] && !e.repeat) {
            const note = this.keyMap[key];
            const keyElement = document.querySelector(`[data-note="${note}"]`);
            if (keyElement) {
                this.playKey(keyElement);
            }
        }
    }
    
    handleKeyUp(e) {
        const key = e.key.toLowerCase();
        if (this.keyMap[key]) {
            const note = this.keyMap[key];
            const keyElement = document.querySelector(`[data-note="${note}"]`);
            if (keyElement) {
                this.releaseKey(keyElement);
            }
        }
    }
    
    async playSound(soundFile) {
        if (!this.isLoaded || !this.sounds[soundFile]) return;
        
        try {
            const audio = this.sounds[soundFile];
            audio.currentTime = 0; 
            audio.volume = this.volumeControl.value / 100;
            await audio.play();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }
    
    createImpulseResponse(duration, decay, reverse) {
        const sampleRate = this.audioContext.sampleRate;
        const length = sampleRate * duration;
        const impulse = this.audioContext.createBuffer(2, length, sampleRate);
        
        for (let channel = 0; channel < 2; channel++) {
            const channelData = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                const n = reverse ? length - i : i;
                channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
            }
        }
        
        return impulse;
    }
    
    createParticles(keyElement) {
        const rect = keyElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            particle.style.left = centerX + (Math.random() - 0.5) * 20 + 'px';
            particle.style.top = centerY + (Math.random() - 0.5) * 20 + 'px';
            particle.style.background = 'rgba(52,73,94,0.4)';
            particle.style.width = '4px';
            particle.style.height = '4px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 800);
        }
    }
    
    createRipple(keyElement) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(52,73,94,0.2)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.4s ease-out';
        ripple.style.left = '50%';
        ripple.style.top = '80%';
        ripple.style.width = '15px';
        ripple.style.height = '15px';
        ripple.style.marginLeft = '-7.5px';
        ripple.style.marginTop = '-7.5px';
        ripple.style.pointerEvents = 'none';
        
        keyElement.style.position = 'relative';
        keyElement.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 400);
    }
    
    showSoundWaves() {
        this.soundWaves.classList.add('active');
        setTimeout(() => {
            this.soundWaves.classList.remove('active');
        }, 1000);
    }
    
    setVolume(volume) {
        
    }
    
    showLoadingComplete() {
        const notification = document.createElement('div');
        notification.textContent = '🎵 الأصوات جاهزة للعزف!';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = 'rgba(76, 175, 80, 0.9)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '25px';
        notification.style.fontSize = '14px';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}


const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
    new Piano();
});


document.addEventListener('DOMContentLoaded', () => {
    
    setInterval(() => {
        if (Math.random() < 0.1) { 
            createFloatingNote();
        }
    }, 2000);
});

function createFloatingNote() {
    const notes = ['♪', '♫', '♬', '♩', '♭', '♯'];
    const note = document.createElement('div');
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.position = 'fixed';
    note.style.left = Math.random() * window.innerWidth + 'px';
    note.style.top = window.innerHeight + 'px';
    note.style.fontSize = '24px';
    note.style.color = 'rgba(255, 255, 255, 0.3)';
    note.style.pointerEvents = 'none';
    note.style.zIndex = '1';
    note.style.animation = 'floatUp 8s linear forwards';
    
    document.body.appendChild(note);
    
    setTimeout(() => {
        if (note.parentNode) {
            note.parentNode.removeChild(note);
        }
    }, 8000);
}


const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);
