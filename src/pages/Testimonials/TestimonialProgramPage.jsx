import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, Star, Trash2, UserRound } from "lucide-react";
import "../../components/Courses/Courses.css";
import "../../components/Testimonials/Testimonials.css";
import { deleteTestimonialBySlug, findTestimonialBySlug } from "../../data/testimonialStore";

export default function TestimonialProgramPage() {
  const { testimonialSlug } = useParams();
  const navigate = useNavigate();
  const testimonial = findTestimonialBySlug(testimonialSlug);

  const handleDelete = () => {
    if (!testimonial) return;
    const shouldDelete = window.confirm(`Delete testimonial from "${testimonial.name}"? This action cannot be undone.`);
    if (!shouldDelete) return;
    deleteTestimonialBySlug(testimonial.slug);
    navigate("/testimonials");
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
    <section className="program-page">
      <div className="program-page__container">
        <div className="program-page__topbar">
          <Link to="/testimonials" className="program-page__back-link">
            <ArrowLeft size={14} /> Testimonials
          </Link>
          <div className="program-status">{testimonial.program}</div>
        </div>

        <div className="testimonial-detail-card">
          <div className="testimonial-card__stars" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star key={`detail-star-${index}`} size={18} fill="currentColor" />
            ))}
          </div>

          <p className="testimonial-card__quote">"{testimonial.message}"</p>

          <div className="testimonial-card__author">
            <div className="testimonial-card__avatar" aria-hidden="true">
              <UserRound size={22} />
            </div>
            <div>
              <h3>{testimonial.name}</h3>
              <p>{testimonial.role}</p>
            </div>
          </div>
        </div>

        <aside className="program-side-card">
          <h3>Admin Controls</h3>
          <div className="program-actions">
            <Link to={`/testimonials/${testimonial.slug}/edit`} className="admin-btn admin-btn-primary admin-btn-block">
              <Pencil size={14} /> Edit Testimonial
            </Link>
            <button type="button" className="admin-btn admin-btn-danger admin-btn-block" onClick={handleDelete}>
              <Trash2 size={14} /> Delete Testimonial
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
