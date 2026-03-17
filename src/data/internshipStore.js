import defaultInternships from "./internshipPrograms";

const STORAGE_KEY = "admin_internship_programs_v1";

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

function normalizeInternship(item) {
  return {
    title: item.title || "",
    slug: item.slug || slugify(item.title),
    badge: item.badge || "General",
    totalFee: item.totalFee || "",
    feeLabel: item.feeLabel || "TOTAL FEE",
    enrollText: item.enrollText || "",
    sectionTitle: item.sectionTitle || "AVAILABLE COURSES",
    features: Array.isArray(item.features) ? item.features : [],
    highlighted: Boolean(item.highlighted),
  };
}

export function getInternshipPrograms() {
  if (!canUseStorage()) return defaultInternships.map(normalizeInternship);

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = defaultInternships.map(normalizeInternship);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultInternships.map(normalizeInternship);
    return parsed.map(normalizeInternship);
  } catch {
    return defaultInternships.map(normalizeInternship);
  }
}

export function saveInternshipPrograms(programs) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(programs.map(normalizeInternship)));
}

export function upsertInternshipProgram(program, previousSlug) {
  const current = getInternshipPrograms();
  const clean = normalizeInternship({ ...program, slug: program.slug || slugify(program.title) });
  const next = current.filter((item) => item.slug !== previousSlug && item.slug !== clean.slug);
  next.push(clean);
  saveInternshipPrograms(next);
  return clean;
}

export function findInternshipProgramBySlug(slug) {
  return getInternshipPrograms().find((program) => program.slug === slug);
}

export function deleteInternshipProgramBySlug(slug) {
  const current = getInternshipPrograms();
  saveInternshipPrograms(current.filter((program) => program.slug !== slug));
}
