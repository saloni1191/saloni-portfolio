// ===== Helpers =====
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];

const yearEl = qs("#year");
yearEl.textContent = new Date().getFullYear();

// ===== Mobile nav =====
const navToggle = qs("#navToggle");
const navLinks = qs("#navLinks");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

qsa('a[href^="#"]', navLinks).forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Scroll progress =====
const progress = qs("#progress");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
});

// ===== Work Data (PLACEHOLDERS NOW) =====
// Replace image paths later with your actual work images in /assets
const WORK = [
  {
    id: "p1",
    title: "Brand Identity Kit",
    category: "branding",
    categoryLabel: "Branding",
    desc: "A clean identity system built for consistency across digital touchpoints.",
    tools: "Illustrator • Photoshop",
    role: "Concept • Identity • Brand Assets",
    image: "assets/work-1.jpg"
  },
  {
    id: "p2",
    title: "Social Media Campaign",
    category: "social",
    categoryLabel: "Social",
    desc: "Bold campaign creatives designed to increase engagement and recall.",
    tools: "Photoshop • Illustrator",
    role: "Creative Direction • Design",
    image: "assets/work-2.jpg"
  },
  {
    id: "p3",
    title: "Ad Creative Set",
    category: "ads",
    categoryLabel: "Ads",
    desc: "Conversion-focused key visuals with clean hierarchy and strong CTA space.",
    tools: "Photoshop",
    role: "Concept • Design • Deliverables",
    image: "assets/work-3.jpg"
  },
  {
    id: "p4",
    title: "Packaging Design",
    category: "packaging",
    categoryLabel: "Packaging",
    desc: "Premium packaging layout with strong shelf impact and clear product messaging.",
    tools: "Illustrator • InDesign",
    role: "Layout • Print-ready Files",
    image: "assets/work-4.jpg"
  },
  {
    id: "p5",
    title: "3D Concept Visual",
    category: "3d",
    categoryLabel: "3D",
    desc: "A playful concept visual combining product + story for social-first content.",
    tools: "Photoshop • 3D Tool",
    role: "Concept • Composition",
    image: "assets/work-5.jpg"
  },
  {
    id: "p6",
    title: "Brand Posters / Key Visuals",
    category: "ads",
    categoryLabel: "Ads",
    desc: "High-impact poster series with strong typography and bold spacing.",
    tools: "Photoshop • Illustrator",
    role: "Design • Output",
    image: "assets/work-6.jpg"
  }
];

// ===== Render Work Grid =====
const grid = qs("#workGrid");

function renderWork(items){
  grid.innerHTML = items.map(item => `
    <article class="cardWork" data-category="${item.category}" data-id="${item.id}" tabindex="0" role="button" aria-label="Open ${item.title}">
      <div class="cardWork__media" style="--img:url('${item.image}')"></div>
      <div class="cardWork__body">
        <h3 class="cardWork__title">${item.title}</h3>
        <div class="cardWork__meta">
          <span class="badge">${item.categoryLabel}</span>
          <span>•</span>
          <span>${item.tools}</span>
        </div>
      </div>
    </article>
  `).join("");

  // click + keyboard open
  qsa(".cardWork", grid).forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.id));
    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " ") openModal(card.dataset.id);
    });
  });
}

renderWork(WORK);

// ===== Filtering =====
const chips = qsa(".chip");
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const f = chip.dataset.filter;
    if(f === "all") renderWork(WORK);
    else renderWork(WORK.filter(w => w.category === f));
  });
});

// ===== Modal =====
const modal = qs("#modal");
const modalMedia = qs("#modalMedia");
const modalCategory = qs("#modalCategory");
const modalTitle = qs("#modalTitle");
const modalDesc = qs("#modalDesc");
const modalTools = qs("#modalTools");
const modalRole = qs("#modalRole");

function openModal(id){
  const item = WORK.find(w => w.id === id);
  if(!item) return;

  modalMedia.style.backgroundImage =
    `linear-gradient(135deg, rgba(225,6,0,.12), rgba(17,17,17,.08)), url('${item.image}')`;
  modalCategory.textContent = item.categoryLabel;
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.desc;
  modalTools.textContent = item.tools;
  modalRole.textContent = item.role;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

qsa("[data-close]", modal).forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});
