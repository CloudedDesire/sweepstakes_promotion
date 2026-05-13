"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    statusTier: "",
    totalEntries: ""
  });

  // ⭐ EDITING STATE
  const [editing, setEditing] = useState<any>(null);

  // ⭐ LOAD USERS
  useEffect(() => {
    fetch("/api/users")
      .then(r => r.json())
      .then(setUsers);
  }, []);

  // ⭐ CREATE USER
  const createUser = async () => {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(form)
    });

    const updated = await fetch("/api/users").then(r => r.json());
    setUsers(updated);

    setForm({
      name: "",
      email: "",
      phone: "",
      statusTier: "",
      totalEntries: ""
    });
  };

  // ⭐ START EDITING
  const startEdit = (user: any) => {
    setEditing({ ...user });
  };

  // ⭐ SAVE EDIT
  const saveEdit = async () => {
    await fetch("/api/users", {
      method: "PATCH",
      body: JSON.stringify(editing)
    });

    const updated = await fetch("/api/users").then(r => r.json());
    setUsers(updated);
    setEditing(null);
  };

  // ⭐ DELETE USER
  const deleteUser = async (id: string) => {
    await fetch("/api/users", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });

    const updated = await fetch("/api/users").then(r => r.json());
    setUsers(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* LEFT SIDE — CREATE USER */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Add User</h2>

          <div className="space-y-2">
            {Object.keys(form).map(key => (
              <input
                key={key}
                placeholder={key}
                className="border p-2 w-full"
                value={(form as any)[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
              />
            ))}

            <button
              onClick={createUser}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save User
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — USER LIST */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Existing Users</h2>

          <ul className="space-y-2">
            {users.map((u: any) => (
              <li key={u._id} className="p-3 bg-white shadow rounded">
                <strong>{u.name}</strong>
                <div>{u.email}</div>
                <div>{u.phone}</div>
                <div>Status: {u.statusTier}</div>
                <div>Total Entries: {u.totalEntries}</div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEdit(u)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ⭐ EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            {Object.keys(editing)
              .filter(k => k !== "_id")
              .map(key => (
                <input
                  key={key}
                  className="border p-2 w-full mb-2"
                  value={editing[key]}
                  onChange={e => setEditing({ ...editing, [key]: e.target.value })}
                />
              ))}

            <div className="flex gap-2 mt-4">
              <button
                onClick={saveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
