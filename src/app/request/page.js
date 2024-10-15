"use client";
import BloodRequestForm from '../components/BloodRequestForm';
import { useState } from 'react';

const RequestPage = () => {
  const [bloodRequests, setBloodRequests] = useState([]);

  const handleRequestSuccess = (newRequest) => {
    setBloodRequests((prevRequests) => [...prevRequests, newRequest]);
  };

  return (
    <div>
      <h1>Request Blood</h1>
      <BloodRequestForm onRequestSuccess={handleRequestSuccess} />
    </div>
  );
};

export default RequestPage;
