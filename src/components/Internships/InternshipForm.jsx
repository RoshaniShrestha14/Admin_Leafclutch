import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

function makeSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function InternshipForm({ existingData, onSubmit, submitLabel = "Save Internship Plan" }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: existingData?.title || "",
    slug: existingData?.slug || "",
    badge: existingData?.badge || "General",
    totalFee: existingData?.totalFee || "",
    feeLabel: existingData?.feeLabel || "TOTAL FEE",
    enrollText: existingData?.enrollText || "",
    sectionTitle: existingData?.sectionTitle || "AVAILABLE COURSES",
    highlighted: Boolean(existingData?.highlighted),
    features: existingData?.features?.length ? [...existingData.features] : [""],
  });

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const updateFeature = (index, value) => {
    setForm((prev) => {
      const next = [...prev.features];
      next[index] = value;
      return { ...prev, features: next };
    });
  };

  const addFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.length === 1 ? [""] : prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      slug: (form.slug || makeSlug(form.title)).trim(),
      badge: form.badge.trim(),
      totalFee: form.totalFee.trim(),
      feeLabel: form.feeLabel.trim() || "TOTAL FEE",
      enrollText: form.enrollText.trim(),
      sectionTitle: form.sectionTitle.trim() || "AVAILABLE COURSES",
      highlighted: Boolean(form.highlighted),
      features: form.features.map((item) => item.trim()).filter(Boolean),
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
        <h3>Internship Plan Basics</h3>
        <div className="course-form-v2__field-grid">
          <input name="title" placeholder="Program Title" value={form.title} onChange={updateField} required />
          <input name="slug" placeholder="Slug (optional)" value={form.slug} onChange={updateField} />
          <input name="badge" placeholder="Badge (e.g. MOST POPULAR)" value={form.badge} onChange={updateField} />
          <input name="totalFee" placeholder="Total Fee (e.g. NPR 6,000)" value={form.totalFee} onChange={updateField} required />
          <input name="feeLabel" placeholder="Fee Label (e.g. TOTAL FEE)" value={form.feeLabel} onChange={updateField} />
          <input name="sectionTitle" placeholder="Section Title (e.g. AVAILABLE COURSES)" value={form.sectionTitle} onChange={updateField} />
        </div>

        <label className="course-form-v2__label">Enroll Text</label>
        <textarea name="enrollText" rows={3} placeholder="Enroll with just NPR ..." value={form.enrollText} onChange={updateField} required />

        <label className="course-form-v2__checkbox">
          <input type="checkbox" name="highlighted" checked={form.highlighted} onChange={updateField} />
          Highlight this card
        </label>
      </section>

      <section className="course-form-v2__list-panel">
        <div className="course-form-v2__list-header">
          <h3>Included Items</h3>
          <button type="button" className="course-form-v2__add-btn" onClick={addFeature}>
            <Plus size={14} /> Add Item
          </button>
        </div>
        {form.features.map((item, index) => (
          <div key={`feature-${index}`} className="course-form-v2__list-row">
            <input value={item} onChange={(event) => updateFeature(index, event.target.value)} placeholder="e.g. Python" required />
            <button type="button" onClick={() => removeFeature(index)}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
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
