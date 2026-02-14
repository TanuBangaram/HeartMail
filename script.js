
// ==================== SOUND MANAGER ====================
class SoundManager {
  constructor() {
    this.audioContext = null;
  }

  initAudio() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }

  playClick() {
    this.initAudio();
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

    gain.gain.setValueAtTime(0.02, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);

    osc.start();
    osc.stop(this.audioContext.currentTime + 0.05);
  }

  playSend() {
    this.initAudio();
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.2);

    gain.gain.setValueAtTime(0.03, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);

    osc.start();
    osc.stop(this.audioContext.currentTime + 0.2);
  }

  playOpen() {
    this.initAudio();
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.audioContext.destination);

    osc1.type = "sine";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(400, this.audioContext.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(520, this.audioContext.currentTime + 0.12);

    osc2.frequency.setValueAtTime(520, this.audioContext.currentTime + 0.05);
    osc2.frequency.exponentialRampToValueAtTime(640, this.audioContext.currentTime + 0.18);

    gain.gain.setValueAtTime(0.02, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.22);

    osc1.start(this.audioContext.currentTime);
    osc2.start(this.audioContext.currentTime + 0.05);
    osc1.stop(this.audioContext.currentTime + 0.22);
    osc2.stop(this.audioContext.currentTime + 0.22);
  }
}

// ==================== MOCK DATA ====================
const mockData = {
  currentUserTemplate: {
    id: 1,
    name: "luna",
    email: "luna@heartmail.com",
    points: 250,
    streak: 5,
    avatar: "L",
    customUnlocked: false,
  },

  letters: [
    {
      id: 101,
      fromUserId: 2,
      toUserId: 1,
      fromName: "sol",
      content:
        "Dear luna, your letter made my day. The stars seemed brighter last night. I think of you often.\n\nWith love,\nsol",
      sentAt: "2025-02-14T10:30:00",
      read: false,
    },
    {
      id: 102,
      fromUserId: 1,
      toUserId: 2,
      fromName: "luna",
      content:
        "Dear sol, the moon was full last night and I thought of you.\n\nSending you moonlight and dreams.\n\nWith love,\nluna",
      sentAt: "2025-02-10T22:15:00",
      read: true,
    },
  ],

  connections: [
    {
      userId: 1,
      friendId: 2,
      friendName: "sol",
      friendEmail: "sol@heartmail.com",
      streak: 3,
      pet: { type: "moth", bond: 140, name: "Lumen" },
    },
    {
      userId: 1,
      friendId: 3,
      friendName: "nova",
      friendEmail: "nova@heartmail.com",
      streak: 1,
      pet: { type: "crane", bond: 30, name: "Ori" },
    },
  ],

  // user already owns these stickers (kept for compatibility; now displayed as sticker icons too)
  stickersOwned: [
    { id: 1, symbol: "💗", name: "Heart" },
    { id: 2, symbol: "🌸", name: "Flower" },
    { id: 3, symbol: "✨", name: "Sparkle" },
    { id: 4, symbol: "🌙", name: "Moon" },
    { id: 5, symbol: "🦋", name: "Moth" },
    { id: 6, symbol: "🕊️", name: "Crane" },
    { id: 7, symbol: "☁️", name: "Cloud" },
    { id: 8, symbol: "🍓", name: "Strawberry" },
    { id: 9, symbol: "🪷", name: "Lotus" },
    { id: 10, symbol: "🧸", name: "Teddy" },
  ],

  shop: [
    { id: 1, name: "Gold leaf", symbol: "✧", price: 30, category: "stickers" },
    { id: 2, name: "Tiny crown", symbol: "◈", price: 50, category: "add-ons" },
    { id: 3, name: "Pearl", symbol: "◉", price: 25, category: "stickers" },
    { id: 4, name: "Diamond", symbol: "◇", price: 40, category: "add-ons" },
  ],
};

// ==================== HELPERS ====================
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function petSvg(type) {
  if (type === "crane") {
    return `
      <svg viewBox="0 0 220 160" class="pet-svg crane" aria-label="Paper Crane" role="img">
        <defs>
          <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffffff"/>
            <stop offset="1" stop-color="#F0D9D3"/>
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="rgba(0,0,0,.12)"/>
          </filter>
        </defs>
        <path filter="url(#softShadow)" d="M110 35 L150 70 L110 95 L70 70 Z" fill="url(#paper)" stroke="rgba(95,75,59,.22)" stroke-width="2" />
        <path d="M70 70 L20 60 L80 95 Z" fill="url(#paper)" stroke="rgba(95,75,59,.18)" stroke-width="2"/>
        <path d="M150 70 L200 60 L140 95 Z" fill="url(#paper)" stroke="rgba(95,75,59,.18)" stroke-width="2"/>
        <path d="M110 35 L135 20 L150 30 L125 45 Z" fill="url(#paper)" stroke="rgba(95,75,59,.18)" stroke-width="2"/>
        <path d="M145 22 L160 15 L165 25 L150 30 Z" fill="url(#paper)" stroke="rgba(95,75,59,.18)" stroke-width="2"/>
        <path d="M160 15 L178 10 L166 24 Z" fill="#D4BFB7" stroke="rgba(95,75,59,.18)" stroke-width="2"/>
        <circle cx="152" cy="28" r="3.5" fill="rgba(212,191,183,.75)"/>
      </svg>
    `;
  }

  // moth
  return `
    <svg viewBox="0 0 220 160" class="pet-svg moth" aria-label="Moth" role="img">
      <defs>
        <linearGradient id="wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#C1C9BD"/>
          <stop offset="1" stop-color="#FAF7F2"/>
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <path filter="url(#glow)" d="M110 70
        C70 30, 20 55, 45 95
        C60 120, 95 115, 110 95
        C125 115, 160 120, 175 95
        C200 55, 150 30, 110 70 Z"
        fill="url(#wing)" stroke="rgba(95,75,59,.22)" stroke-width="2"/>

      <path d="M70 82 C55 70, 45 80, 52 95 C60 110, 78 104, 82 92"
        fill="rgba(212,191,183,.35)" />
      <path d="M150 82 C165 70, 175 80, 168 95 C160 110, 142 104, 138 92"
        fill="rgba(212,191,183,.35)" />

      <ellipse cx="110" cy="92" rx="10" ry="22" fill="#D4BFB7" stroke="rgba(95,75,59,.22)" stroke-width="2"/>
      <circle cx="110" cy="65" r="9" fill="#F0D9D3" stroke="rgba(95,75,59,.22)" stroke-width="2"/>

      <path d="M106 58 C92 44, 78 44, 70 50" fill="none" stroke="rgba(95,75,59,.35)" stroke-width="3" stroke-linecap="round"/>
      <path d="M114 58 C128 44, 142 44, 150 50" fill="none" stroke="rgba(95,75,59,.35)" stroke-width="3" stroke-linecap="round"/>

      <circle cx="106.5" cy="65" r="2.2" fill="rgba(74,69,64,.85)"/>
      <circle cx="113.5" cy="65" r="2.2" fill="rgba(74,69,64,.85)"/>
      <circle cx="104.8" cy="63.5" r="1" fill="rgba(250,247,242,.9)"/>
      <circle cx="111.8" cy="63.5" r="1" fill="rgba(250,247,242,.9)"/>
    </svg>
  `;
}

function petMeta(pet) {
  const bond = pet?.bond ?? 0;
  const pct = clamp(Math.round((bond / 300) * 100), 0, 100);

  if (pet?.type === "moth") {
    let stage = "Cocoon";
    if (bond >= 300) stage = "Constellation Moth";
    else if (bond >= 150) stage = "Luna Moth";
    else if (bond >= 50) stage = "Mothling";
    return { stage, pct };
  }

  let stage = "Folded Note";
  if (bond >= 300) stage = "Wish Crane";
  else if (bond >= 150) stage = "Embellished Crane";
  else if (bond >= 50) stage = "Crane";
  return { stage, pct };
}

// ==================== APP MANAGER ====================
class AppManager {
  constructor() {
    this.sound = new SoundManager();
    this.user = null;

    // highlighter state
    this.activeHighlight = "#FFF59D";

    // unlock audio on first interaction (iOS requirement)
    document.body.addEventListener("pointerdown", () => this.sound.initAudio(), { once: true });

    this.pages = {
      landingSections: document.querySelectorAll("section"),
      dashboard: document.getElementById("dashboardPage"),
      desk: document.getElementById("deskPage"),
      mailbox: document.getElementById("mailboxPage"),
      pets: document.getElementById("petsPage"),
      connections: document.getElementById("connectionsPage"),
      shop: document.getElementById("shopPage"),
    };

    this.landingNav = document.getElementById("landingNav");
    this.appNav = document.getElementById("appNav");
    this.landingLinks = document.getElementById("landingLinks");

    this.initGlobalClickSound();
    this.initNavButtons();
    this.initDashboard();
    this.initDesk();

    this.restoreSessionOrShowLanding();
  }

  initGlobalClickSound() {
    document.addEventListener("click", (e) => {
      const clickable = e.target.closest(
        "button, .nav-link, .nav-card, .sticker, .mail-item, .pet-card, .row-item, .rail-btn, .paper-stamp"
      );
      if (!clickable) return;
      if (clickable.classList.contains("mail-item")) return; // mailbox uses open sound
      this.sound.playClick();
    });
  }

  restoreSessionOrShowLanding() {
    const saved = localStorage.getItem("heartmail_user");
    if (saved) {
      try {
        this.user = JSON.parse(saved);
        this.showDashboard();
      } catch {
        localStorage.removeItem("heartmail_user");
      }
    }
  }

  // ================= AUTH MODAL =================
  showAuthModal(type) {
    this.sound.playOpen();
    document.querySelector(".modal")?.remove();

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h2 style="text-align:center; margin-bottom: 1.2rem;">
          ${type === "login" ? "Welcome back" : "Begin your journey"}
        </h2>

        ${
          type === "login"
            ? `
          <input type="email" id="loginEmail" class="modal-input" placeholder="Email" value="luna@heartmail.com">
          <input type="password" id="loginPassword" class="modal-input" placeholder="Password" value="hello123">
          <div class="modal-actions">
            <button class="modal-btn primary" id="loginSubmit">Log in</button>
            <button class="modal-btn secondary" id="closeModal">Cancel</button>
          </div>
          <p style="margin-top: 1rem; text-align:center; color: var(--warm-gray); font-size: 0.9rem;">
            Demo: luna@heartmail.com / hello123
          </p>
        `
            : `
          <input type="text" id="signupName" class="modal-input" placeholder="Your name">
          <input type="email" id="signupEmail" class="modal-input" placeholder="Email">
          <input type="password" id="signupPassword" class="modal-input" placeholder="Password">
          <div class="modal-actions">
            <button class="modal-btn primary" id="signupSubmit">Sign up</button>
            <button class="modal-btn secondary" id="closeModal">Cancel</button>
          </div>
        `
        }
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    document.getElementById("closeModal")?.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });

    if (type === "login") {
      document.getElementById("loginSubmit")?.addEventListener("click", () => {
        const email = document.getElementById("loginEmail")?.value?.trim();
        const password = document.getElementById("loginPassword")?.value;

        if (email === "luna@heartmail.com" && password === "hello123") {
          this.user = { ...mockData.currentUserTemplate };
          localStorage.setItem("heartmail_user", JSON.stringify(this.user));
          close();
          this.showDashboard();
        } else {
          alert("Invalid credentials. Try luna@heartmail.com / hello123");
        }
      });
    }

    if (type === "signup") {
      document.getElementById("signupSubmit")?.addEventListener("click", () => {
        const name = document.getElementById("signupName")?.value?.trim();
        const email = document.getElementById("signupEmail")?.value?.trim();
        if (!name) return alert("Please enter your name");

        this.user = {
          ...mockData.currentUserTemplate,
          id: Date.now(),
          name,
          email: email || `${name.toLowerCase()}@heartmail.com`,
          avatar: name.charAt(0).toUpperCase(),
          points: 0,
          streak: 0,
          customUnlocked: false,
        };

        localStorage.setItem("heartmail_user", JSON.stringify(this.user));
        close();
        this.showDashboard();
      });
    }
  }

  // ================= PAGE SWITCHING =================
  hideAllAppPages() {
    Object.values(this.pages).forEach((p) => {
      if (p instanceof HTMLElement) p.classList.add("hidden");
    });
  }

  showDashboard() {
    this.pages.landingSections.forEach((s) => (s.style.display = "none"));
    document.querySelector(".footer") && (document.querySelector(".footer").style.display = "none");

    this.landingLinks && this.landingLinks.classList.add("hidden");
    this.landingNav && this.landingNav.classList.add("hidden");
    this.appNav && this.appNav.classList.remove("hidden");

    this.hideAllAppPages();
    this.pages.dashboard && this.pages.dashboard.classList.remove("hidden");

    this.renderDashboard();
  }

  showPage(pageKey) {
    this.hideAllAppPages();
    this.pages[pageKey] && this.pages[pageKey].classList.remove("hidden");

    if (pageKey === "desk") this.updateDeskUnlockUI();
    if (pageKey === "mailbox") this.renderMailbox();
    if (pageKey === "connections") this.renderConnections();
    if (pageKey === "pets") this.renderPets();
    if (pageKey === "shop") this.renderShop();
  }

  // ================= NAV =================
  initNavButtons() {
    document.getElementById("loginBtn")?.addEventListener("click", () => this.showAuthModal("login"));
    document.getElementById("signupBtn")?.addEventListener("click", () => this.showAuthModal("signup"));
    document.getElementById("getStartedBtn")?.addEventListener("click", () => this.showAuthModal("signup"));

    document.querySelectorAll(".backBtn").forEach((btn) => {
      btn.addEventListener("click", () => this.showDashboard());
    });

    document.querySelectorAll(".navAppBtn").forEach((btn) => {
      btn.addEventListener("click", () => this.showPage(btn.dataset.page));
    });

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      localStorage.removeItem("heartmail_user");
      this.user = null;

      this.appNav && this.appNav.classList.add("hidden");
      this.landingLinks && this.landingLinks.classList.remove("hidden");
      this.landingNav && this.landingNav.classList.remove("hidden");

      this.hideAllAppPages();
      this.pages.landingSections.forEach((s) => (s.style.display = "block"));
      document.querySelector(".footer") && (document.querySelector(".footer").style.display = "block");
    });
  }

  // ================= DASHBOARD =================
  initDashboard() {
    document.querySelectorAll(".nav-card").forEach((card) => {
      card.addEventListener("click", () => this.showPage(card.dataset.page));
    });
  }

  renderDashboard() {
    if (!this.user) return;

    document.getElementById("dashGreeting").textContent = `Welcome back, ${this.user.name}`;
    document.getElementById("dashPoints").textContent = this.user.points ?? 0;
    document.getElementById("dashConnections").textContent = mockData.connections.length;
    document.getElementById("dashLetters").textContent = mockData.letters.length;

    // unlock custom at 300
    if ((this.user.points ?? 0) >= 300 && !this.user.customUnlocked) {
      this.user.customUnlocked = true;
      alert("✨ Custom designs unlocked!\nYou can now upload your own stickers.");
    }

    localStorage.setItem("heartmail_user", JSON.stringify(this.user));
    this.updateDeskUnlockUI();
  }

  // ================= DESK =================
  initDesk() {
    const editor = document.getElementById("letterInput"); // contenteditable div
    const fontSelect = document.getElementById("fontSelect");
    const themeSelect = document.getElementById("themeSelect");
    const sendBtn = document.getElementById("sendLetterBtn");
    const uploadBtn = document.getElementById("uploadStickerBtn");
    const paper = document.getElementById("letterPaper");
    const stampsLayer = document.getElementById("paperStamps");

    // add paper curls elements
    if (paper && !paper.querySelector(".paper-curl")) {
      const curl1 = document.createElement("div");
      curl1.className = "paper-curl tl";
      const curl2 = document.createElement("div");
      curl2.className = "paper-curl br";
      paper.appendChild(curl1);
      paper.appendChild(curl2);
    }

    // font toggle sets CSS variable (clean)
    fontSelect?.addEventListener("change", (e) => {
      document.documentElement.style.setProperty("--letter-font", e.target.value);
      editor?.focus();
    });

    // theme mock (optional hook)
    themeSelect?.addEventListener("change", () => {
      this.sound.playClick();
    });

    // sticker rail + tray (tray kept so nothing breaks visually)
    this.renderStickers();

    // highlighter rail
    this.renderHighlighters();

    // upload sticker (unlocked at 300) - kept original behavior (emoji), but it will become a stamp icon (fallback)
    uploadBtn?.addEventListener("click", () => {
      if (!this.user) return alert("Log in first 💌");
      if (!this.user.customUnlocked) return alert("Unlock at 300 points ✨");

      const emoji = prompt("Enter an emoji/symbol for your custom sticker ✨ (example: 🐈, 🍒, 💌)");
      if (!emoji) return;

      mockData.stickersOwned.push({
        id: Date.now(),
        symbol: emoji.trim(),
        name: "Custom",
      });

      this.renderStickers();
      alert("Sticker added to your tray ✨");
    });

    // send letter: fold + envelope seal + fly
    sendBtn?.addEventListener("click", () => {
      if (!this.user) return alert("Please log in first 💌");

      const content = (editor?.innerText || "").trim();
      if (!content) return alert("Write something first 💌");

      this.sound.playSend();

      const letterPaper = document.querySelector(".letter-paper");
      letterPaper?.classList.add("fold");

      this.animateEnvelopeSend();

      setTimeout(() => {
        mockData.letters.unshift({
          id: Date.now(),
          fromUserId: this.user.id ?? 999,
          toUserId: this.user.id ?? 999,
          fromName: this.user.name ?? "you",
          content,
          sentAt: new Date().toISOString(),
          read: false,
        });

        // points + bond gain
        this.user.points = (this.user.points || 0) + 10;
        this.bumpBondForRecipient();

        // clear editor + stamps
        if (editor) editor.innerHTML = "";
        if (stampsLayer) stampsLayer.innerHTML = "";

        letterPaper?.classList.remove("fold");

        this.renderDashboard();
      }, 900);
    });
  }

  updateDeskUnlockUI() {
    const uploadBtn = document.getElementById("uploadStickerBtn");
    if (!uploadBtn) return;

    if (this.user?.customUnlocked) uploadBtn.classList.remove("hidden");
    else uploadBtn.classList.add("hidden");
  }

  bumpBondForRecipient() {
    const recipient = document.getElementById("recipientInput")?.value?.trim();
    if (!recipient) return;

    const conn = mockData.connections.find((c) => c.friendEmail === recipient);
    if (!conn) return;

    conn.pet = conn.pet || { type: "moth", bond: 0, name: "pet" };
    conn.pet.bond = Math.min(300, (conn.pet.bond || 0) + 12);
  }

  // ==================== STICKERS (rail + optional tray) ====================
  makeStickerSVG(sticker) {
    // use ID-based icons for consistent "sticker" look
    const id = sticker?.id;

    const icons = {
      1: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 21s-7-4.35-9.5-8.7C.8 8.8 3 6 6 6c1.7 0 3 .9 4 2 1-1.1 2.3-2 4-2 3 0 5.2 2.8 3.5 6.3C19 16.65 12 21 12 21Z"
              fill="rgba(212,191,183,.95)" stroke="rgba(95,75,59,.18)" stroke-width="1.2"/>
          </svg>`,
      2: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 12c3.2-5.2 7-4 7-1.2 0 2.5-2.6 3.5-4.6 3.2 1.6 1.2 2.2 3.6.2 4.8-2.4 1.4-4.2-1.3-2.6-3.6-1.6 2.3-4.3 5-6.6 3.6-2-1.2-1.4-3.6.2-4.8-2 .3-4.6-.7-4.6-3.2C1 8 4.8 6.8 8 12c1-1.2 2.2-2 4-2s3 .8 4 2Z"
              fill="rgba(240,217,211,.95)" stroke="rgba(95,75,59,.16)" stroke-width="1.1"/>
          </svg>`,
      3: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l1.2 6.2L20 12l-6.8 3.8L12 22l-1.2-6.2L4 12l6.8-3.8L12 2Z"
              fill="rgba(250,247,242,.95)" stroke="rgba(95,75,59,.18)" stroke-width="1.2"/>
          </svg>`,
      4: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M15.5 21c-6.5 0-11-4.6-11-10.6C4.5 6.2 7.5 3 11.6 3c.6 0 1.2.1 1.8.2-3.2 1.1-5.5 4.2-5.5 7.8 0 4.6 3.6 8.3 8.1 8.5-.3.3-.9 1.5-.5 1.5Z"
              fill="rgba(212,191,183,.9)" stroke="rgba(95,75,59,.18)" stroke-width="1.1"/>
          </svg>`,
      5: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 7c-4-4-9-1-7 4 1 2.7 4.2 4 7 2.8 2.8 1.2 6-.1 7-2.8 2-5-3-8-7-4Z"
              fill="rgba(193,201,189,.9)" stroke="rgba(95,75,59,.18)" stroke-width="1.1"/>
          </svg>`,
      6: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 4l6 6-6 3-6-3 6-6Z" fill="rgba(250,247,242,.95)" stroke="rgba(95,75,59,.18)" stroke-width="1.1"/>
            <path d="M6 10l-3 2 6 4 3-3-6-3Z" fill="rgba(240,217,211,.9)" stroke="rgba(95,75,59,.14)" stroke-width="1.1"/>
            <path d="M18 10l3 2-6 4-3-3 6-3Z" fill="rgba(240,217,211,.9)" stroke="rgba(95,75,59,.14)" stroke-width="1.1"/>
          </svg>`,
      7: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M7.5 18.5c-2.5 0-4.5-1.8-4.5-4.1 0-2 1.5-3.6 3.6-4 1-2.4 3.4-4.1 6.2-4.1 3.7 0 6.7 2.9 6.7 6.4 1.6.4 2.8 1.8 2.8 3.7 0 2.2-1.9 4-4.3 4H7.5Z"
              fill="rgba(250,247,242,.95)" stroke="rgba(95,75,59,.16)" stroke-width="1.1"/>
          </svg>`,
      8: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 21c4.5-2.5 7-6 7-9.2C19 7.5 16.6 5 13.7 5c-1.2 0-2.3.4-3.2 1.1C9.6 5.4 8.5 5 7.3 5 4.4 5 2 7.5 2 11.8 2 15 4.5 18.5 9 21"
              fill="rgba(255,214,231,.85)" stroke="rgba(95,75,59,.16)" stroke-width="1.1"/>
          </svg>`,
      9: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 3c2 3 2.2 6.2 0 8.5C9.8 9.2 10 6 12 3Z" fill="rgba(230,214,255,.85)" stroke="rgba(95,75,59,.14)" stroke-width="1"/>
            <path d="M6 10c3 0 5 1.5 6 3 1-1.5 3-3 6-3-1 3-3.5 6-6 6s-5-3-6-6Z"
              fill="rgba(212,191,183,.75)" stroke="rgba(95,75,59,.16)" stroke-width="1.1"/>
          </svg>`,
      10: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <path d="M8 11c-1.7-2.5-.5-5 2-5 1 0 1.7.4 2 1 .3-.6 1-1 2-1 2.5 0 3.7 2.5 2 5"
              fill="rgba(212,191,183,.85)" stroke="rgba(95,75,59,.16)" stroke-width="1.1" stroke-linecap="round"/>
            <path d="M7 12c0 5 10 5 10 0" fill="rgba(240,217,211,.85)" stroke="rgba(95,75,59,.14)" stroke-width="1.1" stroke-linecap="round"/>
          </svg>`,
      default: `<svg class="sticker-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="7" fill="rgba(212,191,183,.85)" stroke="rgba(95,75,59,.18)" stroke-width="1.2"/>
          </svg>`,
    };

    // If it's a custom sticker (emoji/symbol), show it but still in a sticker UI
    if (!icons[id] && sticker?.symbol) {
      return `<span style="font-size: 1.25rem; filter: drop-shadow(0 2px 1px rgba(0,0,0,.08));">${sticker.symbol}</span>`;
    }

    return icons[id] || icons.default;
  }

  addStickerStamp(stickerId) {
    const paper = document.getElementById("letterPaper");
    const layer = document.getElementById("paperStamps");
    if (!paper || !layer) return;

    const sticker = mockData.stickersOwned.find((s) => s.id === stickerId);
    if (!sticker) return;

    const stamp = document.createElement("div");
    stamp.className = "paper-stamp";
    stamp.style.setProperty("--rot", `${(Math.random() * 12 - 6).toFixed(1)}deg`);
    stamp.innerHTML = this.makeStickerSVG(sticker);

    // position relative to paper
    const rect = paper.getBoundingClientRect();
    const x = 90 + Math.random() * Math.max(80, rect.width - 240);
    const y = 70 + Math.random() * Math.max(80, rect.height - 220);
    stamp.style.left = `${x}px`;
    stamp.style.top = `${y}px`;

    layer.appendChild(stamp);
    this.initStampDrag(stamp, paper);
  }

  initStampDrag(el, paper) {
    let startX = 0,
      startY = 0,
      origX = 0,
      origY = 0,
      dragging = false;

    const clampToPaper = () => {
      const pr = paper.getBoundingClientRect();
      const er = el.getBoundingClientRect();

      // current within paper coordinates (we store as left/top in paper space)
      let left = parseFloat(el.style.left || "0");
      let top = parseFloat(el.style.top || "0");

      const maxLeft = pr.width - er.width - 10;
      const maxTop = pr.height - er.height - 10;

      left = clamp(left, 10, maxLeft);
      top = clamp(top, 10, maxTop);

      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    };

    const onDown = (e) => {
      dragging = true;
      const p = e.touches ? e.touches[0] : e;
      startX = p.clientX;
      startY = p.clientY;
      origX = parseFloat(el.style.left || "0");
      origY = parseFloat(el.style.top || "0");
      try {
        el.setPointerCapture?.(e.pointerId);
      } catch {}
      e.preventDefault();
    };

    const onMove = (e) => {
      if (!dragging) return;
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - startX;
      const dy = p.clientY - startY;
      el.style.left = `${origX + dx}px`;
      el.style.top = `${origY + dy}px`;
      clampToPaper();
    };

    const onUp = () => {
      dragging = false;
      clampToPaper();
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    // (Optional) double click to delete sticker stamp
    el.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      el.remove();
    });
  }

  renderStickers() {
    // LEFT rail
    const rail = document.getElementById("stickerRail");
    if (rail) {
      rail.innerHTML = mockData.stickersOwned
        .slice(0, 9)
        .map(
          (s) => `
        <button class="rail-btn sticker-btn" title="${s.name}" data-id="${s.id}">
          ${this.makeStickerSVG(s)}
        </button>
      `
        )
        .join("");

      rail.querySelectorAll("[data-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = Number(btn.dataset.id);
          this.addStickerStamp(id);
        });
      });
    }

    // keep original tray behavior too (so nothing feels removed)
    const tray = document.getElementById("stickerTray");
    const editor = document.getElementById("letterInput");
    if (!tray || !editor) return;

    tray.innerHTML = mockData.stickersOwned
      .map((s) => `<span class="sticker" title="${s.name}">${s.symbol}</span>`)
      .join("");

    tray.querySelectorAll(".sticker").forEach((sticker) => {
      sticker.addEventListener("click", () => {
        // same old behavior: inserts symbol into text (kept for compatibility)
        editor.focus();
        document.execCommand("insertText", false, ` ${sticker.textContent} `);
      });
    });
  }

  // ==================== HIGHLIGHTERS ====================
  renderHighlighters() {
    const rail = document.getElementById("highlightRail");
    const editor = document.getElementById("letterInput");
    if (!rail || !editor) return;

    const colors = [
      { name: "Lemon", value: "#FFF59D" },
      { name: "Blush", value: "#FFD6E7" },
      { name: "Mint", value: "#CFF7D4" },
      { name: "Sky", value: "#CFE9FF" },
      { name: "Lavender", value: "#E6D6FF" },
    ];

    this.activeHighlight = colors[0].value;

    const applyHighlight = (color) => {
      editor.focus();
      try {
        document.execCommand("hiliteColor", false, color);
      } catch {
        document.execCommand("backColor", false, color);
      }
    };

    rail.innerHTML = colors
      .map(
        (c, idx) => `
      <button class="rail-btn hl-btn ${idx === 0 ? "active" : ""}"
        style="--hl:${c.value}" title="${c.name}" data-hl="${c.value}"></button>
    `
      )
      .join("");

    rail.querySelectorAll("[data-hl]").forEach((btn) => {
      btn.addEventListener("click", () => {
        rail.querySelectorAll(".hl-btn").forEach((x) => x.classList.remove("active"));
        btn.classList.add("active");
        this.activeHighlight = btn.dataset.hl;
      });

      // double click = apply highlight immediately
      btn.addEventListener("dblclick", () => applyHighlight(btn.dataset.hl));
    });

    // Ctrl/Cmd + H to apply highlight in active color
    editor.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "h") {
        e.preventDefault();
        applyHighlight(this.activeHighlight);
      }
    });
  }

  animateEnvelopeSend() {
    const env = document.createElement("div");
    env.className = "envelope-fly";
    env.innerHTML = `
      <div class="envelope-body"></div>
      <div class="envelope-flap"></div>
      <div class="envelope-seal">💌</div>
    `;
    document.body.appendChild(env);
    setTimeout(() => env.remove(), 1200);
  }

  animateEnvelopeOpen() {
    const env = document.createElement("div");
    env.className = "envelope-open";
    env.innerHTML = `
      <div class="envelope-fly" style="position:relative; left:auto; top:auto; transform:none; animation:none;">
        <div class="envelope-body"></div>
        <div class="envelope-flap"></div>
        <div class="envelope-seal">✧</div>
      </div>
    `;
    document.body.appendChild(env);
    setTimeout(() => env.remove(), 520);
  }

  // ================= MAILBOX =================
  renderMailbox() {
    const list = document.getElementById("mailboxList");
    if (!list) return;

    list.innerHTML = `<div class="mailbox-shell" id="mailboxShell"></div>`;
    const shell = document.getElementById("mailboxShell");

    const letters = mockData.letters.slice().sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt));

    if (!letters.length) {
      shell.innerHTML = `<p style="color: var(--warm-gray);">No letters yet…</p>`;
      return;
    }

    shell.innerHTML = letters
      .map((l) => {
        const date = new Date(l.sentAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });
        const snippet = l.content.length > 60 ? l.content.slice(0, 60) + "…" : l.content;
        return `
          <div class="mail-item ${l.read ? "" : "mail-unread"}" data-id="${l.id}">
            <div class="mail-left">
              <div class="mail-from">${l.fromName}</div>
              <div class="mail-snippet">${snippet}</div>
            </div>
            <div class="mail-right">${date}</div>
          </div>
        `;
      })
      .join("");

    shell.querySelectorAll(".mail-item").forEach((item) => {
      item.addEventListener("click", () => {
        const id = Number(item.dataset.id);
        const letter = mockData.letters.find((x) => x.id === id);
        if (!letter) return;

        letter.read = true;
        this.sound.playOpen();
        this.animateEnvelopeOpen();
        this.openLetterModal(letter);

        this.renderMailbox();
        this.renderDashboard();
      });
    });
  }

  openLetterModal(letter) {
    document.querySelector(".modal")?.remove();

    const date = new Date(letter.sentAt).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h2 style="margin-bottom: .5rem;">From: ${letter.fromName}</h2>
        <p style="color: var(--warm-gray); margin-bottom: 1.25rem;">${date}</p>

        <div style="background: var(--cream); border: 1px solid var(--sand); border-radius: 20px; padding: 1rem; max-height: 40vh; overflow:auto;">
          <p style="white-space: pre-wrap; color: var(--charcoal); line-height: 1.8;">${letter.content}</p>
        </div>

        <div class="modal-actions">
          <button class="modal-btn primary" id="replyLetterBtn">Reply</button>
          <button class="modal-btn secondary" id="closeLetterModal">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    document.getElementById("closeLetterModal").onclick = close;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });

    document.getElementById("replyLetterBtn").onclick = () => {
      close();
      this.showPage("desk");
      const recipient = document.getElementById("recipientInput");
      if (recipient) recipient.value = `${letter.fromName}@heartmail.com`;
      const editor = document.getElementById("letterInput");
      if (editor) {
        editor.innerHTML = "";
        editor.focus();
        document.execCommand("insertText", false, `Dear ${letter.fromName},\n\n`);
      }
    };
  }

  // ================= CONNECTIONS =================
  renderConnections() {
    const box = document.getElementById("connectionsList");
    if (!box) return;

    box.innerHTML = `<div class="row-shell" id="connectionsShell"></div>`;
    const shell = document.getElementById("connectionsShell");

    shell.innerHTML = mockData.connections
      .map((c) => {
        const pet = c.pet || { type: "moth", bond: 0, name: "pet" };
        const meta = petMeta(pet);

        return `
          <div class="row-item">
            <div class="row-left">
              <div class="row-title">${c.friendName}</div>
              <div class="row-sub">${c.friendEmail} · streak ${c.streak}</div>
              <div class="row-sub">Pet: ${pet.type === "moth" ? "Moth" : "Paper Crane"} · ${meta.stage} · bond ${pet.bond} · name: ${pet.name || "—"}</div>
            </div>

            <div class="row-right">
              <div class="pet-picker" data-friend="${c.friendId}">
                <button class="pet-pill ${pet.type === "moth" ? "active" : ""}" data-type="moth">🦋 Moth</button>
                <button class="pet-pill ${pet.type === "crane" ? "active" : ""}" data-type="crane">🕊️ Crane</button>
              </div>
              <button class="pet-pill" data-action="name" data-friend="${c.friendId}">Name</button>
              <button class="pet-pill" data-action="write" data-email="${c.friendEmail}">Write</button>
            </div>
          </div>
        `;
      })
      .join("");

    shell.querySelectorAll(".pet-picker .pet-pill").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const type = btn.dataset.type;
        const picker = btn.closest(".pet-picker");
        const friendId = Number(picker.dataset.friend);

        const conn = mockData.connections.find((x) => x.friendId === friendId);
        if (!conn) return;

        conn.pet = conn.pet || { type: "moth", bond: 0, name: "" };
        conn.pet.type = type;

        this.renderConnections();
        this.renderPets();
      });
    });

    shell.querySelectorAll('[data-action="name"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const friendId = Number(btn.dataset.friend);
        const conn = mockData.connections.find((x) => x.friendId === friendId);
        if (!conn) return;

        conn.pet = conn.pet || { type: "moth", bond: 0, name: "" };
        const newName = prompt("Name your pet ✨", conn.pet.name || "");
        if (newName === null) return;
        conn.pet.name = newName.trim() || conn.pet.name;

        this.renderConnections();
        this.renderPets();
      });
    });

    shell.querySelectorAll('[data-action="write"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const email = btn.dataset.email;
        this.showPage("desk");
        const recipient = document.getElementById("recipientInput");
        if (recipient) recipient.value = email;
      });
    });
  }

  // ================= PETS =================
  renderPets() {
    const grid = document.getElementById("petsGrid");
    if (!grid) return;

    grid.classList.add("pets-grid");

    if (!mockData.connections.length) {
      grid.innerHTML = `<p style="color: var(--warm-gray);">No pets yet — add a connection first.</p>`;
      return;
    }

    grid.innerHTML = mockData.connections
      .map((c) => {
        c.pet = c.pet || { type: "moth", bond: 0, name: "" };
        const meta = petMeta(c.pet);

        return `
          <div class="pet-card">
            <div class="pet-top">
              <div>
                <div class="row-title">${c.friendName}</div>
                <div class="pet-meta">${c.pet.type === "moth" ? "Moth" : "Paper Crane"} · ${meta.stage}${
          c.pet.name ? ` · “${c.pet.name}”` : ""
        }</div>
              </div>
              <div>${petSvg(c.pet.type)}</div>
            </div>

            <div class="pet-meta">Bond: ${c.pet.bond} / 300</div>
            <div class="pet-progress">
              <div class="pet-progress-fill" style="width:${meta.pct}%;"></div>
            </div>

            <div style="margin-top: .9rem; display:flex; gap:.6rem; flex-wrap: wrap;">
              <button class="pet-pill" data-action="write" data-email="${c.friendEmail}">Write</button>
              <button class="pet-pill" data-action="name" data-friend="${c.friendId}">Name</button>
              <button class="pet-pill" data-action="details" data-friend="${c.friendId}">Details</button>
            </div>
          </div>
        `;
      })
      .join("");

    grid.querySelectorAll('[data-action="write"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const email = btn.dataset.email;
        this.showPage("desk");
        const recipient = document.getElementById("recipientInput");
        if (recipient) recipient.value = email;
      });
    });

    grid.querySelectorAll('[data-action="name"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const friendId = Number(btn.dataset.friend);
        const conn = mockData.connections.find((x) => x.friendId === friendId);
        if (!conn) return;

        conn.pet = conn.pet || { type: "moth", bond: 0, name: "" };
        const newName = prompt("Name your pet ✨", conn.pet.name || "");
        if (newName === null) return;
        conn.pet.name = newName.trim() || conn.pet.name;

        this.renderPets();
        this.renderConnections();
      });
    });

    grid.querySelectorAll('[data-action="details"]').forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const friendId = Number(btn.dataset.friend);
        const conn = mockData.connections.find((x) => x.friendId === friendId);
        if (!conn) return;

        const meta = petMeta(conn.pet);
        this.sound.playOpen();
        alert(
          `${conn.friendName}'s Pet\n\nType: ${conn.pet.type}\nStage: ${meta.stage}\nBond: ${conn.pet.bond}/300\n\nWrite letters to increase bond ✨`
        );
      });
    });
  }

  // ================= SHOP =================
  renderShop() {
    const box = document.getElementById("shopList");
    if (!box) return;

    box.innerHTML = `<div class="row-shell">${mockData.shop
      .map(
        (i) => `
      <div class="row-item">
        <div class="row-left">
          <div class="row-title">${i.symbol} ${i.name}</div>
          <div class="row-sub">${i.category}</div>
        </div>
        <div class="row-right">${i.price} pts</div>
      </div>
    `
      )
      .join("")}</div>`;
  }
}

// ==================== INITIALIZE APP ====================
document.addEventListener("DOMContentLoaded", () => {
  window.app = new AppManager();
});








