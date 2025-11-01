"use client";

import { loginUser } from "@/lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from './SignInPage.module.css';



export default function LoginPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userData = { email, password };
    const user = await loginUser(userData);
    if (user) {
      setUser(user);
    }
  };

  return (
   <main className={css.mainContent}>
 <form action={handleSubmit} className={css.form}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

    <p className={css.error}>Error</p>
  </form>
</main>
  );
}