"use client";

import { checkSession, getUser } from "@/lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      console.log("Check session: ", isAuthenticated);
      if (isAuthenticated.success) {
        const user = await getUser();
        console.log(user);
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
