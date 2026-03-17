const defaultFaqs = [
  {
    question: "What is Leafclutch Technologies?",
    answer:
      "Leafclutch Technologies Pvt. Ltd. is a leading IT company based in Siddharthanagar, Rupandehi, Nepal. We offer enterprise software solutions, AI automation, and industry-focused training and internship programs in AI/ML, Web Development, Cybersecurity, UI/UX, and Graphic Design.",
  },
  {
    question: "Do I need prior experience to join?",
    answer:
      "No prior experience is required for most beginner-level programs. We design courses for all skill levels, from complete beginners to advanced practitioners.",
  },
  {
    question: "Can I join the internship online from outside Bhairahawa?",
    answer:
      "Yes. Our online internship programs let you join from anywhere in Nepal or abroad. Virtual training includes live sessions, mentor support, and real project work.",
  },
  {
    question: "Do I get a certificate after completing a program?",
    answer:
      "Upon completion, you will receive an industry-recognized certificate from Leafclutch Technologies to add to LinkedIn and your resume.",
  },
  {
    question: "What technologies and tools will I learn?",
    answer:
      "Depending on your program, you will work with Python, TensorFlow, React, Node.js, MongoDB, Figma, Adobe Creative Suite, Kali Linux, and many more industry-standard tools.",
  },
  {
    question: "How do I enroll in a program?",
    answer:
      "Visit our Contact page or message us on WhatsApp at +977-9766715768. Our team will guide you through program selection, schedule, and enrollment.",
  },
];

const STORAGE_KEY = "admin_faqs_v1";

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

function normalizeFaq(item) {
  return {
    question: item.question || "",
    answer: item.answer || "",
    slug: item.slug || slugify(item.question),
  };
}

export function getFaqs() {
  if (!canUseStorage()) return defaultFaqs.map(normalizeFaq);

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = defaultFaqs.map(normalizeFaq);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultFaqs.map(normalizeFaq);
    return parsed.map(normalizeFaq);
  } catch {
    return defaultFaqs.map(normalizeFaq);
  }
}

export function saveFaqs(faqs) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(faqs.map(normalizeFaq)));
}

export function upsertFaq(faq, previousSlug) {
  const current = getFaqs();
  const clean = normalizeFaq({ ...faq, slug: faq.slug || slugify(faq.question) });
  const next = current.filter((item) => item.slug !== previousSlug && item.slug !== clean.slug);
  next.push(clean);
  saveFaqs(next);
  return clean;
}

export function findFaqBySlug(slug) {
  return getFaqs().find((item) => item.slug === slug);
}

export function deleteFaqBySlug(slug) {
  const current = getFaqs();
  saveFaqs(current.filter((item) => item.slug !== slug));
}
