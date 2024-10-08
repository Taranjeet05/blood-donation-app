'use client';
import { useEffect, useState } from 'react';

export default function DonationTracking() {
  const [donations, setDonations] = useState([]);
  const [nextDonationDate, setNextDonationDate] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      const res = await fetch('/api/donations');
      const data = await res.json();
      setDonations(data);

      // Calculate next eligible donation date (assuming 3 months interval).
      // This is for the user to show the time they can donate there blood again.
      if (data.length > 0) {
        const lastDonation = new Date(data[0].donationDate);
        const nextDate = new Date(lastDonation);
        nextDate.setMonth(nextDate.getMonth() + 3);
        setNextDonationDate(nextDate);
      }
    };

    fetchDonations();
  }, []);

  const calculateDaysLeft = () => {
    if (!nextDonationDate) return 0;
    const today = new Date();
    const diffTime = Math.abs(nextDonationDate - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Days left
  };

  return (
    <div>
      <h1>Donation History</h1>
      {donations.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <ul>
          {donations.map(donation => (
            <li key={donation._id}>
              <strong>Date:</strong> {new Date(donation.donationDate).toLocaleDateString()} <br />
              <strong>Blood Type:</strong> {donation.bloodType} <br />
              <strong>Hospital:</strong> {donation.hospital} <br />
              <strong>Amount:</strong> {donation.amount} units
            </li>
          ))}
        </ul>
      )}

      {nextDonationDate && (
        <div>
          <h2>Next Eligible Donation Date</h2>
          <p>{nextDonationDate.toLocaleDateString()}</p>
          <p>Days left: {calculateDaysLeft()}</p>
        </div>
      )}
    </div>
  );
}
