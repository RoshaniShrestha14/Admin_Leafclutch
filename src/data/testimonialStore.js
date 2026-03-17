const defaultTestimonials = [
  {
    name: "Priya Sharma",
    role: "Data Analyst",
    rating: 5,
    program: "AI and ML",
    message:
      "The AI and ML course at Leafclutch was exactly what I needed. The hands-on projects and mentor support helped me land my first job as a data analyst.",
  },
  {
    name: "Arjun Mehta",
    role: "Frontend Developer",
    rating: 5,
    program: "Frontend Development",
    message:
      "The curriculum was clear and practical. I built real projects, improved my confidence, and now handle production React features at work.",
  },
  {
    name: "Neha Verma",
    role: "QA Engineer",
    rating: 4,
    program: "Software Testing",
    message:
      "I liked the structured modules and mock interview prep. The team gave fast feedback and helped me switch into QA smoothly.",
  },
  {
    name: "Rahul Nair",
    role: "Cloud Associate",
    rating: 5,
    program: "Cloud Computing",
    message:
      "The labs and deployment practice were excellent. I now understand CI/CD and cloud basics well enough to contribute from day one.",
  },
];

const STORAGE_KEY = "admin_testimonials_v1";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeTestimonial(item) {
  return {
    name: item.name || "",
    role: item.role || "",
    rating: Math.min(5, Math.max(1, Number(item.rating) || 5)),
    program: item.program || "General",
    message: item.message || "",
    slug: item.slug || slugify(item.name),
  };
}

export function getTestimonials() {
  if (!canUseStorage()) return defaultTestimonials.map(normalizeTestimonial);

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = defaultTestimonials.map(normalizeTestimonial);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultTestimonials.map(normalizeTestimonial);
    return parsed.map(normalizeTestimonial);
  } catch {
    return defaultTestimonials.map(normalizeTestimonial);
  }
}

export function saveTestimonials(testimonials) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials.map(normalizeTestimonial)));
}

export function upsertTestimonial(testimonial, previousSlug) {
  const current = getTestimonials();
  const clean = normalizeTestimonial({ ...testimonial, slug: testimonial.slug || slugify(testimonial.name) });
  const next = current.filter((item) => item.slug !== previousSlug && item.slug !== clean.slug);
  next.push(clean);
  saveTestimonials(next);
  return clean;
}

export function findTestimonialBySlug(slug) {
  return getTestimonials().find((item) => item.slug === slug);
}

export function deleteTestimonialBySlug(slug) {
  const current = getTestimonials();
  saveTestimonials(current.filter((item) => item.slug !== slug));
}
