import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

interface Todo {
  userId: string;
  _id: string;
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
  
}

// Get token from localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {}; 
  };

  export const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos/all`, {
        headers: getAuthHeader(),
      });

      console.log("🔍 Raw API Response:", response.data); // Debugging line

      // ✅ Ensure it's always an array
      const todosArray = Array.isArray(response.data) ? response.data : [];

      const todos = todosArray.map((todo: Todo) => ({
        id: todo._id || todo.id, 
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        status: todo.status as "pending" | "completed", // Type assertion
        priority: todo.priority as "low" | "medium" | "high", // Type assertion
        userId: todo.userId,
        createdAt: todo.createdAt,
        _id: todo._id || todo.id,
      }));

      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
};

// 🔹 Fetch a single todo by ID
export const fetchTodoById = async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos/${id}`, {
        headers: getAuthHeader(),
      });
  
      console.log("🔍 Fetched Todo:", response.data); 
  
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo with ID ${id}:`, error);
      throw error;
    }
  };

  // 🔹 Update a Todo by ID
export const updateTodo = async (id: string, updatedTodo: { title?: string; description?: string; dueDate?: string; priority?: string; status?: string }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, updatedTodo, {
        headers: getAuthHeader(),
      });
  
      console.log("✅ Updated Todo:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating todo with ID ${id}:`, error);
      throw error;
    }
  };

  export const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`, { headers: getAuthHeader() });
      return { success: true };
    } catch (error) {
      console.error("Error deleting todo:", error);
  
      // 🔹 Type assertion to safely access response data
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        "Failed to delete todo. Please try again.";
  
      return {
        success: false,
        message: errorMessage,
      };
    }
  };
  
// 🔹 Create a Todo (Authenticated)
export const createTodo = async (title: string, description: string, dueDate: string, priority: string) => {
    try {
    const token = localStorage.getItem("token"); 
      const response = await axios.post(
        `${API_BASE_URL}/todos/create`,
        { title, description, dueDate, priority },
        {
            headers: {
              Authorization: `Bearer ${token}`, 
              "Content-Type": "application/json",
            },
          }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };
//  Sign Up
export const signUp = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// 🔹 Login API
export const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
  
      const { token, user } = response.data; // ✅ Ensure we get 'user' from backend
  
      // ✅ Store token & user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };
  //Logout
  export const logoutUser = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`);
      localStorage.removeItem("token"); // 🔹 Remove token from storage
      return { success: true };
    } catch (error) {
      console.error("Error logging out:", error);
      return {
        success: false,
        message: "Failed to logout. Please try again.",
      };
    }
  };