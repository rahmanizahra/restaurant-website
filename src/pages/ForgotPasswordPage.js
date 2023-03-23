import React from "react";
import ForgotPassword from "../Components/SignIn/ForgotPassword";
import { AuthProvider } from "../store/AuthContext";

export default function ForgotPasswordPage() {
  return (
    <AuthProvider>
      <div>
        <ForgotPassword />
      </div>{" "}
    </AuthProvider>
  );
}
