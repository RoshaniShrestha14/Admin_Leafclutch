import { useState } from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    slug: "python-for-ai-data-science",
    title: "Python for AI & Data Science",
    category: "Artificial Intelligence & Machine Learning",
    duration: "4 Weeks",
    level: "Beginner",
    status: "Published",
  },
];

const CourseTable = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    alert("Delete course " + id);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Course</th>
            <th>Duration</th>
            <th>Level</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td><input type="checkbox" /></td>

              <td>
                <p className="course-title">{course.title}</p>
                <p className="course-category">{course.category}</p>
              </td>

              <td>{course.duration}</td>
              <td>{course.level}</td>

              <td>
                <span className="status">{course.status}</span>
              </td>

              <td className="action-cell">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === course.id ? null : course.id)
                  }
                >
                  ⋮
                </button>

                {openMenu === course.id && (
                  <div className="dropdown">
                    <p onClick={() => navigate(`/courses/${course.slug}/edit`)}>
                      Edit
                    </p>
                    <p onClick={() => handleDelete(course.id)}>
                      Delete
                    </p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;