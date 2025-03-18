import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // ✅ Retrieve user from localStorage
      }
    }
  }, [router]);

  return { isAuthenticated, user };
};
