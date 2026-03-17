import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../Courses/Courses.css";
import "./Internships.css";
import InternshipForm from "./InternshipForm";
import { upsertInternshipProgram } from "../../data/internshipStore";

export default function AddInternship() {
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    const created = upsertInternshipProgram(payload);
    navigate(`/dashboard/internships/${created.slug}`);
  };

  return (
    <section className="courses-page">
      <Link to="/dashboard/internships" className="program-page__back-link" style={{ marginBottom: "18px" }}>
        <ArrowLeft size={20} /> Internship Plans
      </Link>
      <h1 className="form-title">Add Internship Plan</h1>
      <InternshipForm onSubmit={handleCreate} submitLabel="Create Internship Plan" />
    </section>
  );
}
