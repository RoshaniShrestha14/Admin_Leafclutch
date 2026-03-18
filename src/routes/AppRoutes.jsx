import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminSidebar from "../components/Layout/AdminSidebar";
import NotFound from "../components/ui/NotFound";
import CoursesPage from "../pages/Courses/CoursesPage";
import OverviewPage from "../pages/OverviewPage";
import AddCourse from "../components/Courses/AddCourse";
import TestimonialsPage from "../pages/Testimonials";
import CourseProgramPage from "../pages/Courses/CourseProgramPage";
import EditCoursePage from "../pages/Courses/EditCoursePage";
import InternshipsPage from "../pages/Internships/InternshipsPage";
import InternshipProgramPage from "../pages/Internships/InternshipProgramPage";
import AddInternship from "../components/Internships/AddInternship";
import EditInternshipPage from "../pages/Internships/EditInternshipPage";
import TestimonialProgramPage from "../pages/Testimonials/TestimonialProgramPage";
import EditTestimonialPage from "../pages/Testimonials/EditTestimonialPage";
import AddTestimonial from "../components/Testimonials/AddTestimonial";
import FaqPage from "../pages/FaqPage";
import AddFaq from "../components/Faqs/AddFaq";
import EditFaqPage from "../pages/Faqs/EditFaqPage";
import { InternshipDetailRedirect, InternshipEditRedirect } from "./InternshipRedirect";
import LoginPage from "../pages/LoginPage";
import { isAuthenticated, logoutAdmin } from "../data/authStore";

function LogoutRoute({ onLogout }) {
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Navigate to="/login" replace />;
}

function LegacyDashboardRedirect() {
  const location = useLocation();
  const nextPath = location.pathname.replace(/^\/dashboard/, "") || "/";
  return <Navigate to={`${nextPath}${location.search}${location.hash}`} replace />;
}

function DashboardShellRoutes() {
  return (
    <div className="dashboard-shell">
      <AdminSidebar />
      <main className="dashboard-main min-w-0">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseSlug" element={<CourseProgramPage />} />
          <Route path="/courses/:courseSlug/edit" element={<EditCoursePage />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/faqs/add" element={<AddFaq />} />
          <Route path="/faqs/:faqSlug/edit" element={<EditFaqPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/testimonials/add" element={<AddTestimonial />} />
          <Route path="/testimonials/:testimonialSlug" element={<TestimonialProgramPage />} />
          <Route path="/testimonials/:testimonialSlug/edit" element={<EditTestimonialPage />} />
          <Route path="/add-testimonial" element={<AddTestimonial />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/internships/add" element={<AddInternship />} />
          <Route path="/internships/:trainingSlug" element={<InternshipProgramPage />} />
          <Route path="/internships/:trainingSlug/edit" element={<EditInternshipPage />} />
          <Route path="/trainings" element={<Navigate to="/internships" replace />} />
          <Route path="/add-training" element={<Navigate to="/internships/add" replace />} />
          <Route path="/trainings/:trainingSlug" element={<InternshipDetailRedirect />} />
          <Route path="/trainings/:trainingSlug/edit" element={<InternshipEditRedirect />} />
          <Route path="/dashboard/*" element={<LegacyDashboardRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default function AdminRoutes() {
  const [authenticated, setAuthenticated] = useState(() => isAuthenticated());

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthenticated(false);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={authenticated ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />}
      />
      <Route path="/logout" element={<LogoutRoute onLogout={handleLogout} />} />
      <Route path="*" element={authenticated ? <DashboardShellRoutes /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}