import React from "react";
import LogIn from "../Components/SignIn/LogIn";
import { AuthProvider } from "../store/AuthContext";

function LogInPage() {
  return (
    <AuthProvider>
      <div>
        <LogIn />
      </div>{" "}
    </AuthProvider>
  );
}

export default LogInPage;
