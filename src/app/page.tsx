
import { CheckCircle, ListTodo } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[url('/assets/background.png')] bg-cover bg-center relative">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex items-center space-x-2 text-white">
            <ListTodo className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">TaskMaster</h1>
          </div>

          <h2 className="text-2xl text-gray-300 max-w-2xl">
            Your personal task management solution. Stay organized, focused, and accomplish more.
          </h2>

          {/* Glassmorphic Cards */}
          <div className="grid gap-8 md:grid-cols-3 w-full max-w-4xl mt-12">
            {["Simple & Intuitive", "Stay Organized", "Track Progress"].map((title, index) => (
              <div
                key={index}
                className="p-6 flex flex-col items-center space-y-4 
                  bg-pink/10 backdrop-filter backdrop-blur-sm border-white/20 shadow-lg rounded-xl"
              >
                <CheckCircle className="h-8 w-8 text-green-400" />
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="text-gray-300 text-center">
                  {title === "Simple & Intuitive"
                    ? "Easy to use interface that helps you focus on what matters most."
                    : title === "Stay Organized"
                    ? "Categorize and prioritize your tasks effortlessly."
                    : "Monitor your productivity and celebrate achievements."}
                </p>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-8 text-lg">
            <button  className=" bg-opacity-30 hover:text-blue-500 text-white">
              <Link href="/auth/login">Get Started</Link>
            </button>
            <button className=" bg-opacity-50 hover:text-green-500 text-white">
              <Link href="/auth/signup">Create Account</Link>
            </button>
            
          </div>
        </div>
      </div>
    </main>
  );
}
