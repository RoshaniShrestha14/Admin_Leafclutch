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

export default function FaqForm({ existingData, onSubmit, submitLabel = "Save FAQ" }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    question: existingData?.question || "",
    slug: existingData?.slug || "",
    answer: existingData?.answer || "",
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const payload = {
      question: form.question.trim(),
      slug: (form.slug || makeSlug(form.question)).trim(),
      answer: form.answer.trim(),
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
        <h3>FAQ Details</h3>
        <div className="course-form-v2__field-grid">
          <input name="question" placeholder="Question" value={form.question} onChange={updateField} required />
          <input name="slug" placeholder="Slug (optional)" value={form.slug} onChange={updateField} />
        </div>

        <label className="course-form-v2__label">Answer</label>
        <textarea
          name="answer"
          rows={8}
          placeholder="Write the answer"
          value={form.answer}
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
