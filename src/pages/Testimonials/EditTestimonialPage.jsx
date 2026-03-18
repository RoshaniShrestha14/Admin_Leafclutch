import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../../components/Courses/Courses.css";
import "../../components/Testimonials/Testimonials.css";
import TestimonialForm from "../../components/Testimonials/TestimonialForm";
import { findTestimonialBySlug, upsertTestimonial } from "../../data/testimonialStore";

export default function EditTestimonialPage() {
  const { testimonialSlug } = useParams();
  const navigate = useNavigate();
  const testimonial = findTestimonialBySlug(testimonialSlug);

  const handleUpdate = (payload) => {
    const updated = upsertTestimonial(payload, testimonialSlug);
    navigate(`/testimonials/${updated.slug}`);
  };

  if (!testimonial) {
    return (
      <section className="program-page">
        <div className="program-page__container">
          <h1 className="program-page__title">Testimonial Not Found</h1>
          <Link to="/testimonials" className="admin-btn admin-btn-primary">
            <ArrowLeft size={14} /> Back to Testimonials
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="courses-page">
      <Link to="/testimonials" className="program-page__back-link" style={{ marginBottom: "18px" }}>
        <ArrowLeft size={20} /> Testimonials
      </Link>
      <p className="breadcrumb">Dashboard &gt; Testimonials &gt; Edit</p>
      <h1 className="form-title">Edit Testimonial</h1>
      <p className="subtext" style={{ marginBottom: "16px" }}>
        Updating: <strong>{testimonial.name}</strong>
      </p>
      <TestimonialForm existingData={testimonial} onSubmit={handleUpdate} submitLabel="Update Testimonial" />
    </section>
  );
}
