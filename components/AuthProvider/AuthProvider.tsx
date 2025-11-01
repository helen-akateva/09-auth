
// "use client";

// import { checkSession, getUser } from "@/lib/api/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";
// import { useEffect } from "react";

// interface Props {
//   children: React.ReactNode;
// }

// export default function AuthProvider({ children }: Props) {
//   const setUser = useAuthStore((state) => state.setUser);
//   const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const session = await checkSession();
//         console.log("Check session:", session);

//         if (session?.success) {
//           const user = await getUser();
//           if (user) {
//             setUser(user);
//           }
//         } else {
//           clearIsAuthenticated();
//         }
//       } catch (error: unknown) {
//         console.error("AuthProvider error:", error);
//         clearIsAuthenticated();
//       }
//     };

//     fetchUser();
//   }, [setUser, clearIsAuthenticated]);

//   return children;
// }

"use client";
import { checkSession, getUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

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
            console.error("Failed to get user:", userError);
            clearIsAuthenticated();
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error: unknown) {
        console.error("AuthProvider error:", error);
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>; // показуємо лоадер
  }

  return <>{children}</>;
}