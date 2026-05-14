"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Check your email to verify your account.");
      setLoading(false);
      return;
    }

    setMessage(data.error || "Something went wrong.");
    setLoading(false);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded bg-black/40 border border-purple-500"
        />

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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 rounded shadow-[0_0_15px_#a855f7]"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      {message && <p className="mt-4 text-purple-300">{message}</p>}
    </div>
  );
}
