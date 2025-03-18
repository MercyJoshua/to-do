"use client";
import { KeyRound, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password update logic
  };

  const handleLogout = async () => {
    // TODO: Implement logout logic
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <header>
            <div className="flex items-center gap-2">
              <User className="h-6 w-6" />
              <title>Profile Information</title>
            </div>
            <h3>
              View and manage your account details
            </h3>
          </header>
          <div className="space-y-4">
            <div className="space-y-2">
              <label>Name</label>
              <input value={user.name} disabled />
            </div>
            <div className="space-y-2">
              <label>Email</label>
              <input value={user.email} disabled />
            </div>
          </div>
        </div>

        <div>
          <header>
            <div className="flex items-center gap-2">
              <KeyRound className="h-6 w-6" />
              <title>Change Password</title>
            </div>
            <h3>
              Update your password to keep your account secure
            </h3>
          </header>
          <div>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full">
                Update Password
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-end">
          <div>
            <div className="flex items-center gap-2">
              <button className="destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
            <div>
              <header>
                <title>Are you sure you want to logout?</title>
                <h3>
                  You will need to login again to access your account.
                </h3>
              </header>
              <footer>
                <button>Cancel</button>
                <button onClick={handleLogout}>Logout</button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}