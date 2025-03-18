"use client";
import { ListPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTodo } from "@/api";

export default function NewTodoPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createTodo(title, description, dueDate, priority);
      router.push("/dashboard"); // ✅ Redirect after success
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 p-6">
      <div className="w-full max-w-lg p-6 bg-gray-800 text-white rounded-xl shadow-lg">
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <ListPlus className="h-7 w-7" />
            <h1 className="text-2xl font-semibold">Create New Todo</h1>
          </div>
          <p className="text-gray-400">Add a new task to your todo list</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm text-gray-300">Title</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title"
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm text-gray-300">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter todo description"
              className="w-full min-h-[100px] p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-sm text-gray-300">Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm text-gray-300">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              Create Todo
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
