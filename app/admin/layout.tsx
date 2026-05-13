export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-black text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

        <nav className="space-y-4">
          <a href="/admin/venues" className="block">Venues</a>
          <a href="/admin/events" className="block">Events</a>
          <a href="/admin/qr" className="block">QR Codes</a>
          <a href="/admin/entries" className="block">Entries</a>
          <a href="/admin/checkins" className="block">Check‑ins</a>
          <a href="/admin/users" className="block">Users</a>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
