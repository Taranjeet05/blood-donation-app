"use client";
import BloodRequestForm from '../components/BloodRequestForm';
import BloodRequestCard from '../components/BloodRequestCard'; 
import { useState, useEffect } from 'react';
import styles from './request.module.css'; 

const RequestPage = () => {
  const [bloodRequests, setBloodRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch('/api/blood-requests');
      const data = await response.json();
      if (data.success) {
        setBloodRequests(data.requests);
      }
    };
    fetchRequests();
  }, []);

  const handleRequestSuccess = (newRequest) => {
    setBloodRequests((prevRequests) => [...prevRequests, newRequest]);
  };

  const handleDelete = async (id) => {
    const response = await fetch('/api/blood-requests', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (data.success) {
      setBloodRequests((prevRequests) => prevRequests.filter((req) => req._id !== id));
    }
  };

  return (
    <div className={styles.requestPageContainer}>
      <h1>Your Blood Requests</h1>
      <BloodRequestForm onRequestSuccess={handleRequestSuccess} />

      {bloodRequests.length === 0 ? (
        <p>No blood requests found.</p>
      ) : (
        <div className={styles.cardContainer}>
          {bloodRequests.map((request) => (
            <BloodRequestCard key={request._id} request={request} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestPage;
