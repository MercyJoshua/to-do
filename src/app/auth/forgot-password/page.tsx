"use client";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[url('/assets/bg.png')] bg-cover bg-center relative p-4">
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative w-full max-w-md p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl">
        <header className="space-y-2 text-center">
          <div className="flex items-center gap-2 justify-center text-white">
            <KeyRound className="h-6 w-6" />
            <h1 className="text-2xl font-semibold">Reset Password</h1>
          </div>
          <p className="text-gray-300 text-sm">
            Enter your email, and we&apos;ll send you a reset link.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-white block text-sm">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-gray-300 border border-white/30 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-opacity-30 hover:text-blue-500 text-white transition duration-200"
          >
            Send Reset Link
          </button>

          <p className="text-sm text-center text-gray-300">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-yellow-400 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
