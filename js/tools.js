(function () {
const defaultTools = [
  {
    name: "Filmage Cut",
    price: "$49",
    icon: "✂",
    badge: "BESTSELLER",
    desc: "Auto podcast cuts",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-cut"
  },
  {
    name: "Filmage Captions",
    price: "$59",
    icon: "Aa",
    badge: "NEW",
    desc: "Auto subtitles",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-captions"
  },
  {
    name: "Filmage Transitions",
    price: "$39",
    icon: "⇄",
    badge: "150+",
    desc: "Seamless transitions",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-transitions"
  },
  {
    name: "Motion Pack",
    price: "$29",
    icon: "◐",
    badge: "300+",
    desc: "Presets & elements",
    downloadUrl: "https://filimagemedia.gumroad.com/l/motion-pack"
  },
  {
    name: "Filmage Sync",
    price: "$45",
    icon: "♪",
    badge: "BEAT SYNC",
    desc: "Auto beat sync",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-sync"
  },
  {
    name: "Filmage Glow",
    price: "$19",
    icon: "◧",
    badge: "GLOW",
    desc: "Light leaks",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-glow"
  },
  {
    name: "Filmage Cleaner",
    price: "$25",
    icon: "✦",
    badge: "AI",
    desc: "Audio clean",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-cleaner"
  },
  {
    name: "Filmage Resize",
    price: "$15",
    icon: "⧉",
    badge: "9:16",
    desc: "Auto reframe",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-resize"
  },
  {
    name: "Filmage Export",
    price: "$22",
    icon: "↗",
    badge: "FAST",
    desc: "Smart export",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-export"
  },
  {
    name: "Filmage Stabilize",
    price: "$30",
    icon: "◎",
    badge: "STABLE",
    desc: "Warp stabilize+",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-stabilize"
  },
  {
    name: "Filmage Color",
    price: "$35",
    icon: "◑",
    badge: "LUTs",
    desc: "Color grades",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-color"
  },
  {
    name: "Filmage Type",
    price: "$18",
    icon: "T",
    badge: "TYPE",
    desc: "Text animators",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-type"
  },
  {
    name: "Filmage SFX",
    price: "$12",
    icon: "◩",
    badge: "SFX",
    desc: "Whoosh pack",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-sfx"
  },
  {
    name: "Filmage Logo",
    price: "$20",
    icon: "◫",
    badge: "REVEAL",
    desc: "Logo reveals",
    downloadUrl: "https://filimagemedia.gumroad.com/l/filmage-logo"
  },
  {
    name: "Pro Bundle",
    price: "$149",
    icon: "★",
    badge: "SAVE $92",
    desc: "All plugins",
    downloadUrl: "https://filimagemedia.gumroad.com/l/pro-bundle"
  },
];

let tools = [];
function loadTools() {
  const stored = localStorage.getItem("filmage_tools");
  if (stored) {
    try {
      tools = JSON.parse(stored);
    } catch (e) {
      tools = JSON.parse(JSON.stringify(defaultTools));
    }
  } else {
    tools = JSON.parse(JSON.stringify(defaultTools));
    localStorage.setItem("filmage_tools", JSON.stringify(tools));
  }
}

loadTools();

const grid = document.getElementById("toolsGrid");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");

function render() {
  if (!grid) return;
  grid.innerHTML = tools
    .map(
      (t, i) => `
    <div class="tool-card">
      <div class="tool-thumb">
        <span class="tool-thumb-icon">${t.icon || "⚙"}</span>
      </div>
      <div class="tool-badge">${t.badge || "TOOL"}</div>
      <div class="tool-info">
        <div class="tool-name">${t.name}</div>
        <div class="tool-desc">${t.desc}</div>
      </div>
      <div class="tool-foot">
        <span class="price">${t.price || "FREE"}</span>
        <button class="dl" data-name="${t.name}" data-url="${t.downloadUrl || ""}">Download</button>
      </div>
    </div>
  `,
    )
    .join("");

  grid.querySelectorAll(".dl").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const name = btn.dataset.name;
      const url = btn.dataset.url;
      
      showToast(`Downloading ${name}...`);
      
      if (url) {
        window.open(url, "_blank");
      }
      
      btn.textContent = "...";
      setTimeout(() => {
        btn.textContent = "Done ✓";
        setTimeout(() => (btn.textContent = "Download"), 2000);
      }, 1200);
    });
  });
}

function showToast(msg) {
  if (toastMsg && toast) {
    toastMsg.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove("show"), 3000);
  }
}

render();
})();
