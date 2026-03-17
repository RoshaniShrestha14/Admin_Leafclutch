import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRight, Filter, Plus, Search, Star, UserRound } from "lucide-react";
import "../components/Courses/Courses.css";
import "../components/Testimonials/Testimonials.css";
import { getTestimonials } from "../data/testimonialStore";

export default function TestimonialsPage() {
  const testimonials = useMemo(() => getTestimonials(), []);
  const [searchValue, setSearchValue] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");

  const filterOptions = useMemo(() => {
    const programs = [...new Set(testimonials.map((item) => item.program))].map((program) => ({
      value: program.toLowerCase(),
      label: program,
    }));
    return [{ value: "all", label: "All" }, ...programs];
  }, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    return testimonials.filter((item) => {
      const searchable = [item.name, item.role, item.program, item.message].join(" ").toLowerCase();
      const matchesSearch = !term || searchable.includes(term);
      const matchesFilter = selectedProgram === "all" || item.program.toLowerCase() === selectedProgram;
      return matchesSearch && matchesFilter;
    });
  }, [testimonials, searchValue, selectedProgram]);

  return (
    <section className="admin-courses-section" id="testimonials">
      <div className="admin-courses-container">
        <div className="courses-topbar">
          <div className="courses-topbar__heading">
            <p className="courses-topbar__crumb">
              <span>Dashboard</span>
              <ChevronRight size={14} />
              <strong>Testimonials</strong>
            </p>
            <h1>Testimonials</h1>
            <p>Manage student feedback and success stories</p>
          </div>

          <div className="courses-topbar__actions">
            <label className="courses-search" htmlFor="testimonials-search-input">
              <Search size={20} />
              <input
                id="testimonials-search-input"
                type="text"
                placeholder="Search testimonials..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </label>

            <div className="courses-filter-wrap">
              <button type="button" className="courses-filter-btn">
                <Filter size={18} />
                <select
                  value={selectedProgram}
                  onChange={(event) => setSelectedProgram(event.target.value)}
                  className="testimonial-inline-select"
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </button>
            </div>

            <NavLink to="/dashboard/testimonials/add" className="courses-add-btn">
              <Plus size={18} /> Add Testimonial
            </NavLink>
          </div>
        </div>

        <div className="testimonials-list">
          {filteredTestimonials.map((item) => (
            <NavLink to={`/dashboard/testimonials/${item.slug}`} className="testimonial-card" key={item.slug}>
              <div className="testimonial-card__stars" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={`${item.slug}-star-${index}`} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-card__quote">"{item.message}"</p>

              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">
                  <UserRound size={22} />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="courses-empty-state">
            <h3>No testimonials matched your search</h3>
            <p>Try another keyword or switch filter to All.</p>
          </div>
        )}
      </div>
    </section>
  );
}
