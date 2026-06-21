import LandingPage from "./landing-page/LandingPage";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./login/Login";
import SignupForm from "./login/Signup";
import Layout from "./dashboard/Layout";
import Home from "./dashboard/content-page/Home";
import Podcast from "./dashboard/content-page/Podcast";
import Upload from "./dashboard/content-page/Upload";
import Settings from "./dashboard/content-page/Settings";
import Favourites from "./dashboard/content-page/Favourites";
import ProtectedRoute from "./dashboard/ProtectedRoute";
import { Toaster } from "sonner";
import Users from "./dashboard/content-page/Users";
import NotFound from "./dashboard/PageNotFound";

const App = () => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signup" element={<SignupForm />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout children={<Home />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/podcasts"
          element={
            <ProtectedRoute>
              <Layout children={<Podcast />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/upload"
          element={
            <ProtectedRoute>
              <Layout children={<Upload />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <Layout children={<Settings />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/favourites"
          element={
            <ProtectedRoute>
              <Layout children={<Favourites />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <Layout children={<Users />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/*"
          element={<Layout children={<NotFound />} />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
