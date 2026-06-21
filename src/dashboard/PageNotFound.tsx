import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <AlertTriangle className="h-20 w-20 text-destructive" />

      <h1 className="mt-6 text-6xl font-bold">404</h1>

      <h2 className="mt-2 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        The page you are looking for doesn't exist or may have been moved.
      </p>

      <Link to="/dashboard" className="mt-6">
        <Button size="lg">
          <Home className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;