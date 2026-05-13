"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const login = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(form)
    });

    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-80">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>

        <input
          placeholder="Username"
          className="border p-2 w-full mb-2"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <button
          onClick={login}
          className="bg-black text-white px-4 py-2 w-full rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
