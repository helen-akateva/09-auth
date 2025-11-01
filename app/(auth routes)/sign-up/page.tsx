"use client";


import { registerUser } from "@/lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from './SignUpPage.module.css'


export default function RegisterPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userData = { email, password };
    const user = await registerUser(userData);
    if (user) {
      setUser(user);
    }
  };

  return (
  <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form action={handleSubmit} className={css.form}>
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
        Register
      </button>
    </div>

    <p className={css.error}>Error</p>
  </form>
</main>

  );
}
