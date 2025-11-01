"use client";

import { logoutUser } from "@/lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/router";
import css from "./AuthNavigation.module.css";
import Link from "next/link";

export default function AuthNavigation() {
  const router = useRouter();

  const { isAuthenticated, user } = useAuthStore();

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    await logoutUser();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}
