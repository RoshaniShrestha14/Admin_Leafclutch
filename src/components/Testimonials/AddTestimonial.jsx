import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../Courses/Courses.css";
import "./Testimonials.css";
import TestimonialForm from "./TestimonialForm";
import { upsertTestimonial } from "../../data/testimonialStore";

export default function AddTestimonial() {
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    const created = upsertTestimonial(payload);
    navigate(`/dashboard/testimonials/${created.slug}`);
  };

  return (
    <section className="courses-page">
      <Link to="/dashboard/testimonials" className="program-page__back-link" style={{ marginBottom: "18px" }}>
        <ArrowLeft size={20} /> Testimonials
      </Link>
      <h1 className="form-title">Add Testimonial</h1>
      <TestimonialForm onSubmit={handleCreate} submitLabel="Create Testimonial" />
    </section>
  );
}
