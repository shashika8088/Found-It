// src/components/AuthModal.tsx
import React, { useState } from "react";
import { login, signup } from "../services/authService";
import { User } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    setError("");
    try {
      const user = isSignup ? signup(username, password) : login(username, password);
      if (!user) {
        setError("Invalid credentials");
        return;
      }
      onLogin(user);
      // Clear inputs
      setUsername("");
      setPassword("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background dark:bg-dark-surface rounded-lg p-6 shadow-2xl w-96 relative border border-amber-200/60 dark:border-amber-700/30">
        <h2 className="text-xl font-semibold mb-4 text-center text-text dark:text-dark-text">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        {/* Inputs */}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-3 p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-surface dark:bg-dark-surface text-text dark:text-dark-text focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600 outline-none transition-all"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full mb-3 p-2 border border-slate-300 dark:border-slate-700 rounded-md bg-surface dark:bg-dark-surface text-text dark:text-dark-text focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600 outline-none transition-all"
        />

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        {/* Buttons */}
        <div className="flex flex-col space-y-2 mt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-md p-2 font-semibold transition-colors  dark:bg-dark-primary dark:hover:bg-dark-primary-hover dark:text-dark-text
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300 dark:focus:ring-dark-primary
                         transition-colors"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          <button
            onClick={onClose}
            className="mt-2 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-slate-600 shadow-sm px-4 py-2 
             bg-white dark:bg-dark-surface text-base font-medium text-gray-700 dark:text-dark-text-secondary 
             hover:bg-gray-50 dark:hover:bg-dark-surface/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
             transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Toggle between Signin and Signup */}
        <p
          className="mt-4 text-sm text-center text-blue-500 hover:underline cursor-pointer"
          onClick={() => setIsSignup((prev) => !prev)}
        >
          {isSignup ? "Already have an account? Sign In" : "No account? Create one"}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
