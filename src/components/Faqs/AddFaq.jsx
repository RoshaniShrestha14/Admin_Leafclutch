import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../Courses/Courses.css";
import "./Faqs.css";
import FaqForm from "./FaqForm";
import { upsertFaq } from "../../data/faqStore";

export default function AddFaq() {
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    upsertFaq(payload);
    navigate("/dashboard/faqs");
  };

  return (
    <section className="courses-page">
      <Link to="/dashboard/faqs" className="program-page__back-link" style={{ marginBottom: "18px" }}>
        <ArrowLeft size={20} /> Frequently Asked Questions
      </Link>
      <h1 className="form-title">Add FAQ</h1>
      <FaqForm onSubmit={handleCreate} submitLabel="Create FAQ" />
    </section>
  );
}
