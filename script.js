const tables = [
  {
    id: "table-a",
    name: "Table A",
    group: "新婦友人",
    guests: [
      { name: "佐藤 翔太", relation: "大学友人", note: "いつも明るいムードメーカー" },
      { name: "山本 千秋", relation: "高校友人", note: "旅行仲間" },
      { name: "鈴木 大輔", relation: "職場同期", note: "頼れる相談相手" }
    ]
  },
  {
    id: "table-b",
    name: "Table B",
    group: "新郎友人",
    guests: [
      { name: "伊藤 詩織", relation: "大学友人", note: "サークル仲間" },
      { name: "中村 結衣", relation: "幼なじみ", note: "小学校からの親友" },
      { name: "小林 咲良", relation: "職場先輩", note: "お酒好き" }
    ]
  },
  {
    id: "table-c",
    name: "Table C",
    group: "新郎職場",
    guests: [
      { name: "田中 健一", relation: "上司", note: "温かく見守ってくださる存在" },
      { name: "松本 和也", relation: "同期", note: "仕事帰りのごはん仲間" },
      { name: "井上 大輔", relation: "先輩", note: "頼れる兄のような人" }
    ]
  },
  {
    id: "table-d",
    name: "Table D",
    group: "新婦親族",
    guests: [
      { name: "渡辺 果歩", relation: "従姉", note: "小さい頃からの憧れ" },
      { name: "石川 結衣", relation: "叔母", note: "いつも優しい相談相手" },
      { name: "村上 千尋", relation: "従妹", note: "笑顔がかわいい妹のような存在" }
    ]
  }
];

const menus = [
  {
    id: "course",
    title: "Special food",
    lead: "季節の素材を中心にした、軽やかなフルコース。",
    items: [
      { name: "Amuse-bouche", desc: "季節野菜の小さな一皿", allergy: "乳" },
      { name: "Entrée", desc: "瀬戸内海産オマール海老のカクテル", allergy: "えび" },
      { name: "Poisson", desc: "真鯛のポワレ 香草ソース", allergy: "小麦" },
      { name: "Dessert", desc: "苺のミルフィーユ", allergy: "卵・乳・小麦" }
    ]
  },
  {
    id: "drink",
    title: "Drink",
    lead: "乾杯から食後まで楽しめるアルコールメニュー。",
    items: [
      { name: "Glass Wine", desc: "白 / 赤" },
      { name: "Beer", desc: "キリン一番搾り / オールフリー" },
      { name: "Cocktail", desc: "カシスオレンジ / ジントニック" },
      { name: "Sake", desc: "八海山 / 黒龍" }
    ]
  },
  {
    id: "soft",
    title: "Soft Drink",
    lead: "ノンアルコールで楽しめる定番ドリンク。",
    items: [
      { name: "Tea", desc: "烏龍茶 / 緑茶" },
      { name: "Juice", desc: "オレンジ / グレープフルーツ" },
      { name: "Soda", desc: "ジンジャーエール / コーラ / 炭酸水" }
    ]
  }
];

const seatList = document.querySelector("#seat-list");
const seatDetail = document.querySelector("#seat-detail");
const menuList = document.querySelector("#menu-list");
const menuDetail = document.querySelector("#menu-detail");
const menuToggle = document.querySelector(".menu-toggle");
const drawerMenu = document.querySelector(".drawer-menu");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function setView(listEl, detailEl, mode) {
  listEl.classList.toggle("is-active", mode === "list");
  detailEl.classList.toggle("is-active", mode === "detail");
}

function renderSeatList() {
  seatList.innerHTML = tables.map((table) => {
    const letter = table.name.replace("Table ", "");
    return `
      <button class="table-card reveal pop-in" type="button" data-table-id="${table.id}">
        <span class="table-letter">${escapeHtml(letter)}</span>
        <h3>${escapeHtml(table.name)}</h3>
        <p>${escapeHtml(table.group)} / ${table.guests.length}名</p>
      </button>
    `;
  }).join("");
}

function renderSeatDetail(tableId) {
  const table = tables.find((item) => item.id === tableId);
  if (!table) return;

  seatDetail.innerHTML = `
    <button class="back-button" type="button" data-back-seat>Back</button>
    <div class="detail-title">
      <p class="editorial-label">${escapeHtml(table.group)}</p>
      <h3>${escapeHtml(table.name)}</h3>
    </div>
    <ul class="guest-list">
      ${table.guests.map((guest) => `
        <li class="guest-card">
          <strong>${escapeHtml(guest.name)}</strong>
          <span>${escapeHtml(guest.relation)}</span>
          <p>${escapeHtml(guest.note)}</p>
        </li>
      `).join("")}
    </ul>
  `;
  setView(seatList, seatDetail, "detail");
  document.querySelector("#seat").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderMenuList() {
  menuList.innerHTML = menus.map((menu) => `
    <button class="menu-card reveal pop-in" type="button" data-menu-id="${menu.id}">
      <span class="menu-number">${String(menus.indexOf(menu) + 1).padStart(2, "0")}</span>
      <p class="editorial-label">Tap to read</p>
      <h3>${escapeHtml(menu.title)}</h3>
      <p>${escapeHtml(menu.lead)}</p>
    </button>
  `).join("");
}

function renderMenuDetail(menuId) {
  const menu = menus.find((item) => item.id === menuId);
  if (!menu) return;

  menuDetail.innerHTML = `
    <button class="back-button" type="button" data-back-menu>Back</button>
    <div class="detail-title">
      <p class="editorial-label">Wedding dinner</p>
      <h3>${escapeHtml(menu.title)}</h3>
    </div>
    <div class="menu-table">
      ${menu.items.map((item) => `
        <div class="menu-row">
          <strong>${escapeHtml(item.name)}</strong>
          <p>${escapeHtml(item.desc)}</p>
          <span class="allergy">${item.allergy ? `Allergy / ${escapeHtml(item.allergy)}` : ""}</span>
        </div>
      `).join("")}
    </div>
  `;
  setView(menuList, menuDetail, "detail");
  document.querySelector("#menu").scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupInteractions() {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll("[data-menu-close], .drawer-menu a").forEach((item) => {
    item.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  seatList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-table-id]");
    if (button) renderSeatDetail(button.dataset.tableId);
  });

  seatDetail.addEventListener("click", (event) => {
    if (event.target.closest("[data-back-seat]")) {
      setView(seatList, seatDetail, "list");
    }
  });

  menuList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-menu-id]");
    if (button) renderMenuDetail(button.dataset.menuId);
  });

  menuDetail.addEventListener("click", (event) => {
    if (event.target.closest("[data-back-menu]")) {
      setView(menuList, menuDetail, "list");
    }
  });
}

function setupReveal() {
  const targets = document.querySelectorAll(".reveal, .image-reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  targets.forEach((target, index) => {
    target.style.setProperty("--delay", `${Math.min(index % 4, 3) * 90}ms`);
    observer.observe(target);
  });
}

function setupParallax() {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const movingPhotos = document.querySelectorAll(".collage-photo, .parallax-card, .ranking-card, .thanks-photo");
  if (motionQuery.matches || !movingPhotos.length) return;

  window.addEventListener("scroll", () => {
    const viewport = window.innerHeight || 1;
    movingPhotos.forEach((photo, index) => {
      const rect = photo.getBoundingClientRect();
      const progress = (rect.top - viewport) / (viewport + rect.height);
      const clamped = Math.max(-1, Math.min(1, progress));
      const y = clamped * -18;
      const x = (index % 2 === 0 ? 1 : -1) * clamped * 10;
      const scale = 1 + Math.max(0, 1 - Math.abs(clamped)) * 0.018;
      photo.style.translate = `${x}px ${y}px`;
      photo.style.scale = scale;
    });
  }, { passive: true });
}

renderSeatList();
renderMenuList();
setupInteractions();
setupReveal();
setupParallax();
