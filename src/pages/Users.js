import React from "react";
import Main from "../Components/Main/Main";
import { AuthProvider } from "../store/AuthContext";

function Users() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default Users;
