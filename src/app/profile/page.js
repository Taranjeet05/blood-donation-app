'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './profile.module.css';

export default function Profile() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (loading) {
        return <p>Loading user data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.container}>
            {session ? (
                <>
                    <h1 className={styles.title}>{`${user?.name}'s Profile`}</h1>
                    <p className={styles.text}>Email: {user?.email}</p>
                    <p className={styles.text}>Blood Type: {user?.bloodType}</p>
                    <p className={styles.text}>Contact Number: {user?.contactNumber}</p>
                </>
            ) : (
                <p className={styles.noSession}>You are not logged in.</p>
            )}
        </div>
    );
}
