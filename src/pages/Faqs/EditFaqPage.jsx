import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../../components/Courses/Courses.css";
import "../../components/Faqs/Faqs.css";
import FaqForm from "../../components/Faqs/FaqForm";
import { findFaqBySlug, upsertFaq } from "../../data/faqStore";

export default function EditFaqPage() {
  const { faqSlug } = useParams();
  const navigate = useNavigate();
  const faq = findFaqBySlug(faqSlug);

  const handleUpdate = (payload) => {
    upsertFaq(payload, faqSlug);
    navigate("/faqs");
  };

  if (!faq) {
    return (
      <section className="program-page">
        <div className="program-page__container">
          <h1 className="program-page__title">FAQ Not Found</h1>
          <Link to="/faqs" className="admin-btn admin-btn-primary">
            <ArrowLeft size={14} /> Back to FAQs
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="courses-page">
      <Link to="/faqs" className="program-page__back-link" style={{ marginBottom: "18px" }}>
        <ArrowLeft size={20} /> FAQs
      </Link>
      <p className="breadcrumb">Dashboard &gt; FAQs &gt; Edit</p>
      <h1 className="form-title">Edit FAQ</h1>
      <p className="subtext" style={{ marginBottom: "16px" }}>
        Updating: <strong>{faq.question}</strong>
      </p>
      <FaqForm existingData={faq} onSubmit={handleUpdate} submitLabel="Update FAQ" />
    </section>
  );
}
