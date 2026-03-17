import { Navigate, useParams } from "react-router-dom";

export function InternshipDetailRedirect() {
  const { trainingSlug } = useParams();
  return <Navigate to={`/dashboard/internships/${trainingSlug}`} replace />;
}

export function InternshipEditRedirect() {
  const { trainingSlug } = useParams();
  return <Navigate to={`/dashboard/internships/${trainingSlug}/edit`} replace />;
}
