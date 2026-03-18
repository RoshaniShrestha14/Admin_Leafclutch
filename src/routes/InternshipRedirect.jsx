import { Navigate, useParams } from "react-router-dom";

export function InternshipDetailRedirect() {
  const { trainingSlug } = useParams();
  return <Navigate to={`/internships/${trainingSlug}`} replace />;
}

export function InternshipEditRedirect() {
  const { trainingSlug } = useParams();
  return <Navigate to={`/internships/${trainingSlug}/edit`} replace />;
}
