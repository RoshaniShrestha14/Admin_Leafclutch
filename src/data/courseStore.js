import defaultPrograms from "./coursePrograms";

const STORAGE_KEY = "admin_course_programs_v1";

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

function normalizeItem(item) {
  return {
    title: item.title || "",
    description: item.description || "",
    slug: item.slug || slugify(item.title),
    image: item.image || item.img || "",
    badge: item.badge || item.category || "General",
    duration: item.duration || "",
    level: item.level || "Beginner",
    features: Array.isArray(item.features) ? item.features : [],
  };
}

export function getCoursePrograms() {
  if (!canUseStorage()) {
    return defaultPrograms.map(normalizeItem);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = defaultPrograms.map(normalizeItem);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return defaultPrograms.map(normalizeItem);
    }
    return parsed.map(normalizeItem);
  } catch {
    return defaultPrograms.map(normalizeItem);
  }
}

export function saveCoursePrograms(programs) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(programs.map(normalizeItem)));
}

export function upsertCourseProgram(program, previousSlug) {
  const currentPrograms = getCoursePrograms();
  const cleanProgram = normalizeItem({
    ...program,
    slug: program.slug || slugify(program.title),
  });

  const nextPrograms = currentPrograms.filter((item) => item.slug !== previousSlug && item.slug !== cleanProgram.slug);
  nextPrograms.push(cleanProgram);
  saveCoursePrograms(nextPrograms);
  return cleanProgram;
}

export function findCourseProgramBySlug(slug) {
  return getCoursePrograms().find((program) => program.slug === slug);
}

export function deleteCourseProgramBySlug(slug) {
  const currentPrograms = getCoursePrograms();
  const nextPrograms = currentPrograms.filter((program) => program.slug !== slug);
  saveCoursePrograms(nextPrograms);
}

export { slugify };
