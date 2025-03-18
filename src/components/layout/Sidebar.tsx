"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Settings, LogOut } from "lucide-react";
import { logoutUser } from "@/api"; // Import the logout function
import { useState } from "react";

const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
  { title: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const response = await logoutUser();
    if (response.success) {
      router.push("/auth/login"); 
    } else {
      alert(response.message);
    }
    setLoading(false);
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5 fixed top-0 left-0 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">TaskMaster</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-md transition ${
                pathname === item.href ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="flex items-center gap-3 p-3 rounded-md transition hover:text-red-700 text-white w-full mt-4"
      >
        <LogOut className="w-5 h-5" />
        {loading ? "Logging out..." : "Logout"}
      </button>
    </aside>
  );
}
