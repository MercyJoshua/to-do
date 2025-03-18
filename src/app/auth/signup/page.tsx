"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { signUp } from "@/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      await signUp(name, email, password);
      setSuccess("Account created successfully! Redirecting...");

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Login error:", err);
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[url('/assets/bg.png')] bg-cover bg-center relative">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-white/20">
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center text-white gap-2">
            <UserPlus className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Create Account</h1>
          </div>
          <p className="text-gray-300 text-sm">Enter your details to register.</p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center">{success}</p>}

          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-white text-sm">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/20 backdrop-blur-md text-white placeholder-gray-300 border border-white/30 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-white text-sm">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/20 backdrop-blur-md text-white placeholder-gray-300 border border-white/30 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-white text-sm">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/20 backdrop-blur-md text-white placeholder-gray-300 border border-white/30 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-white text-sm">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-white/20 backdrop-blur-md text-white placeholder-gray-300 border border-white/30 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-opacity-30 hover:text-green-500 text-white py-2 rounded-lg transition duration-200"
          >
            Create Account
          </button>

          {/* Additional Links */}
          <div className="text-center text-sm text-gray-300 mt-4">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
