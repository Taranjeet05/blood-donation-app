"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import styles from './profile-completion.module.css'; 

const ProfileCompletion = () => {
    const { data: session } = useSession();
    const router = useRouter();  
    const [bloodType, setBloodType] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [profileComplete, setProfileComplete] = useState(false);

    useEffect(() => {
        const checkProfileCompletion = async () => {
            const response = await fetch('/api/users/profile');
            const userData = await response.json();

            if (userData.bloodType && userData.contactNumber) {
                setProfileComplete(true);
                router.push('/donor-search');  
            }
        };

        checkProfileCompletion();
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/users/profile-completion', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bloodType,
                contactNumber,
            }),
        });

        if (response.ok) {
            setProfileComplete(true); 
            router.push('/donor-search');  
        } else {
            console.error('Failed to update profile');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Complete Your Profile</h1>
            {profileComplete && <p>Your profile is complete! Redirecting...</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Blood Type:
                    <select 
                        className={styles.input}
                        value={bloodType} 
                        onChange={(e) => setBloodType(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Select your blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </label>
                <label className={styles.label}>
                    Contact Number:
                    <input 
                        type="text" 
                        className={styles.input}
                        value={contactNumber} 
                        onChange={(e) => setContactNumber(e.target.value)} 
                        required 
                    />
                </label>
                <button className={styles.button} type="submit">Save Profile</button>
            </form>
        </div>
    );
};

export default ProfileCompletion;
