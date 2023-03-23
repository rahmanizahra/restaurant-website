import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogInPage from "./pages/LogInPage";
import Users from "./pages/Users";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminPage from "./pages/AdminPage";
import ExictingMeals from "./Components/Admin/ExictingMeals";
import ManageMealClass from "./Components/Admin/ManageMealClass";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {" "}
      </Route>{" "}
      <Route path="/login" element={<LogInPage />}>
        {" "}
      </Route>{" "}
      <Route path="/user" element={<Users />} />{" "}
      <Route path="/signup" element={<SignupPage />} />{" "}
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />{" "}
      <Route path="/admin" element={<AdminPage />} />{" "}
      <Route path="/manage-meal" element={<ManageMealClass />} />{" "}
    </Routes>
  );
}

export default App;
