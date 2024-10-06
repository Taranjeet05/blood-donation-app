"use client"; 

import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from './page.module.css'; 

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={styles.page}>
      <h1>Welcome to the Blood Donation App</h1>
      {session ? (
        <div>
          <p>Logged in as: {session.user.email}</p>
          {/* Additional user-specific content can go here */}
        </div>
      ) : (
        <div className={styles.ctas}>
          <Link href="/login" className={`${styles.primary}`}>
            Login
          </Link>
          <Link href="/register" className={`${styles.secondary}`}>
            Sign Up
          </Link>
          <button onClick={() => signIn('google')} className={styles.primary}>
            Sign Up with Google
          </button>
        </div>
      )}
    </div>
  );
}
