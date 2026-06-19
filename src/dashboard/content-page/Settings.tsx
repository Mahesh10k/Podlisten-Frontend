import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  User,
  Mail,
  Shield,
  LogOut,
  // Podcast,
  // Upload,
} from "lucide-react";
import { auth } from "@/firebase/firebase";
import { useUserStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();

  const { name, email, profileURL, role, clearUser } = useUserStore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser();
      localStorage.removeItem("token");
      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error("Failed to logout");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>

          <CardDescription>Your account information</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-3xl font-bold text-white">
              {name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />

                <span className="font-medium">{name || "Unknown User"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />

                <span>{email || "No Email"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />

                <Badge>{role}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      {/* <div className="grid gap-4 md:grid-cols-2">

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Podcast className="h-5 w-5" />
              Podcasts
            </CardTitle>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              12
            </h2>

            <p className="text-muted-foreground">
              Podcasts listened
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Uploads
            </CardTitle>
          </CardHeader>

          <CardContent>
            <h2 className="text-3xl font-bold">
              5
            </h2>

            <p className="text-muted-foreground">
              Podcasts uploaded
            </p>
          </CardContent>
        </Card>

      </div> */}

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Display Name</p>

            <p className="font-medium">{name}</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Email</p>

            <p className="font-medium">{email}</p>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Profile Type</p>

            <p className="font-medium">{profileURL || role}</p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>

          <CardDescription>Logout from your account</CardDescription>
        </CardHeader>

        <CardContent>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
