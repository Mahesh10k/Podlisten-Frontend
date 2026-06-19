import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  // signInWithEmailAndPassword,
  sendPasswordResetEmail,
  // GoogleAuthProvider,
  // signInAnonymously,
  // signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.js";
import type { FirebaseError } from "firebase/app";
import { toast } from "sonner";
import { useUserStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import "../App.css";
import { useUserLogin } from "@/hooks/use-users";
import type { ERROR_OBJECT } from "@/dashboard/constants";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" },
  );
  const [errors, setErrors] = useState<ERROR_OBJECT>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const { setUser, updateFavourites } = useUserStore();
  const userLoginMutation = useUserLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ERROR_OBJECT;
    setFormData({ ...formData, [name]: value });
    if (errors[fieldName]) setErrors({ ...errors, [fieldName]: "" });
  };

  const validateForm = () => {
    const tempErrors: ERROR_OBJECT = {};
    let isValid = true;

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError("");
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // await signInWithEmailAndPassword(
        //   auth,
        //   formData.email,
        //   formData.password,
        // );

        const response = await userLoginMutation.mutateAsync(formData);
        if (response?.token) {
          setUser({
            name: response.user.name,
            email: response.user.email,
            uid: response.user.id,
            role: response.user.role,
            isLogged: true,
            profileURL: "",
          });
          updateFavourites(response.user.favourites);
          localStorage.setItem("token", response?.token);
          toast.success("Login Succesful");
          navigate("/dashboard");
        } else {
          toast.error(response?.message);
        }

        setFormData({ email: "", password: "" });
      } catch (err) {
        const error = err as FirebaseError;
        let errorMessage = "Failed to log in";
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          errorMessage = "Invalid email or password";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage =
            "Too many failed login attempts. Please try again later";
        }
        toast.error(errorMessage);
        setAuthError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.warning("Please enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formData.email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err) {
      const error = err as FirebaseError;
      console.error("Password reset error:", error);
      let errorMessage = "Failed to send reset email";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      }
      toast.error(errorMessage);
    }
  };

  // const handleGoogleSignup = async () => {
  //   setAuthError("");
  //   try {
  //     const provider = new GoogleAuthProvider();
  //     const result = await signInWithPopup(auth, provider);
  //     setUser({
  //       name: result.user.displayName,
  //       email: result.user.email,
  //       profileURL: result.user.photoURL,
  //       uid: crypto.randomUUID(),
  //       role: result.user.email == "maheshpikki03@gmail.com" ? "admin" : "user",
  //       isLogged: true,
  //     });
  //     // Navigate to main page after successful Google signup
  //     toast.success("Account created successfully!");
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Google signup error:", error);
  //     setAuthError("Google sign up failed. Please try again.");
  //     toast.error(authError);
  //   }
  // };

  // const handleGuestAccess = async () => {
  //   setAuthError("");
  //   try {
  //     await signInAnonymously(auth);
  //     // Navigate to main page after successful guest login
  //     setUser({
  //       name: "Guest",
  //       email: "guest@email.com",
  //       profileURL: "",
  //       uid: "",
  //       role: "user",
  //       isLogged: true,
  //     });
  //     toast.success("Logged in as guest successfully");
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Guest access error:", error);
  //     setAuthError("Guest access failed. Please try again.");
  //     toast.error(authError);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-500/20" />

          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6">PodListen</h1>

            <p className="text-lg text-slate-300 mb-8">
              Discover, upload and stream your favorite podcasts from anywhere.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Unlimited Podcast Access</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-cyan-500" />
                <span>Trending Podcasts</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-violet-500" />
                <span>Cloud Storage Integration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className="bg-background p-8 lg:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Welcome Back</h2>

              <p className="text-muted-foreground mt-2">
                Sign in to continue your podcast journey
              </p>
            </div>

            {authError && (
              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-red-500 text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-violet-500 hover:text-violet-400"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-lg bg-violet-600 hover:bg-violet-700 transition text-white font-medium"
              >
                {isSubmitting ? "Logging in..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignup}
                className="h-11 border rounded-lg hover:bg-accent transition flex items-center justify-center gap-2"
              >
                Google
              </button>

              <button
                onClick={handleGuestAccess}
                className="h-11 border rounded-lg hover:bg-accent transition"
              >
                Guest
              </button>
            </div> */}

            <p className="text-center mt-8 text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-violet-500 font-medium hover:text-violet-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
