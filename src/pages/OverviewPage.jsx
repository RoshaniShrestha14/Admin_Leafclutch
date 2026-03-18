import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  Briefcase,
  CircleHelp,
  MessageSquareQuote,
  Plus,
  Search,
} from "lucide-react";
import "../components/Overview/Overview.css";
import { getCoursePrograms } from "../data/courseStore";
import { getInternshipPrograms } from "../data/internshipStore";
import { getFaqs } from "../data/faqStore";
import { getTestimonials } from "../data/testimonialStore";

export default function OverviewPage() {
  const [searchValue, setSearchValue] = useState("");

  const dashboard = useMemo(() => {
    const courses = getCoursePrograms();
    const internships = getInternshipPrograms();
    const faqs = getFaqs();
    const testimonials = getTestimonials();

    return {
      stats: [
        {
          label: "Total Courses",
          value: courses.length,
          icon: BookOpen,
          to: "/courses",
          tone: "courses",
        },
        {
          label: "Internship Plans",
          value: internships.length,
          icon: Briefcase,
          to: "/internships",
          tone: "internships",
        },
        {
          label: "Testimonials",
          value: testimonials.length,
          icon: MessageSquareQuote,
          to: "/testimonials",
          tone: "testimonials",
        },
        {
          label: "FAQs",
          value: faqs.length,
          icon: CircleHelp,
          to: "/faqs",
          tone: "faqs",
        },
      ],
      actions: [
        { label: "Add Course", to: "/add-course", icon: Plus, tone: "primary" },
        { label: "Add Internship Plan", to: "/internships/add", icon: Briefcase, tone: "teal" },
        { label: "Add Testimonial", to: "/testimonials/add", icon: Plus, tone: "teal" },
        { label: "Add FAQ", to: "/faqs/add", icon: Plus, tone: "violet" },
      ],
      activity: [
        {
          tone: "blue",
          text: testimonials[0]
            ? `New testimonial from ${testimonials[0].name}`
            : "No testimonials added yet",
        },
        {
          tone: "teal",
          text: courses[0]
            ? `Course "${courses[0].title}" available in catalog`
            : "No courses available yet",
        },
        {
          tone: "violet",
          text: faqs[0]
            ? `FAQ section contains ${faqs.length} published answers`
            : "No FAQs published yet",
        },
      ],
      miniStats: [
        {
          label: "Total Content",
          value: courses.length + internships.length + testimonials.length + faqs.length,
          hint: "Across all modules",
        },
        {
          label: "FAQ Entries",
          value: faqs.length,
          hint: "Ready for website section",
        },
      ],
      distribution: [
        { label: "Courses", value: courses.length, to: "/courses", tone: "courses" },
        { label: "Internships", value: internships.length, to: "/internships", tone: "internships" },
        { label: "FAQs", value: faqs.length, to: "/faqs", tone: "faqs" },
        { label: "Testimonials", value: testimonials.length, to: "/testimonials", tone: "testimonials" },
      ],
      manage: [
        { label: "Manage Courses", to: "/courses", icon: BookOpen },
        { label: "Manage Internships", to: "/internships", icon: Briefcase },
        { label: "Manage FAQs", to: "/faqs", icon: CircleHelp },
        { label: "Manage Testimonials", to: "/testimonials", icon: MessageSquareQuote },
      ],
      searchIndex: [
        ...courses.map((item) => ({
          id: `course-${item.slug}`,
          title: item.title,
          subtitle: [item.badge, item.level, item.description].filter(Boolean).join(" • "),
          to: `/courses/${item.slug}`,
          type: "Course",
        })),
        ...internships.map((item) => ({
          id: `internship-${item.slug}`,
          title: item.title,
          subtitle: [item.badge, item.enrollText, ...item.features.slice(0, 2)].filter(Boolean).join(" • "),
          to: `/internships/${item.slug}`,
          type: "Internship",
        })),
        ...faqs.map((item) => ({
          id: `faq-${item.slug}`,
          title: item.question,
          subtitle: item.answer,
          to: `/faqs/${item.slug}/edit`,
          type: "FAQ",
        })),
        ...testimonials.map((item) => ({
          id: `testimonial-${item.slug}`,
          title: item.name,
          subtitle: [item.role, item.program, item.message].filter(Boolean).join(" • "),
          to: `/testimonials/${item.slug}`,
          type: "Testimonial",
        })),
      ],
    };
  }, []);

  const searchResults = useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    if (!term) return [];

    return dashboard.searchIndex
      .filter((item) => `${item.title} ${item.subtitle} ${item.type}`.toLowerCase().includes(term))
      .slice(0, 8);
  }, [dashboard.searchIndex, searchValue]);

  return (
    <section className="overview-dashboard">
      <div className="overview-shell">
        <header className="overview-hero">
          <div>
            <h1 className="overview-hero__title">Welcome, Admin! <span aria-hidden="true">👋</span></h1>
            <p className="overview-hero__copy">
              Manage your courses, internship plans, FAQs, and testimonials from one place.
            </p>
          </div>

          <div className="overview-search-wrap">
            <label className="overview-search" htmlFor="overview-global-search">
              <Search size={18} />
              <input
                id="overview-global-search"
                type="text"
                placeholder="Search the whole website content..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </label>

            {searchValue.trim() && (
              <div className="overview-search-results" role="listbox" aria-label="Global search results">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.to}
                      className="overview-search-result"
                      onClick={() => setSearchValue("")}
                    >
                      <div>
                        <p className="overview-search-result__title">{item.title}</p>
                        <p className="overview-search-result__subtitle">{item.subtitle}</p>
                      </div>
                      <span className={`overview-search-result__type is-${item.type.toLowerCase()}`}>{item.type}</span>
                    </NavLink>
                  ))
                ) : (
                  <div className="overview-search-empty">No matching content found.</div>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="overview-body">
          <div className="overview-stats">
            {dashboard.stats.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink key={item.label} to={item.to} className={`overview-stat-card is-${item.tone}`}>
                  <div className="overview-stat-card__icon">
                    <Icon size={26} />
                  </div>
                  <div>
                    <p className="overview-stat-card__value">{item.value}</p>
                    <p className="overview-stat-card__label">{item.label}</p>
                  </div>
                </NavLink>
              );
            })}
          </div>

          <div className="overview-grid">
            <div className="overview-grid__stack">
              <section className="overview-panel">
                <div className="overview-panel__header">
                  <h2 className="overview-panel__title">Quick Actions</h2>
                </div>
                <div className="overview-panel__body">
                  <div className="overview-action-grid">
                    {dashboard.actions.map((item) => {
                      const Icon = item.icon;

                      return (
                        <NavLink key={item.label} to={item.to} className={`overview-action-btn is-${item.tone}`}>
                          <Icon size={18} /> {item.label}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section className="overview-panel">
                <div className="overview-panel__header">
                  <h2 className="overview-panel__title">Recent Activity</h2>
                </div>
                <div className="overview-panel__body">
                  <div className="overview-activity-list">
                    {dashboard.activity.map((item) => (
                      <div className="overview-activity-item" key={item.text}>
                        <span className={`overview-activity-dot is-${item.tone}`} />
                        <p className="overview-activity-copy">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <div className="overview-grid__stack">
              <section className="overview-panel">
                <div className="overview-panel__header">
                  <h2 className="overview-panel__title">Stats Overview</h2>
                </div>
                <div className="overview-panel__body">
                  <div className="overview-mini-stats">
                    {dashboard.miniStats.map((item) => (
                      <article className="overview-mini-card" key={item.label}>
                        <p className="overview-mini-card__label">{item.label}</p>
                        <p className="overview-mini-card__value">{item.value}</p>
                        <p className="overview-mini-card__hint">{item.hint}</p>
                      </article>
                    ))}
                  </div>

                  <p className="overview-chart-title">Content Distribution</p>
                  <div className="overview-distribution">
                    {dashboard.distribution.map((item) => {
                      const total = dashboard.miniStats[0].value || 1;
                      const width = Math.max(8, Math.round((item.value / total) * 100));

                      return (
                        <NavLink key={item.label} to={item.to} className="overview-distribution__row">
                          <div className="overview-distribution__head">
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                          </div>
                          <div className="overview-distribution__track">
                            <span className={`overview-distribution__bar is-${item.tone}`} style={{ width: `${width}%` }} />
                          </div>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section className="overview-panel">
                <div className="overview-panel__header">
                  <h2 className="overview-panel__title">Manage</h2>
                </div>
                <div className="overview-panel__body">
                  <div className="overview-manage-grid">
                    {dashboard.manage.map((item) => {
                      const Icon = item.icon;

                      return (
                        <NavLink key={item.label} to={item.to} className="overview-manage-card">
                          <span className="overview-manage-card__icon">
                            <Icon size={28} />
                          </span>
                          <span className="overview-manage-card__label">{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
