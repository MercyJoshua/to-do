"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/dashboard"); 
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[url('/assets/bg.png')] bg-cover bg-center relative">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 p-6 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl p-6">
          {/* Header */}
          <header className="text-center space-y-2">
            <div className="flex items-center justify-center text-white gap-2">
              <LogIn className="h-6 w-6" />
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <p className="text-gray-300 text-sm">
              Enter your email and password to access your account.
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-white text-sm">
                Email
              </label>
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

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-white text-sm">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/20 backdrop-blur-md text-white placeholder-gray-300 border border-white/30 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-opacity-30 hover:text-blue-500 text-white py-2 rounded-lg transition duration-200"
            >
              Sign In
            </button>

            {/* Additional Links */}
            <div className="text-center text-sm text-gray-300 mt-4">
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-green-500 hover:underline">
                  Sign up
                </Link>
              </p>
              <Link href="/auth/forgot-password" className="text-blue-400 hover:underline mt-2 block">
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
