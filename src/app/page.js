"use client"; 

import { useSession, signIn } from "next-auth/react";
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
          
          {!session.user.bloodType || !session.user.contactNumber ? (
            <Link href="/profile-completion" className={styles.primary}>
              Complete Your Profile
            </Link>
          ) : (
            <Link href="/donor-search" className={styles.primary}>
              Go to Donor Search
            </Link>
          )}
        </div>
      ) : (
        <div className={styles.ctas}>
          <Link href="/login" className={`${styles.primary}`}>
            Login
          </Link>
          <Link href="/register" className={`${styles.secondary}`}>
            Sign Up
          </Link>
          <button onClick={() => signIn('github')} className={styles.primary}>
            Sign Up with GitHub
          </button>
          <button onClick={() => signIn('google')} className={styles.primary}>
            Sign Up with Google
          </button>
        </div>
      )}
    </div>
  );
}
