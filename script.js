// ===== Helpers =====
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

// Year
const yearEl = qs("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Mobile nav =====
const navToggle = qs("#navToggle");
const navLinks = qs("#navLinks");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

qsa('a[href^="#"]', navLinks).forEach((a) => {
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
  if (progress) progress.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
});

// ===== WORK DATA (EDIT THIS LATER ONLY) =====
// Replace images in /assets and update this text when you add your real work.
const WORK = [
  {
    id: "p1",
    title: "Brand Identity Kit",
    category: "branding",
    categoryLabel: "Branding",
    desc: "A clean identity system built for consistency across digital touchpoints.",
    tools: "Illustrator • Photoshop",
    role: "Concept • Identity • Brand Assets",
    overview: "Built a bold, consistent identity system with typography, color rules and reusable templates for digital use.",
    highlights: [
      "Defined layout & typography hierarchy",
      "Created logo usage / spacing rules",
      "Designed reusable social templates"
    ],
    deliverables: [
      "Logo variations",
      "Brand color + type system",
      "Social media templates"
    ],
    image: "assets/work-1.jpg",
    images: ["assets/p1-1.jpg", "assets/p1-2.jpg", "assets/p1-3.jpg"],
  },
  {
    id: "p2",
    title: "Social Media Campaign Creatives",
    category: "social",
    categoryLabel: "Social",
    desc: "Scroll-stopping campaign creatives with a consistent visual system.",
    tools: "Photoshop • Illustrator",
    role: "Creative Direction • Design",
    overview: "Designed a consistent campaign system for posts & stories focused on clarity, brand recall and engagement.",
    highlights: [
      "Strong product-first composition",
      "Consistent grid + spacing system",
      "Multiple formats for Instagram"
    ],
    deliverables: [
      "Posts (1:1, 4:5)",
      "Stories (9:16)",
      "Campaign variants"
    ],
    image: "assets/work-2.jpg",
    images: ["assets/p2-1.jpg", "assets/p2-2.jpg", "assets/p2-3.jpg"],
  },
  {
    id: "p3",
    title: "Ad Creative Set",
    category: "ads",
    categoryLabel: "Ads",
    desc: "Conversion-focused ad visuals with clean hierarchy and CTA space.",
    tools: "Photoshop",
    role: "Concept • Design • Deliverables",
    overview: "Created high-clarity ad creatives with strong hierarchy, readable copy space, and brand-consistent visuals.",
    highlights: [
      "Multiple ad variations for testing",
      "Clear CTA space and hierarchy",
      "Export-ready formats"
    ],
    deliverables: [
      "Static ads (1:1, 4:5, 9:16)",
      "Headline variants",
      "Key visual layout"
    ],
    image: "assets/work-3.jpg",
    images: ["assets/p3-1.jpg", "assets/p3-2.jpg", "assets/p3-3.jpg"],
  },
  {
    id: "p4",
    title: "Packaging Design",
    category: "packaging",
    categoryLabel: "Packaging",
    desc: "Premium packaging layout built for shelf impact and readability.",
    tools: "Illustrator • InDesign",
    role: "Layout • Print-ready Files",
    overview: "Developed clean packaging layouts with strong hierarchy, brand consistency and print-safe design standards.",
    highlights: [
      "Clear front/back hierarchy",
      "Readable typography system",
      "Print-ready output"
    ],
    deliverables: [
      "Front & back layout",
      "Label variants",
      "Mockups + print files"
    ],
    image: "assets/work-4.jpg",
    images: ["assets/p4-1.jpg", "assets/p4-2.jpg", "assets/p4-3.jpg"],
  },
  {
    id: "p5",
    title: "3D Concept Visuals",
    category: "3d",
    categoryLabel: "3D",
    desc: "Playful concept visuals designed for social-first storytelling.",
    tools: "Photoshop • 3D Tool",
    role: "Concept • Composition",
    overview: "Created concept-led 3D visuals to make the creative more engaging and memorable for audiences.",
    highlights: [
      "Character-led storytelling",
      "Clean composition & spacing",
      "Brand color integration"
    ],
    deliverables: [
      "3D concept visuals",
      "Multiple poses/versions",
      "Ad-ready exports"
    ],
    image: "assets/work-5.jpg",
    images: ["assets/p5-1.jpg", "assets/p5-2.jpg", "assets/p5-3.jpg"],
  },
  {
    id: "p6",
    title: "Key Visual Posters",
    category: "ads",
    categoryLabel: "Ads",
    desc: "High-impact key visuals with strong typography and bold spacing.",
    tools: "Photoshop • Illustrator",
    role: "Design • Output",
    overview: "Designed bold key visuals/posters with clean typography and strong visual hierarchy for promotion and awareness.",
    highlights: [
      "Bold type + spacing system",
      "Clean focal point control",
      "Consistent visual rules"
    ],
    deliverables: [
      "Poster variants",
      "Social sizes",
      "Print-ready exports"
    ],
    image: "assets/work-6.jpg",
    images: ["assets/p6-1.jpg", "assets/p6-2.jpg", "assets/p6-3.jpg"],
  }
];

// ===== Render Work Grid =====
const grid = qs("#workGrid");

function renderWork(items) {
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (item) => `
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
  `
    )
    .join("");

  qsa(".cardWork", grid).forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openModal(card.dataset.id);
    });
  });
}

renderWork(WORK);

// ===== Filtering =====
const chips = qsa(".chip");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");

    const f = chip.dataset.filter;
    if (f === "all") renderWork(WORK);
    else renderWork(WORK.filter((w) => w.category === f));
  });
});

// ===== Modal + Gallery =====
const modal = qs("#modal");
const modalMedia = qs("#modalMedia");
const thumbsEl = qs("#thumbs");
const prevBtn = qs("#prevImg");
const nextBtn = qs("#nextImg");

const modalCategory = qs("#modalCategory");
const modalTitle = qs("#modalTitle");
const modalDesc = qs("#modalDesc");
const modalTools = qs("#modalTools");
const modalRole = qs("#modalRole");
const modalOverview = qs("#modalOverview");
const modalHighlights = qs("#modalHighlights");
const modalDeliverables = qs("#modalDeliverables");

let currentGallery = [];
let currentIndex = 0;

function renderThumbs(images) {
  if (!thumbsEl) return;
  thumbsEl.innerHTML = images
    .map(
      (src, i) => `
      <button class="thumb ${i === 0 ? "is-active" : ""}"
        style="background-image:url('${src}')"
        aria-label="Open image ${i + 1}">
      </button>`
    )
    .join("");

  qsa(".thumb", thumbsEl).forEach((btn, i) => {
    btn.addEventListener("click", () => setModalImage(i));
  });
}

function setModalImage(index) {
  if (!modalMedia || !currentGallery.length) return;
  currentIndex = (index + currentGallery.length) % currentGallery.length;
  modalMedia.style.backgroundImage =
    `linear-gradient(135deg, rgba(225,6,0,.12), rgba(17,17,17,.08)), url('${currentGallery[currentIndex]}')`;

  qsa(".thumb", thumbsEl).forEach((t, i) => {
    t.classList.toggle("is-active", i === currentIndex);
  });
}

function fillList(el, items) {
  if (!el) return;
  el.innerHTML = (items || []).map((x) => `<li>${x}</li>`).join("");
}

function openModal(id) {
  const item = WORK.find((w) => w.id === id);
  if (!item || !modal) return;

  modalCategory.textContent = item.categoryLabel || "";
  modalTitle.textContent = item.title || "";
  modalDesc.textContent = item.desc || "";
  modalTools.textContent = item.tools || "";
  modalRole.textContent = item.role || "";

  if (modalOverview) modalOverview.textContent = item.overview || "";

  fillList(modalHighlights, item.highlights);
  fillList(modalDeliverables, item.deliverables);

  currentGallery = (item.images && item.images.length) ? item.images : [item.image];
  currentIndex = 0;
  renderThumbs(currentGallery);
  setModalImage(0);

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

qsa("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));

prevBtn?.addEventListener("click", () => setModalImage(currentIndex - 1));
nextBtn?.addEventListener("click", () => setModalImage(currentIndex + 1));

document.addEventListener("keydown", (e) => {
  if (!modal?.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") setModalImage(currentIndex - 1);
  if (e.key === "ArrowRight") setModalImage(currentIndex + 1);
});
