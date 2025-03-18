import Link from "next/link";
import { CheckCircle2, Circle, Edit } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: "pending" | "completed";
}

const TodoCard = ({ todo, onStatusChange }: { todo: Todo; onStatusChange: (id: string, status: "pending" | "completed") => void }) => {
    console.log("🔍 Todo Object in Card:", todo); 
  
    return (
      <div className="mb-4 bg-white/10 backdrop-blur-lg border border-white/30 shadow-lg rounded-lg">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              {/* Status & Title */}
              <div className="flex items-center gap-2">
                <button onClick={() => onStatusChange(todo.id, todo.status === "pending" ? "completed" : "pending")}>
                  {todo.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-yellow-500" />
                  )}
                </button>
  
                {/* ✅ Log ID Here */}
                <Link href={`/dashboard/todo/${todo.id}`} className="text-lg font-semibold hover:underline text-white">
                  {todo.title} 
                </Link>
              </div>
  
              {/* Description */}
              <p className="text-sm text-gray-200">{todo.description}</p>
  
              {/* Due Date & Priority */}
              <div className="flex gap-4 text-sm text-gray-300">
                <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                <span>Priority: {todo.priority}</span>
              </div>
            </div>
  
            <div className="flex gap-3">
              {/* Edit Button */}
              <Link href={`dashboard/todo/${todo.id}/edit`}>
                <button className="outline sm">
                  <Edit />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default TodoCard;
