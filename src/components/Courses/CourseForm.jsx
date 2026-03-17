import { useRef, useState } from "react";
import { ImagePlus, Loader2, Plus, Trash2, X } from "lucide-react";
import { slugify } from "../../data/courseStore";

const CourseForm = ({ existingData, onSubmit, submitLabel = "Save Course" }) => {
  const fileInputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: existingData?.title || "",
    slug: existingData?.slug || "",
    image: existingData?.image || "",
    description: existingData?.description || "",
    badge: existingData?.badge || "",
    duration: existingData?.duration || "",
    level: existingData?.level || "Beginner",
    features: existingData?.features?.length ? [...existingData.features] : [""],
  });
  const [preview, setPreview] = useState(existingData?.image || "");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const setArrayFieldValue = (field, index, value) => {
    setForm((prev) => {
      const next = [...prev[field]];
      next[index] = value;
      return { ...prev, [field]: next };
    });
  };

  const addArrayFieldItem = (field) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayFieldItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].length === 1 ? [""] : prev[field].filter((_, i) => i !== index),
    }));
  };

  const handlePhotoFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result || "");
      setForm((prev) => ({ ...prev, image: base64 }));
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setForm((prev) => ({ ...prev, image: "" }));
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      slug: (form.slug || slugify(form.title)).trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      badge: form.badge.trim(),
      duration: form.duration.trim(),
      level: form.level,
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
      <div className="course-form-v2__grid">
        <section className="course-form-v2__photo-panel">
          <label className="course-form-v2__label">Cover Photo</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoFile}
            className="course-form-v2__hidden-input"
          />

          <div
            className={`course-form-v2__photo-dropzone${preview ? " has-image" : ""}`}
            onClick={() => !submitting && fileInputRef.current?.click()}
          >
            {preview ? (
              <>
                <img src={preview} alt="Course cover" className="course-form-v2__photo-preview" />
                <button type="button" className="course-form-v2__photo-remove" onClick={handleRemovePhoto}>
                  <X size={16} />
                </button>
              </>
            ) : (
              <div className="course-form-v2__photo-placeholder">
                <ImagePlus size={40} />
                <p>Click to upload a cover image</p>
              </div>
            )}
          </div>

          <input
            name="image"
            placeholder="Or paste image URL"
            value={form.image}
            onChange={(event) => {
              handleChange(event);
              setPreview(event.target.value);
            }}
            required
          />
        </section>

        <section className="course-form-v2__main-panel">
          <h3>Program Basics</h3>
          <div className="course-form-v2__field-grid">
            <input
              name="title"
              placeholder="Course Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              name="slug"
              placeholder="Slug (optional)"
              value={form.slug}
              onChange={handleChange}
            />
            <input
              name="badge"
              placeholder="Badge (e.g. Most Popular)"
              value={form.badge}
              onChange={handleChange}
              required
            />
            <input
              name="duration"
              placeholder="Duration (e.g. 3 Months)"
              value={form.duration}
              onChange={handleChange}
              required
            />
          </div>

          <label className="course-form-v2__label">Description</label>
          <textarea
            name="description"
            placeholder="What is this training about?"
            rows={4}
            value={form.description}
            onChange={handleChange}
          />

          <h3>Level</h3>
          <div className="course-form-v2__field-grid">
            <select name="level" value={form.level} onChange={handleChange}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Beginner to Intermediate</option>
              <option>Beginner to Advanced</option>
              <option>Beginner Friendly</option>
            </select>
          </div>
        </section>
      </div>

      <section className="course-form-v2__list-panel">
        <div className="course-form-v2__list-header">
          <h3>Program Benefits</h3>
          <button type="button" className="course-form-v2__add-btn" onClick={() => addArrayFieldItem("features")}>
            <Plus size={14} /> Add Benefit
          </button>
        </div>
        {form.features.map((item, index) => (
          <div key={`feature-${index}`} className="course-form-v2__list-row">
            <input
              value={item}
              onChange={(event) => setArrayFieldValue("features", index, event.target.value)}
              placeholder="e.g. Real-world AI Projects"
              required
            />
            <button type="button" onClick={() => removeArrayFieldItem("features", index)}>
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
};

export default CourseForm;