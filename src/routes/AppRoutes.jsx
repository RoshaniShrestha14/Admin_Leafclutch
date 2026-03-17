import { Navigate, Route, Routes } from "react-router-dom";
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

export default function AdminRoutes() {
  return (
    <div className="dashboard-shell">
      <AdminSidebar />
      <main className="dashboard-main min-w-0">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<OverviewPage />} />
          <Route path="/dashboard/courses" element={<CoursesPage />} />
          <Route path="/dashboard/courses/:courseSlug" element={<CourseProgramPage />} />
          <Route path="/dashboard/courses/:courseSlug/edit" element={<EditCoursePage />} />
          <Route path="/dashboard/add-course" element={<AddCourse />} />
          <Route path="/dashboard/faqs" element={<FaqPage />} />
          <Route path="/dashboard/faqs/add" element={<AddFaq />} />
          <Route path="/dashboard/faqs/:faqSlug/edit" element={<EditFaqPage />} />
          <Route path="/dashboard/testimonials" element={<TestimonialsPage />} />
          <Route path="/dashboard/testimonials/add" element={<AddTestimonial />} />
          <Route path="/dashboard/testimonials/:testimonialSlug" element={<TestimonialProgramPage />} />
          <Route path="/dashboard/testimonials/:testimonialSlug/edit" element={<EditTestimonialPage />} />
          <Route path="/dashboard/add-testimonial" element={<AddTestimonial />} />
          <Route path="/dashboard/internships" element={<InternshipsPage />} />
          <Route path="/dashboard/internships/add" element={<AddInternship />} />
          <Route path="/dashboard/internships/:trainingSlug" element={<InternshipProgramPage />} />
          <Route path="/dashboard/internships/:trainingSlug/edit" element={<EditInternshipPage />} />
          <Route path="/dashboard/trainings" element={<Navigate to="/dashboard/internships" replace />} />
          <Route path="/dashboard/add-training" element={<Navigate to="/dashboard/internships/add" replace />} />
          <Route path="/dashboard/trainings/:trainingSlug" element={<InternshipDetailRedirect />} />
          <Route path="/dashboard/trainings/:trainingSlug/edit" element={<InternshipEditRedirect />} />
          <Route path="/courses" element={<Navigate to="/dashboard/courses" replace />} />
          <Route path="/courses/:courseSlug" element={<Navigate to="/dashboard/courses" replace />} />
          <Route path="/add-course" element={<Navigate to="/dashboard/add-course" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}