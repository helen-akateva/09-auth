import { getServerUser } from "@/lib/serverApi";
import css from './ProfilePage.module.css';
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'User profile page',
};

export default async function Profile() {
    const user = await getServerUser();
    
    return (<main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src="Avatar"
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
       Username: {user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>
)
}