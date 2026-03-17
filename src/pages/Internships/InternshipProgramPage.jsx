import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import "../../components/Courses/Courses.css";
import "../../components/Internships/Internships.css";
import { deleteInternshipProgramBySlug, findInternshipProgramBySlug } from "../../data/internshipStore";

export default function InternshipProgramPage() {
  const { trainingSlug } = useParams();
  const navigate = useNavigate();
  const internship = findInternshipProgramBySlug(trainingSlug);

  const handleDelete = () => {
    if (!internship) return;
    const shouldDelete = window.confirm(`Delete "${internship.title}"? This action cannot be undone.`);
    if (!shouldDelete) return;
    deleteInternshipProgramBySlug(internship.slug);
    navigate("/dashboard/internships");
  };

  if (!internship) {
    return (
      <section className="program-page">
        <div className="program-page__container">
          <h1 className="program-page__title">Internship Plan Not Found</h1>
          <Link to="/dashboard/internships" className="admin-btn admin-btn-primary">
            <ArrowLeft size={14} /> Back to Internship Plans
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="program-page">
      <div className="program-page__container">
        <div className="program-page__topbar">
          <Link to="/dashboard/internships" className="program-page__back-link">
            <ArrowLeft size={14} /> Internship Plans
          </Link>
          <div className="program-status">{internship.badge}</div>
        </div>

        <div className="internship-detail-card">
          <h1>{internship.title}</h1>
          <p className="internship-detail-card__price">
            {internship.totalFee} <span>{internship.feeLabel}</span>
          </p>
          <p className="internship-detail-card__enroll">{internship.enrollText}</p>

          <h3>{internship.sectionTitle}</h3>
          <ul>
            {internship.features.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} /> {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="program-side-card">
          <h3>Admin Controls</h3>
          <div className="program-actions">
            <Link to={`/dashboard/internships/${internship.slug}/edit`} className="admin-btn admin-btn-primary admin-btn-block">
              <Pencil size={14} /> Edit Internship Plan
            </Link>
            <button type="button" className="admin-btn admin-btn-danger admin-btn-block" onClick={handleDelete}>
              <Trash2 size={14} /> Delete Internship Plan
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
