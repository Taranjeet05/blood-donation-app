'use client';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react'; 
import styles from './profile.module.css';
import { useRouter } from 'next/navigation'; 

export default function Profile() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter(); 

    useEffect(() => {
        if (session) {
            fetch('/api/users/profile')
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [session]);

    const handleLogout = async () => {
        await signOut({ redirect: false }); 
        router.push('/'); 
    };

    if (status === 'loading') {
        return <p className={styles.loadingText}>Loading...</p>;
    }

    if (loading) {
        return <p className={styles.loadingText}>Loading user data...</p>;
    }

    if (error) {
        return <p className={styles.errorText}>Error: {error}</p>;
    }

    return (
        <div className={styles.container}>
            {session ? (
                <>
                    <h1 className={styles.title}>{`${user?.name}'s Profile`}</h1>
                    <div className={styles.infoContainer}>
                        <p className={styles.text}><strong>Email:</strong> {user?.email}</p>
                        <p className={styles.text}><strong>Blood Type:</strong> {user?.bloodType}</p>
                        <p className={styles.text}><strong>Contact Number:</strong> {user?.contactNumber}</p>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </>
            ) : (
                <p className={styles.noSession}>You are not logged in.</p>
            )}
        </div>
    );
} 
