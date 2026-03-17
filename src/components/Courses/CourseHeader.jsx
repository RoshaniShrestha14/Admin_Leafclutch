import { ChevronRight } from "lucide-react";

const CourseHeader = () => {
  return (
    <div className="courses-topbar__heading">
      <p className="courses-topbar__crumb">
        <span>Dashboard</span>
        <ChevronRight size={14} />
        <strong>Courses</strong>
      </p>
      <h1>Courses</h1>
      <p>Manage all courses</p>
    </div>
  );
};

export default CourseHeader;