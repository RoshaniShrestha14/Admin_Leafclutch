import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../../components/Courses/Courses.css";
import "../../components/Internships/Internships.css";
import InternshipForm from "../../components/Internships/InternshipForm";
import { findInternshipProgramBySlug, upsertInternshipProgram } from "../../data/internshipStore";

export default function EditInternshipPage() {
  const { trainingSlug } = useParams();
  const navigate = useNavigate();
  const internship = findInternshipProgramBySlug(trainingSlug);

  const handleUpdate = (payload) => {
    const updated = upsertInternshipProgram(payload, trainingSlug);
    navigate(`/dashboard/internships/${updated.slug}`);
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
    <section className="courses-page">
      <p className="breadcrumb">Dashboard &gt; Internship Plans &gt; Edit</p>
      <h1 className="form-title">Edit Internship Plan</h1>
      <p className="subtext" style={{ marginBottom: "16px" }}>
        Updating: <strong>{internship.title}</strong>
      </p>
      <InternshipForm existingData={internship} onSubmit={handleUpdate} submitLabel="Update Internship Plan" />
    </section>
  );
}
