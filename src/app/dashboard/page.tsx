"use client";
import TodoCard from "@/components/TodoCard";
import { ListTodo, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { fetchTodos } from "@/api";

interface Todo {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [filter, setFilter] = useState("all");
  const { isAuthenticated, user } = useAuth(); 
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      const fetchedTodos = await fetchTodos();
      const todos: Todo[] = fetchedTodos.map((todo) => ({
        _id: todo._id,
        id: todo.id,
        createdAt: todo.createdAt,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        priority: todo.priority,
        dueDate: todo.dueDate,
      }));
      console.log("🔍 Todos in Dashboard:", todos); 
      setTodos(todos);
    };
    getTodos();
  }, []);
  
  
  const handleStatusChange = (id: string, newStatus: "pending" | "completed") => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      );

      // Update localStorage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  // ✅ Fix filter logic
  const filteredTodos =
    filter === "pending"
      ? todos.filter((todo) => todo.status === "pending")
      : filter === "completed"
      ? todos.filter((todo) => todo.status === "completed")
      : todos;

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1E1E2E] to-[#11111B] p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-white">
            <ListTodo className="h-8 w-8" />
            Dashboard
          </h1>
          <p className="text-white text-lg">👋 Welcome, <span className="font-semibold">{user?.name || "User"}</span>!</p> {/* ✅ Display User Name */}
          <Link href="/dashboard/todo/new">
            <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/30 transition duration-200 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              New Todo
            </button>
          </Link>
        </div>

        {/* Filter Navbar */}
        <div className="w-full mt-6">
          <ul className="grid w-full grid-cols-3 mb-8 bg-white/20 backdrop-blur-md rounded-lg p-2 text-white font-semibold">
            <li
              className={`cursor-pointer px-4 py-2 rounded-lg ${
                filter === "all" ? "bg-white/30" : "hover:bg-white/10"
              }`}
              onClick={() => setFilter("all")}
            >
              All ({todos.length})
            </li>
            <li
              className={`cursor-pointer px-4 py-2 rounded-lg ${
                filter === "pending" ? "bg-white/30" : "hover:bg-white/10"
              }`}
              onClick={() => setFilter("pending")}
            >
              Pending ({todos.filter((todo) => todo.status === "pending").length})
            </li>
            <li
              className={`cursor-pointer px-4 py-2 rounded-lg ${
                filter === "completed" ? "bg-white/30" : "hover:bg-white/10"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed ({todos.filter((todo) => todo.status === "completed").length})
            </li>
          </ul>

       {/* Todo List (Filtered) */}
<div className="space-y-4">
  {filteredTodos.length > 0 ? (
    filteredTodos.map((todo) => (

      <TodoCard key={todo.id || todo._id} todo={todo} onStatusChange={handleStatusChange} />

    ))
  ) : (
    <p className="text-gray-400 text-center">No todos found.</p>
  )}
</div>

        </div>
      </div>
    </main>
  );
}
