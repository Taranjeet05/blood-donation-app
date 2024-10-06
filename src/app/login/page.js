'use client'; 

import React, { useState } from 'react';
import styles from './Login.module.css'; 
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push('/donor-search'); 
    } else {
      setError(res?.error || 'Invalid credentials'); 
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        
        {error && <div className={styles.error}>{error}</div>} {/* Error message */}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="Email"
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Password"
          required
        />
        
        <button type="submit" className={`${styles.button} ${styles.primary}`}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
