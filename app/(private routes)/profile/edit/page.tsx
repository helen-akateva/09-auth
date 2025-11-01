// import Image from "next/image";
// import css from './EditProfilePage.module.css'

// export default function EditProfileData() {
//   return <main className={css.mainContent}>
//   <div className={css.profileCard}>
//     <h1 className={css.formTitle}>Edit Profile</h1>

//     <Image src="avatar"
//       alt="User Avatar"
//       width={120}
//       height={120}
//       className={css.avatar}
//     />

//     <form className={css.profileInfo}>
//       <div className={css.usernameWrapper}>
//         <label htmlFor="username">Username:</label>
//         <input id="username"
//           type="text"
//           className={css.input}
//         />
//       </div>

//       <p>Email: user_email@example.com</p>

//       <div className={css.actions}>
//         <button type="submit" className={css.saveButton}>
//           Save
//         </button>
//         <button type="button" className={css.cancelButton}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   </div>
// </main>
// ;
// }

"use client";
import { getUser, updateUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import css from './EditProfilePage.module.css';

export default function EditProfileData() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUsername(userData.username);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser({ name: username });
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src="https://example.com/avatar.jpg"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p>Email: {user?.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}