import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock3, Signal } from "lucide-react";
import "../../components/Courses/Courses.css";
import { getCoursePrograms } from "../../data/courseStore";
import CourseHeader from "../../components/Courses/CourseHeader";
import SearchBar from "../../components/Courses/SearchBar";

export default function CoursesPage() {
  const coursePrograms = useMemo(() => getCoursePrograms(), []);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = useMemo(() => {
    const badges = [...new Set(coursePrograms.map((course) => course.badge))].map((value) => ({
      value: `badge:${value.toLowerCase()}`,
      label: value,
    }));

    const levels = [...new Set(coursePrograms.map((course) => course.level))].map((value) => ({
      value: `level:${value.toLowerCase()}`,
      label: value,
    }));

    return [{ value: "all", label: "All" }, ...badges, ...levels];
  }, [coursePrograms]);

  const filteredCourses = useMemo(() => {
    const term = searchValue.trim().toLowerCase();

    return coursePrograms.filter((course) => {
      const searchableText = [course.title, course.badge, course.level, course.description, ...course.features]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !term || searchableText.includes(term);

      const matchesFilter =
        selectedFilter === "all" ||
        selectedFilter === `badge:${course.badge.toLowerCase()}` ||
        selectedFilter === `level:${course.level.toLowerCase()}`;

      return matchesSearch && matchesFilter;
    });
  }, [coursePrograms, searchValue, selectedFilter]);

  return (
    <section className="admin-courses-section" id="courses">
      <div className="admin-courses-container">
        <div className="courses-topbar">
          <CourseHeader />
          <SearchBar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            filterOptions={filterOptions}
          />
        </div>

        <div className="admin-courses-grid">
          {filteredCourses.map((course) => (
            <article className="admin-course-card" key={course.title}>
              <div
                className="admin-course-image"
                style={{ backgroundImage: `url('${course.image}')` }}
              >
                <div className="admin-course-overlay">
                  <div className="admin-course-category-badge">{course.badge}</div>
                </div>
              </div>

              <div className="admin-course-body">
                <h3 className="admin-course-title">{course.title}</h3>
                <ul className="admin-course-features">
                  {course.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={16} /> {feature}
                    </li>
                  ))}
                </ul>

                <div className="admin-course-meta">
                  <span>
                    <Clock3 size={14} /> {course.duration}
                  </span>
                  <span>
                    <Signal size={14} /> {course.level}
                  </span>
                </div>

                <NavLink to={`/courses/${course.slug}`} className="admin-btn admin-btn-primary admin-btn-block">
                  View Program <ArrowRight size={14} />
                </NavLink>
              </div>
            </article>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="courses-empty-state">
            <h3>No courses matched your search</h3>
            <p>Try another keyword or switch filter to All.</p>
          </div>
        )}
      </div>
    </section>
  );
}