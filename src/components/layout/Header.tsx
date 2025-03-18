import Link from "next/link";
import { ListTodo } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <ListTodo className="h-8 w-8 text-primary" />
          <Link href="/" className="text-2xl font-bold text-primary">
            TaskMaster
          </Link>
        </div>
        <nav className="space-x-6">
          <Link href="/auth/login" className="text-gray-100 hover:text-blue-500">
            Login
          </Link>
          <Link href="/auth/signup" className="text-gray-100 hover:text-green-500">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
