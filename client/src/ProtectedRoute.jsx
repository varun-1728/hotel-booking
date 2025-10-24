// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => !!state.auth.access);

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return children;
}
