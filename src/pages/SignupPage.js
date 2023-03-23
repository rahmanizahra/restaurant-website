import React from "react";
import Signup from "../Components/SignIn/Signup";
import { AuthProvider } from "../store/AuthContext";

function SignupPage() {
  return (
    <AuthProvider>
      <div>
        <Signup />
      </div>{" "}
    </AuthProvider>
  );
}

export default SignupPage;
