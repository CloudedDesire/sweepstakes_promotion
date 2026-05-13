"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(setUsers);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <ul className="space-y-2">
        {users.map((u: any) => (
          <li key={u._id} className="p-3 bg-white shadow rounded">
            <strong>{u.name}</strong>
            <div>{u.email}</div>
            <div>Total Entries: {u.totalEntries}</div>
            <div>Status: {u.statusTier}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
