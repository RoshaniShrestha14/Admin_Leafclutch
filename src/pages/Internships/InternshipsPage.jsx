import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { CheckCircle2, ChevronRight, Filter, Plus, Search } from "lucide-react";
import "../../components/Courses/Courses.css";
import "../../components/Internships/Internships.css";
import { getInternshipPrograms } from "../../data/internshipStore";

export default function InternshipsPage() {
  const internships = useMemo(() => getInternshipPrograms(), []);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = useMemo(() => {
    const badges = [...new Set(internships.map((item) => item.badge))].map((value) => ({
      value: value.toLowerCase(),
      label: value,
    }));
    return [{ value: "all", label: "All" }, ...badges];
  }, [internships]);

  const filteredInternships = useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    return internships.filter((item) => {
      const searchable = [item.title, item.badge, item.enrollText, ...item.features].join(" ").toLowerCase();
      const matchesSearch = !term || searchable.includes(term);
      const matchesFilter = selectedFilter === "all" || item.badge.toLowerCase() === selectedFilter;
      return matchesSearch && matchesFilter;
    });
  }, [internships, searchValue, selectedFilter]);

  return (
    <section className="admin-courses-section" id="internships">
      <div className="admin-courses-container">
        <div className="courses-topbar">
          <div className="courses-topbar__heading">
            <p className="courses-topbar__crumb">
              <span>Dashboard</span>
              <ChevronRight size={14} />
              <strong>Internship Plans</strong>
            </p>
            <h1>Internship Plans</h1>
            <p>Manage all internship plans</p>
          </div>

          <div className="courses-topbar__actions">
            <label className="courses-search" htmlFor="internships-search-input">
              <Search size={20} />
              <input
                id="internships-search-input"
                type="text"
                placeholder="Search internship plans..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </label>

            <div className="courses-filter-wrap">
              <button type="button" className="courses-filter-btn">
                <Filter size={18} />
                <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="internship-inline-select">
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </button>
            </div>

            <NavLink to="/internships/add" className="courses-add-btn">
              <Plus size={18} /> Add Internship Plan
            </NavLink>
          </div>
        </div>

        <div className="internship-grid">
          {filteredInternships.map((item) => (
            <NavLink
              to={`/internships/${item.slug}`}
              className={`internship-card${item.highlighted ? " highlighted" : ""}`}
              key={item.slug}
            >
              {item.highlighted && <div className="internship-card__badge">{item.badge}</div>}
              <h3>{item.title}</h3>
              <p className="internship-card__price">
                {item.totalFee} <span>{item.feeLabel}</span>
              </p>
              <p className="internship-card__enroll">{item.enrollText}</p>
              <h4>{item.sectionTitle}</h4>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}><CheckCircle2 size={16} /> {feature}</li>
                ))}
              </ul>
            </NavLink>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="courses-empty-state">
            <h3>No internship plans matched your search</h3>
            <p>Try another keyword or switch filter to All.</p>
          </div>
        )}
      </div>
    </section>
  );
}
