import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Session Expired, Please Login")
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;