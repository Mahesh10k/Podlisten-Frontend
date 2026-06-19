import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/firebase/firebase.js";
import { Input } from "@/components/ui/input";
import "../App.css";
import { useUserRegister } from "@/hooks/use-users";

interface ErrorObject {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorObject>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const registerUser = useUserRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const tempErrors: ErrorObject = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = "Full name is required";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      tempErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      tempErrors.password =
        "Password must contain at least one number, one uppercase and one lowercase letter";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Create user with Firebase
        // await createUserWithEmailAndPassword(
        //   auth,
        //   formData.email,
        //   formData.password,
        // );

        const uid = crypto.randomUUID();
        registerUser.mutate({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          uid,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Store email in session storage to pre-fill login form
        sessionStorage.setItem("registeredEmail", formData.email);

        navigate("/login");
      } catch (error) {
        // Handle Firebase errors
        console.error("Signup error:", error);
        let errorMessage = "Failed to create account";

        if (error.code === "auth/email-already-in-use") {
          errorMessage = "This email is already in use";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address";
        } else if (error.code === "auth/weak-password") {
          errorMessage = "Password is too weak";
        }

        setAuthError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-12 text-white relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-600/20" />

          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6">Join PodListen</h1>

            <p className="text-slate-300 text-lg mb-8">
              Create your account and start discovering amazing podcasts from
              creators around the world.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3 items-center">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                Unlimited Podcast Listening
              </div>

              <div className="flex gap-3 items-center">
                <div className="h-3 w-3 rounded-full bg-cyan-500" />
                Upload Your Own Podcasts
              </div>

              <div className="flex gap-3 items-center">
                <div className="h-3 w-3 rounded-full bg-violet-500" />
                Personalized Recommendations
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-background p-8 lg:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Create Account</h2>

              <p className="text-muted-foreground mt-2">
                Start your podcast journey today
              </p>
            </div>

            {authError && (
              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-red-500 text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                />

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Password Hint */}
              <div className="rounded-lg border p-3 text-xs text-muted-foreground bg-muted/30">
                Password must contain:
                <ul className="mt-2 space-y-1 list-disc pl-4">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-lg bg-violet-600 hover:bg-violet-700 transition text-white font-medium"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Already Registered?
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-violet-500 hover:text-violet-400"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
