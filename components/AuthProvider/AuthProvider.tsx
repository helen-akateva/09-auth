// "use client";

// import { checkSession, getUser } from "@/lib/clientApi";
// import { useAuthStore } from "@/lib/store/authStore";

// import { useEffect } from "react";

// interface Props {
//   children: React.ReactNode;
// }

// export default function AuthProvider ({ children }: Props) {
//   const setUser = useAuthStore((state) => state.setUser);
//   const clearIsAuthenticated = useAuthStore(
//     (state) => state.clearIsAuthenticated
//   );

//   useEffect(() => {
//     const fetchUser = async () => {
//       const isAuthenticated = await checkSession();
//       console.log("Check session: ", isAuthenticated);
//       if (isAuthenticated.success) {
//         const user = await getUser();
//         console.log(user);
//         if (user) setUser(user);
//       } else {
//         clearIsAuthenticated();
//       }
//     };
//     fetchUser();
//   }, [setUser, clearIsAuthenticated]);

//   return children;
// };


"use client";

import { checkSession, getUser } from "@/lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await checkSession();
        console.log("Check session:", session);

        if (session?.success) {
          const user = await getUser();
          if (user) {
            setUser(user);
          }
        } else {
          clearIsAuthenticated();
        }
      } catch (error: unknown) {
        console.error("AuthProvider error:", error);
        clearIsAuthenticated();
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
}
