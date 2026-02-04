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

// ===== Work Data (PLACEHOLDERS NOW) =====
// Later you can replace image names in assets folder.
// "image" is used for grid thumbnail.
// "images" is used for popup gallery (multiple images).
const WORK = [
  {
    id: "p1",
    title: "Brand Identity Kit",
    category: "branding",
    categoryLabel: "Branding",
    desc: "A clean identity system built for consistency across digital touchpoints.",
    tools: "Illustrator • Photoshop",
    role: "Concept • Identity • Brand Assets",
    image: "assets/work-1.jpg",
    images: ["assets/p1-1.jpg", "assets/p1-2.jpg", "assets/p1-3.jpg"],
  },
  {
    id: "p2",
    title: "Social Media Campaign",
    category: "social",
    categoryLabel: "Social",
    desc: "Bold campaign creatives designed to increase engagement and recall.",
    tools: "Photoshop • Illustrator",
    role: "Creative Direction • Design",
    image: "assets/work-2.jpg",
    images: ["assets/p2-1.jpg", "assets/p2-2.jpg", "assets/p2-3.jpg"],
  },
  {
    id: "p3",
    title: "Ad Creative Set",
    category: "ads",
    categoryLabel: "Ads",
    desc: "Conversion-focused key visuals with clean hierarchy and strong CTA space.",
    tools: "Photoshop",
    role: "Concept • Design • Deliverables",
    image: "assets/work-3.jpg",
    images: ["assets/p3-1.jpg", "assets/p3-2.jpg", "assets/p3-3.jpg"],
  },
  {
    id: "p4",
    title: "Packaging Design",
    category: "packaging",
    categoryLabel: "Packaging",
    desc: "Premium packaging layout with strong shelf impact and clear product messaging.",
    tools: "Illustrator • InDesign",
    role: "Layout • Print-ready Files",
    image: "assets/work-4.jpg",
    images: ["assets/p4-1.jpg", "assets/p4-2.jpg", "assets/p4-3.jpg"],
  },
  {
    id: "p5",
    title: "3D Concept Visual",
    category: "3d",
    categoryLabel: "3D",
    desc: "A playful concept visual combining product + story for social-first content.",
    tools: "Photoshop • 3D Tool",
    role: "Concept • Composition",
    image: "assets/work-5.jpg",
    images: ["assets/p5-1.jpg", "assets/p5-2.jpg", "assets/p5-3.jpg"],
  },
  {
    id: "p6",
    title: "Brand Posters / Key Visuals",
    category: "ads",
    categoryLabel: "Ads",
    desc: "High-impact poster series with strong typography and bold spacing.",
    tools: "Photoshop • Illustrator",
    role: "Design • Output",
    image: "assets/work-6.jpg",
    images: ["assets/p6-1.jpg", "assets/p6-2.jpg", "assets/p6-3.jpg"],
  },
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

  // click + keyboard open
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

// ===== Modal =====
const modal = qs("#modal");
const modalMedia = qs("#modalMedia");
const modalCategory = qs("#modalCategory");
const modalTitle = qs("#modalTitle");
const modalDesc = qs("#modalDesc");
const modalTools = qs("#modalTools");
const modalRole = qs("#modalRole");

// Gallery elements (must exist in index.html updated modal)
const thumbsEl = qs("#thumbs");
const prevBtn = qs("#prevImg");
const nextBtn = qs("#nextImg");

// Gallery state
let currentGallery = [];
let currentIndex = 0;

function renderThumbs(images) {
  if (!thumbsEl) return;

  thumbsEl.innerHTML = images
    .map(
      (src, i) => `
    <button class="thumb ${i === 0 ? "is-active" : ""}" style="background-image:url('${src}')" aria-label="Open image ${i + 1}"></button>
  `
    )
    .join("");

  qsa(".thumb", thumbsEl).forEach((btn, i) => {
    btn.addEventListener("click", () => setModalImage(i));
  });
}

function setModalImage(index) {
  if (!modalMedia || !currentGallery.length) return;

  currentIndex = (index + currentGallery.length) % currentGallery.length;

  modalMedia.style.backgroundImage = `linear-gradient(135deg, rgba(225,6,0,.12), rgba(17,17,17,.08)), url('${currentGallery[currentIndex]}')`;

  // active thumbnail
  if (thumbsEl) {
    qsa(".thumb", thumbsEl).forEach((t, i) => {
      t.classList.toggle("is-active", i === currentIndex);
    });
  }
}

function openModal(id) {
  const item = WORK.find((w) => w.id === id);
  if (!item || !modal) return;

  if (modalCategory) modalCategory.textContent = item.categoryLabel;
  if (modalTitle) modalTitle.textContent = item.title;
  if (modalDesc) modalDesc.textContent = item.desc;
  if (modalTools) modalTools.textContent = item.tools;
  if (modalRole) modalRole.textContent = item.role;

  // Use multiple images if available, else fallback to single image
  currentGallery = item.images && item.images.length ? item.images : [item.image];
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

// Gallery buttons
prevBtn?.addEventListener("click", () => setModalImage(currentIndex - 1));
nextBtn?.addEventListener("click", () => setModalImage(currentIndex + 1));

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (!modal?.classList.contains("is-open")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") setModalImage(currentIndex - 1);
  if (e.key === "ArrowRight") setModalImage(currentIndex + 1);
});
