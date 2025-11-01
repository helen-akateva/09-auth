

// "use client";
// import { checkSession, getUser } from "@/lib/api/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";
// import { useEffect, useState } from "react";

// interface Props {
//   children: React.ReactNode;
// }

// export default function AuthProvider({ children }: Props) {
//   const setUser = useAuthStore((state) => state.setUser);
//   const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const session = await checkSession();
        
//         if (session?.success) {
//           try {
//             const user = await getUser();
//             if (user) {
//               setUser(user);
//             }
//           } catch (userError) {
//             console.error("Failed to get user:", userError);
//             clearIsAuthenticated();
//           }
//         } else {
//           clearIsAuthenticated();
//         }
//       } catch (error: unknown) {
//         console.error("AuthProvider error:", error);
//         clearIsAuthenticated();
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchUser();
//   }, [setUser, clearIsAuthenticated]);

//   if (isLoading) {
//     return <div>Loading...</div>; // показуємо лоадер
//   }

//   return <>{children}</>;
// }

"use client";
import { checkSession, getUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await checkSession();
        
        if (session?.success) {
          try {
            const user = await getUser();
            if (user) {
              setUser(user);
            }
          } catch (userError) {
            // Якщо не вдалось отримати користувача - очищаємо стан
            if (userError instanceof AxiosError && userError.response?.status === 401) {
              console.log("User not authenticated");
              clearIsAuthenticated();
            }
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        // Ігноруємо помилки перевірки сесії - користувач просто не авторизований
        console.log("No active session");
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}