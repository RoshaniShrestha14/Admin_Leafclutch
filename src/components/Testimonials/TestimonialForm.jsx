import { useState } from "react";
import { Loader2 } from "lucide-react";

function makeSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function TestimonialForm({ existingData, onSubmit, submitLabel = "Save Testimonial" }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: existingData?.name || "",
    role: existingData?.role || "",
    program: existingData?.program || "",
    rating: String(existingData?.rating || 5),
    slug: existingData?.slug || "",
    message: existingData?.message || "",
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      role: form.role.trim(),
      program: form.program.trim(),
      rating: Number(form.rating),
      slug: (form.slug || makeSlug(form.name)).trim(),
      message: form.message.trim(),
    };

    try {
      await onSubmit?.(payload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="course-form-v2" onSubmit={handleSubmit}>
      <section className="course-form-v2__main-panel">
        <h3>Testimonial Details</h3>
        <div className="course-form-v2__field-grid">
          <input name="name" placeholder="Student Name" value={form.name} onChange={updateField} required />
          <input name="role" placeholder="Role (e.g. Data Analyst)" value={form.role} onChange={updateField} required />
          <input name="program" placeholder="Program (e.g. AI and ML)" value={form.program} onChange={updateField} required />
          <select name="rating" value={form.rating} onChange={updateField}>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <input name="slug" placeholder="Slug (optional)" value={form.slug} onChange={updateField} />
        </div>

        <label className="course-form-v2__label">Quote</label>
        <textarea
          name="message"
          rows={6}
          placeholder="Write the testimonial quote"
          value={form.message}
          onChange={updateField}
          required
        />
      </section>

      <div className="course-form-v2__footer">
        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? <Loader2 size={16} className="course-form-v2__spin" /> : null}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
