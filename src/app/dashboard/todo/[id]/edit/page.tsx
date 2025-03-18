"use client";
import { fetchTodoById, updateTodo } from "@/api";
import { Edit } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Todo {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export default function EditTodoPage() {
  const params = useParams();
  const id = params.id as string;

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Temporary mock data - replace with API call

  // ✅ Fetch Todo Data
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await fetchTodoById(id);
        setTodo(data);
      } catch (err) {
        setError("Failed to load todo data");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);


  // ✅ Handle Todo Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;

    try {
      await updateTodo(id, todo);
      alert("Todo updated successfully!");
      window.history.back();
    } catch (err) {
      alert("Failed to update todo");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;
  if (!todo) return <p className="text-center text-red-400">Todo not found</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 p-6">
      <div className="w-full max-w-lg p-6 bg-gray-800 text-white rounded-xl shadow-lg">
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-blue-400">
            <Edit className="h-7 w-7" />
            <h1 className="text-2xl font-semibold">Edit Todo</h1>
          </div>
          <p className="text-gray-400">Update your todo details</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm text-gray-300">Title</label>
            <input
              id="title"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              placeholder="Enter todo title"
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm text-gray-300">Description</label>
            <textarea
              id="description"
              value={todo.description}
              onChange={(e) => setTodo({ ...todo, description: e.target.value })}
              placeholder="Enter todo description"
              className="w-full min-h-[100px] p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-sm text-gray-300">Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={todo.dueDate}
                onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
                required
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm text-gray-300">Priority</label>
              <select
                id="priority"
                value={todo.priority}
                onChange={(e) => setTodo({ ...todo, priority: e.target.value as "low" | "medium" | "high" })}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm text-gray-300">Status</label>
              <select
                id="status"
                value={todo.status}
                onChange={(e) => setTodo({ ...todo, status: e.target.value as "pending" | "completed" })}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
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
              className="px-5 py-2 bg-blue-400 text-black font-semibold rounded-lg hover:bg-blue-500 transition"
            >
              Update Todo
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
