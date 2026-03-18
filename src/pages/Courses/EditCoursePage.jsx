import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CourseForm from "../../components/Courses/CourseForm";
import "../../components/Courses/Courses.css";
import { findCourseProgramBySlug, upsertCourseProgram } from "../../data/courseStore";
import { useNavigate } from "react-router-dom";

export default function EditCoursePage() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const program = findCourseProgramBySlug(courseSlug);

  const handleUpdateCourse = (payload) => {
    const updated = upsertCourseProgram(payload, courseSlug);
    navigate(`/dashboard/courses/${updated.slug}`);
  };

  if (!program) {
    return (
      <section className="program-page">
        <div className="program-page__container">
          <p className="program-page__eyebrow">Edit Program</p>
          <h1 className="program-page__title">Program Not Found</h1>
          <p className="program-page__lead">Cannot edit a program that does not exist.</p>
          <Link to="/dashboard/courses" className="admin-btn admin-btn-primary">
            <ArrowLeft size={14} /> Back to Courses
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="courses-page">
      <Link to="/dashboard/courses" className="program-page__back-link" style={{ marginBottom: "18px" }}>
        <ArrowLeft size={20} /> Courses
      </Link>
      <p className="breadcrumb">Dashboard &gt; Courses &gt; Edit Program</p>
      <h1 className="form-title">Edit Program</h1>
      <p className="subtext" style={{ marginBottom: "16px" }}>
        Updating: <strong>{program.title}</strong>
      </p>
      <CourseForm existingData={program} onSubmit={handleUpdateCourse} submitLabel="Update Course" />
    </section>
  );
}
