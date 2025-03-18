"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Calendar, Clock, Edit2, Flag, Trash2 } from "lucide-react";
import { deleteTodo, fetchTodoById } from "@/api";

interface Todo {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
}

export default function TodoPage() {
  const params = useParams();
  const id = params.id as string;

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const todoData = await fetchTodoById(id);
        setTodo(todoData);
      } catch (err) {
        setError("Failed to load todo. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTodo();
  }, [id]);

  const handleDelete = async () => {
    const result = await deleteTodo(id);
    if (result.success) {
      window.history.back(); // Redirect back after deletion
    } else {
      setError(result.message ?? "An unknown error occurred.");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-2xl p-6 bg-gray-800 text-white rounded-xl shadow-lg">
        {/* Header Section */}
        <header className="flex justify-between items-start border-b border-gray-700 pb-4">
          <div>
            <h1 className="text-2xl font-semibold">{todo?.title}</h1>
            <p className="mt-2 text-gray-400">{todo?.description}</p>
          </div>
          <div className="flex space-x-2">
            {/* Edit Button */}
            <Link
            href={`/dashboard/todo/${id}/edit`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
            >
              <Edit2 className="h-5 w-5" />
              <span>Edit</span>
            </Link>

            {/* Delete Button */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete</span>
            </button>
          </div>
        </header>

        {/* Details Section */}
        <section className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">
                Due: {todo ? new Date(todo.dueDate).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">
                Created: {todo ? new Date(todo.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className={`h-5 w-5 ${getPriorityColor(todo?.priority || "")}`} />
              <span className={getPriorityColor(todo?.priority || "")}>
                {todo?.priority ? (todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)) : "No"} Priority
              </span>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-lg text-sm ${
                  todo?.status === "completed" ? "bg-green-600" : "bg-yellow-500"
                }`}
              >
                {(todo?.status ?? "").charAt(0).toUpperCase() + (todo?.status ?? "").slice(1)}
              </span>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <footer className="mt-6 flex justify-end">
          <button
            className="px-5 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 transition"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </footer>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-white">Are you sure?</h2>
            <p className="text-gray-400 mt-2">
              This action cannot be undone. This will permanently delete this todo.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 transition"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
