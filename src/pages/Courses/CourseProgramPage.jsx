import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock3, Pencil, Signal, Trash2 } from "lucide-react";
import "../../components/Courses/Courses.css";
import { deleteCourseProgramBySlug, findCourseProgramBySlug } from "../../data/courseStore";

export default function CourseProgramPage() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const program = findCourseProgramBySlug(courseSlug);

  const handleDelete = () => {
    const shouldDelete = window.confirm(`Delete "${program.title}"? This action cannot be undone.`);
    if (!shouldDelete) return;
    deleteCourseProgramBySlug(program.slug);
    navigate("/courses");
  };

  if (!program) {
    return (
      <section className="program-page">
        <div className="program-page__container">
          <p className="program-page__eyebrow">Course Program</p>
          <h1 className="program-page__title">Program Not Found</h1>
          <p className="program-page__lead">
            This course route does not match any program in the admin catalog.
          </p>
          <Link to="/courses" className="admin-btn admin-btn-primary">
            <ArrowLeft size={14} /> Back to Courses
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="program-page">
      <div className="program-page__container">
        <div className="program-page__topbar">
          <Link to="/courses" className="program-page__back-link">
            <ArrowLeft size={14} /> Courses
          </Link>
          <div className="program-status">
            {program.badge}
          </div>
        </div>

        <article className="program-hero">
          <div className="program-hero__image" style={{ backgroundImage: `url('${program.image}')` }} />
          <div className="program-hero__content">
            <p className="program-page__eyebrow">{program.badge}</p>
            <h1 className="program-page__title">{program.title}</h1>
            <p className="program-page__lead">
              {program.description || "Manage this program's syllabus, batches, mentor assignments, and commercial settings."}
            </p>

            <div className="program-meta-grid">
              <div>
                <span>Duration</span>
                <p><Clock3 size={14}  /> {program.duration}</p>
              </div>
              <div>
                <span>Level</span>
                <p><Signal size={14} /> {program.level}</p>
              </div>
            </div>
          </div>
        </article>

        <div className="program-content-grid">
          <div className="program-card">
            <h2>Course Features</h2>
            <ul className="program-check-list">
              {program.features.map((feature) => (
                <li key={feature}>
                  <CheckCircle2 size={16} /> {feature}
                </li>
              ))}
            </ul>
          </div>

          <aside className="program-side-card">
            <h3>Admin Controls</h3>
            <div className="program-actions">
              <Link to={`/courses/${program.slug}/edit`} className="admin-btn admin-btn-primary admin-btn-block">
                <Pencil size={14} /> Edit Program
              </Link>
              <button type="button" className="admin-btn admin-btn-danger admin-btn-block" onClick={handleDelete}>
                <Trash2 size={14} /> Delete Course
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
