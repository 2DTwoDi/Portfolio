const projects = [
  {
    id: 1,
    title: "Nike - Run Free",
    category: "Commercial",
    year: "2024",
    filter: "Commercial",
    client: "NIKE",
    grad: "from-zinc-800",
  },
  {
    id: 2,
    title: "After Hours - Music Film",
    category: "Music Video",
    year: "2024",
    filter: "Music",
    client: "SONY MUSIC",
  },
  {
    id: 3,
    title: "The Last Frame - Short",
    category: "Cinematic",
    year: "2023",
    filter: "Cinematic",
    client: "INDIE",
  },
  {
    id: 4,
    title: "Bloom - Beauty Commercial",
    category: "Commercial",
    year: "2024",
    filter: "Commercial",
    client: "BLOOM",
  },
  {
    id: 5,
    title: "Neon Nights - Travel Reel",
    category: "Reels",
    year: "2023",
    filter: "Reels",
    client: "TRAVEL CO",
  },
  {
    id: 6,
    title: "Arcade - Gaming Montage",
    category: "Reels",
    year: "2025",
    filter: "Reels",
    client: "ARCADE",
  },
];

let activeFilter = "All";
const grid = document.getElementById("workGrid");
const filterWrap = document.getElementById("filters");
const marqueeTrack = document.getElementById("marqueeTrack");

function renderProjects() {
  if (!grid) return;
  const list =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.filter === activeFilter);
  grid.innerHTML = list
    .map(
      (p) => `
    <div class="work-card" data-id="${p.id}">
      <div class="bg" style="background:radial-gradient(120% 80% at 30% 10%,#2a2a2a,#0a0a0a)"></div>
      <div class="overlay">
        <div class="top"><span>${p.client}</span><span>${p.year}</span></div>
        <div>
          <div class="title serif">${p.title}</div>
          <div class="mono" style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.5;margin-top:6px">${p.category}</div>
        </div>
      </div>
      <div class="hover-cta">PLAY</div>
    </div>
  `,
    )
    .join("");
  grid.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = Number(card.dataset.id);
      const proj = projects.find((x) => x.id === id);
      openProject(proj);
    });
    card.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      cursor.querySelector(".label").textContent = "VIEW";
    });
    card.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      cursor.querySelector(".label").textContent = "";
    });
  });
}

function renderFilters() {
  const filters = ["All", "Commercial", "Reels", "Music", "Cinematic"];
  filterWrap.innerHTML = filters
    .map(
      (f) =>
        `<button class="filter ${f === activeFilter ? "active" : ""}" data-f="${f}">${f}</button>`,
    )
    .join("");
  filterWrap.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.f;
      renderFilters();
      renderProjects();
      showToast(`Filter: ${activeFilter}`);
      // observe again
      observeClients();
    });
  });
}

// Modal logic
const projectModal = document.getElementById("projectModal");
const showreelModal = document.getElementById("showreelModal");
const projectIframe = document.getElementById("projectIframe");
const projectMeta = document.getElementById("projectMeta");

function openProject(p) {
  projectMeta.textContent = `${p.category} • ${p.year} — Client: ${p.client}`;
  document.getElementById("projectTitle").textContent = p.title;
  projectIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
  projectModal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeProject() {
  projectModal.classList.remove("open");
  projectIframe.src = "";
  document.body.style.overflow = "";
}
function openShowreel() {
  document.getElementById("showreelIframe").src =
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
  showreelModal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeShowreel() {
  showreelModal.classList.remove("open");
  document.getElementById("showreelIframe").src = "";
  document.body.style.overflow = "";
}

document.getElementById("playShowreel")?.addEventListener("click", openShowreel);
document.getElementById("heroReel")?.addEventListener("click", openShowreel);
document.getElementById("closeProject")?.addEventListener("click", closeProject);
document
  .getElementById("closeShowreel")
  ?.addEventListener("click", closeShowreel);
projectModal?.addEventListener("click", (e) => {
  if (e.target === projectModal) closeProject();
});
showreelModal?.addEventListener("click", (e) => {
  if (e.target === showreelModal) closeShowreel();
});

// Toast
const toastEl = document.getElementById("toast");
function showToast(msg) {
  if (toastEl) {
    toastEl.querySelector("span:last-child").textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove("show"), 3000);
  }
}

// Nav scroll
document.querySelectorAll("[data-scroll]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const id = a.dataset.scroll;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    closeMobile();
    if (id) showToast(`Navigating to ${id}`);
  });
});
document.getElementById("startProjectBtn")?.addEventListener("click", () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  showToast("Start a project — contact");
});

// Mobile
const mobileMenu = document.getElementById("mobileMenu");
function openMobile() {
  if (mobileMenu) {
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}
function closeMobile() {
  if (mobileMenu) {
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }
}
document.getElementById("hamburger")?.addEventListener("click", openMobile);
document.getElementById("closeMobile")?.addEventListener("click", closeMobile);
mobileMenu
  ?.querySelectorAll("[data-scroll]")
  ?.forEach((a) => a.addEventListener("click", closeMobile));

// Form
document.getElementById("contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Message sent — we'll reply in 24h");
  e.target.reset();
});

// Custom cursor
const cursor = document.getElementById("cursor");
let mouseX = -100,
  mouseY = -100,
  curX = -100,
  curY = -100;
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
(function loop() {
  curX += (mouseX - curX) * 0.15;
  curY += (mouseY - curY) * 0.15;
  if (cursor) {
    cursor.style.left = curX + "px";
    cursor.style.top = curY + "px";
  }
  requestAnimationFrame(loop);
})();

// Client cards observer
function observeClients() {
  const els = document.querySelectorAll(".client-card");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in-view");
          obs.unobserve(en.target);
        }
      });
    },
    { threshold: 0.18 },
  );
  els.forEach((el) => obs.observe(el));
}

// Marquee duplicate
if (marqueeTrack) {
  marqueeTrack.innerHTML = marqueeTrack.innerHTML + marqueeTrack.innerHTML;
}

renderFilters();
renderProjects();
observeClients();

// ESC to close modals
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProject();
    closeShowreel();
    closeMobile();
  }
});
