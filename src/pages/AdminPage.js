import React from "react";
import Admin from "../Components/Admin/Admin";
import { AuthProvider } from "../store/AuthContext";

export default function AdminPage() {
  return (
    <AuthProvider>
      <Admin />
    </AuthProvider>
  );
}
