import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRight, Minus, Pencil, Plus, Search, Trash2 } from "lucide-react";
import "../components/Courses/Courses.css";
import "../components/Faqs/Faqs.css";
import { deleteFaqBySlug, getFaqs } from "../data/faqStore";

export default function FaqPage() {
  const [faqs, setFaqs] = useState(() => getFaqs());
  const [searchValue, setSearchValue] = useState("");
  const [openSlug, setOpenSlug] = useState(faqs[0]?.slug || "");

  const filteredFaqs = useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    return faqs.filter((item) => {
      const searchable = [item.question, item.answer].join(" ").toLowerCase();
      return !term || searchable.includes(term);
    });
  }, [faqs, searchValue]);

  const handleDelete = (faq) => {
    const shouldDelete = window.confirm(`Delete FAQ "${faq.question}"? This action cannot be undone.`);
    if (!shouldDelete) return;
    deleteFaqBySlug(faq.slug);
    setFaqs((current) => current.filter((item) => item.slug !== faq.slug));
    setOpenSlug((current) => (current === faq.slug ? "" : current));
  };

  return (
    <section className="admin-courses-section" id="faqs">
      <div className="admin-courses-container">
        <div className="courses-topbar">
          <div className="courses-topbar__heading">
            <p className="courses-topbar__crumb">
              <span>Dashboard</span>
              <ChevronRight size={14} />
              <strong>Frequently Asked Questions</strong>
            </p>
            <h1>Frequently Asked Questions</h1>
            <p>Manage the FAQ content</p>
          </div>

          <div className="courses-topbar__actions">
            <label className="courses-search" htmlFor="faq-search-input">
              <Search size={20} />
              <input
                id="faq-search-input"
                type="text"
                placeholder="Search FAQs..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </label>

            <NavLink to="/faqs/add" className="courses-add-btn">
              <Plus size={18} /> Add FAQ
            </NavLink>
          </div>
        </div>

        <div className="faq-admin-list">
          {filteredFaqs.map((item) => {
            const isOpen = openSlug === item.slug;

            return (
              <article className={`faq-admin-item${isOpen ? " is-open" : ""}`} key={item.slug}>
                <button
                  type="button"
                  className="faq-admin-toggle"
                  onClick={() => setOpenSlug((current) => (current === item.slug ? "" : item.slug))}
                >
                  <span>{item.question}</span>
                  {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                </button>

                {isOpen && (
                  <div className="faq-admin-body">
                    <p>{item.answer}</p>
                    <div className="faq-admin-actions">
                      <NavLink to={`/faqs/${item.slug}/edit`} className="admin-btn admin-btn-primary">
                        <Pencil size={14} /> Edit FAQ
                      </NavLink>
                      <button type="button" className="admin-btn admin-btn-danger" onClick={() => handleDelete(item)}>
                        <Trash2 size={14} /> Delete FAQ
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="courses-empty-state">
            <h3>No FAQs matched your search</h3>
            <p>Try another keyword or add a new FAQ item.</p>
          </div>
        )}
      </div>
    </section>
  );
}
