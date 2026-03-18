import CourseForm from "./CourseForm";
import "./Courses.css";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { upsertCourseProgram } from "../../data/courseStore";

const AddCourse = () => {
  const navigate = useNavigate();

  const handleCreateCourse = (payload) => {
    const created = upsertCourseProgram(payload);
    navigate(`/courses/${created.slug}`);
  };

  return (
    <div className="courses-page">
      <Link to="/courses" className="program-page__back-link" style={{ marginBottom: "18px" }}>
        <ArrowLeft size={20} /> Courses
      </Link>
      <h1 className="form-title">Add New Course</h1>
      <CourseForm onSubmit={handleCreateCourse} submitLabel="Create Course" />
    </div>
  );
};

export default AddCourse;