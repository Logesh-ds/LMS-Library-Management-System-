import { useState } from "react";
import { useEffect } from "react";
import { Dashboard } from "@/components/Dashboard";
import { Welcome } from "./Welcome";
import Login from "./Login";
import Signup from "./Signup";

const Index = () => {
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("lms_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [userRole, setUserRole] = useState<string>(() => {
    return localStorage.getItem("lms_userRole") || "";
  });
  const [showWelcome, setShowWelcome] = useState(() => {
    const stored = localStorage.getItem("lms_showWelcome");
    return stored ? stored === "true" : true;
  });
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(() => {
    return localStorage.getItem("lms_authMode") as "login" | "signup" | null;
  });

  // Sync state to localStorage on change
  useEffect(() => {
    localStorage.setItem("lms_user", user ? JSON.stringify(user) : "");
  }, [user]);
  useEffect(() => {
    localStorage.setItem("lms_userRole", userRole);
  }, [userRole]);
  useEffect(() => {
    localStorage.setItem("lms_showWelcome", showWelcome.toString());
  }, [showWelcome]);
  useEffect(() => {
    localStorage.setItem("lms_authMode", authMode || "");
  }, [authMode]);
  const handleLogin = (role: string, userData: any) => {
  setUser(userData);
  setUserRole(role);
  };

  const handleLogout = () => {
  setUser(null);
  setUserRole("");
  setShowWelcome(true);
  setAuthMode(null);
  localStorage.removeItem("lms_user");
  localStorage.removeItem("lms_userRole");
  localStorage.removeItem("lms_authMode");
  };

  if (showWelcome) {
    return <Welcome 
      onContinue={() => setShowWelcome(false)}
      onLogin={() => { setShowWelcome(false); setAuthMode("login"); }}
      onSignup={() => { setShowWelcome(false); setAuthMode("signup"); }}
    />;
  }

  if (!user) {
    if (authMode === "login") {
      return <Login 
        onLogin={handleLogin} 
        onBack={() => { setShowWelcome(true); setAuthMode(null); }} 
        onSignupNavigate={() => setAuthMode("signup")}
      />;
    }
    if (authMode === "signup") {
      return <Signup onLogin={handleLogin} onBack={() => { setShowWelcome(true); setAuthMode(null); }} />;
    }
    return null;
  }

  return <Dashboard user={user} role={userRole} onLogout={handleLogout} />;
};

export default Index;