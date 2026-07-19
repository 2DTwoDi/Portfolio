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

function saveTools() {
  localStorage.setItem("filmage_tools", JSON.stringify(tools));
}

loadTools();

const adminTableBody = document.getElementById("adminTableBody");
const adminForm = document.getElementById("adminForm");
const adminManagerView = document.getElementById("adminManagerView");
const adminFormView = document.getElementById("adminFormView");
const adminImportView = document.getElementById("adminImportView");
const adminExportView = document.getElementById("adminExportView");

function showView(view) {
  adminManagerView.style.display = view === "manager" ? "block" : "none";
  adminFormView.style.display = view === "form" ? "block" : "none";
  adminImportView.style.display = view === "import" ? "block" : "none";
  adminExportView.style.display = view === "export" ? "block" : "none";
}

function showToast(msg) {
  const t = document.getElementById("toast");
  const tm = document.getElementById("toastMsg");
  if (t && tm) {
    tm.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove("show"), 3000);
  }
}

function renderAdminTable() {
  if (!adminTableBody) return;
  adminTableBody.innerHTML = tools.map((t, idx) => `
    <tr>
      <td class="icon-cell">${t.icon || "⚙"}</td>
      <td style="font-weight: 500;">${t.name}</td>
      <td class="mono"><span style="border: 1px solid var(--border); padding: 2px 6px; font-size: 9px; opacity: 0.7;">${t.badge || "TOOL"}</span></td>
      <td class="mono" style="font-weight: 500;">${t.price}</td>
      <td>
        <div class="table-actions">
          <button class="btn-table" onclick="openEditForm(${idx})">Edit</button>
          <button class="btn-table btn-delete" onclick="deleteTool(${idx})">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function openAddForm() {
  document.getElementById("formTitle").textContent = "Add New Tool";
  document.getElementById("toolIndex").value = "";
  adminForm.reset();
  showView("form");
}

function openEditForm(idx) {
  const t = tools[idx];
  if (!t) return;
  
  document.getElementById("formTitle").textContent = "Edit Tool";
  document.getElementById("toolIndex").value = idx;
  document.getElementById("toolName").value = t.name;
  document.getElementById("toolPrice").value = t.price;
  document.getElementById("toolIcon").value = t.icon || "";
  document.getElementById("toolBadge").value = t.badge || "";
  document.getElementById("toolDesc").value = t.desc || "";
  document.getElementById("toolDownloadUrl").value = t.downloadUrl || "";
  
  showView("form");
}

function saveToolForm() {
  const idxVal = document.getElementById("toolIndex").value;
  const name = document.getElementById("toolName").value.trim();
  const price = document.getElementById("toolPrice").value.trim();
  const icon = document.getElementById("toolIcon").value.trim();
  const badge = document.getElementById("toolBadge").value.trim();
  const desc = document.getElementById("toolDesc").value.trim();
  const downloadUrl = document.getElementById("toolDownloadUrl").value.trim();
  
  if (!name || !price || !icon || !badge || !desc) {
    showToast("Please fill in all required fields");
    return;
  }
  
  const toolData = { name, price, icon, badge, desc, downloadUrl };
  
  if (idxVal !== "") {
    const idx = Number(idxVal);
    tools[idx] = toolData;
    showToast(`Tool "${name}" updated`);
  } else {
    tools.push(toolData);
    showToast(`Tool "${name}" added`);
  }
  
  saveTools();
  renderAdminTable();
  showView("manager");
}

function deleteTool(idx) {
  const t = tools[idx];
  if (!t) return;
  const name = t.name;
  tools.splice(idx, 1);
  saveTools();
  renderAdminTable();
  showToast(`Deleted "${name}"`);
}

function resetToDefaults() {
  tools = JSON.parse(JSON.stringify(defaultTools));
  saveTools();
  renderAdminTable();
  showToast("Restored default tools list");
}

function exportToolsJson() {
  const text = document.getElementById("exportJsonTextarea");
  text.value = JSON.stringify(tools, null, 2);
  showView("export");
}

function copyExportJson() {
  const text = document.getElementById("exportJsonTextarea");
  text.select();
  try {
    document.execCommand("copy");
    showToast("Export JSON copied to clipboard");
  } catch (err) {
    showToast("Copy failed");
  }
}

function doImportJson() {
  const raw = document.getElementById("importJsonTextarea").value.trim();
  if (!raw) {
    showToast("Please paste valid JSON data");
    return;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("Data must be a JSON Array");
    }
    for (let t of parsed) {
      if (!t.name || !t.price || !t.icon || !t.badge || !t.desc) {
        throw new Error(`Tool "${t.name || 'Unnamed'}" is missing required keys.`);
      }
    }
    tools = parsed;
    saveTools();
    renderAdminTable();
    showView("manager");
    showToast("Import successful!");
  } catch (err) {
    showToast("Import failed: " + err.message);
  }
}

// Bind events
document.getElementById("adminAddBtn").addEventListener("click", openAddForm);
document.getElementById("adminResetBtn").addEventListener("click", resetToDefaults);
document.getElementById("adminExportBtn").addEventListener("click", exportToolsJson);
document.getElementById("adminImportBtn").addEventListener("click", () => {
  document.getElementById("importJsonTextarea").value = "";
  showView("import");
});

document.getElementById("adminSaveBtn").addEventListener("click", saveToolForm);
document.getElementById("adminCancelBtn").addEventListener("click", () => showView("manager"));

document.getElementById("adminDoImportBtn").addEventListener("click", doImportJson);
document.getElementById("adminCancelImportBtn").addEventListener("click", () => showView("manager"));

document.getElementById("adminCopyBtn").addEventListener("click", copyExportJson);
document.getElementById("adminCloseExportBtn").addEventListener("click", () => showView("manager"));

// Global scope binds MUST be before renderAdminTable so onclick handlers can find them
window.openEditForm = openEditForm;
window.deleteTool = deleteTool;

// Init populate
renderAdminTable();
})();
