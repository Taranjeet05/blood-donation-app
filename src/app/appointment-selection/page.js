"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useSearchParams } from 'next/navigation'; 
import styles from './appointment-selection.module.css'; 

const AppointmentSelectionPage = () => {
  const [profile, setProfile] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [datesAvailable, setDatesAvailable] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams(); 

  const requestId = searchParams.get('requestId');
  const urgency = searchParams.get('urgency');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/users/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (urgency) {
      const daysToAdd = urgency === 'high' ? 2 : urgency === 'medium' ? 4 : 6;
      const availableDates = generateDatesForNextDays(daysToAdd);
      setDatesAvailable(availableDates);
    }
  }, [urgency]);

  const generateDatesForNextDays = (days) => {
    const dates = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      alert('Please select a date before confirming the appointment.');
      return;
    }

    const appointmentData = {
      requestId,
      selectedDate,
      userEmail: profile.email,
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Appointment confirmed:', result);
      alert('Appointment confirmed successfully!');
      router.push('/donor-search'); 
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Failed to confirm appointment. Please try again later.');
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className={styles.appointmentSelectionContainer}>
      <h2 className={styles.heading}>Select Appointment</h2>
      <form>
        <div className={styles.profileInfo}>
          <p className={styles.profileInfo}>Name: {profile.name}</p>
          <p className={styles.profileInfo}>Email: {profile.email}</p>
          <p className={styles.profileInfo}>Blood Type: {profile.bloodType}</p>
          <p className={styles.profileInfo}>Contact: {profile.contact}</p>
        </div>

        <label className={styles.label} htmlFor="date">Select Date:</label>
        <select
          id="date"
          className={styles.select}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="" disabled>Select a date</option>
          {datesAvailable.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>

        <button type="button" className={styles.button} onClick={handleSubmit}>Confirm Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentSelectionPage;
