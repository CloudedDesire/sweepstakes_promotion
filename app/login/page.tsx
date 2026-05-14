"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Invalid login");
      setLoading(false);
      return;
    }

    // Login successful → redirect to profile
    router.push("/profile");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#0a0014] to-black text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded bg-black/40 border border-purple-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded bg-black/40 border border-purple-500"
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 rounded shadow-[0_0_15px_#a855f7]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-purple-300">
        Don’t have an account?{" "}
        <a href="/signup" className="underline text-purple-400">
          Sign up
        </a>
      </p>
    </div>
  );
}
