"use client";
import BloodRequestForm from '../components/BloodRequestForm';
import BloodRequestCard from '../components/BloodRequestCard'; 
import { useState, useEffect } from 'react';
import styles from './request.module.css'; 

const RequestPage = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null); 

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
    const response = await fetch(`/api/blood-requests/${id}`, {  
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (data.success) {
      setBloodRequests((prevRequests) => prevRequests.filter((req) => req._id !== id));
    }
  };

  const handleEdit = (request) => {
    setEditingRequest(request); 
  };

  const handleUpdate = async (updatedRequest) => {
    const response = await fetch(`/api/blood-requests/${updatedRequest._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRequest),
    });
    const data = await response.json();
    if (data.success) {
      setBloodRequests((prevRequests) =>
        prevRequests.map((req) => (req._id === updatedRequest._id ? updatedRequest : req))
      );
      setEditingRequest(null); 
    }
  };

  return (
    <div className={styles.requestPageContainer}>
      <h1>Your Blood Requests</h1>
      <BloodRequestForm
        onRequestSuccess={handleRequestSuccess}
        editingRequest={editingRequest} 
        onUpdate={handleUpdate} 
      />

      {bloodRequests.length === 0 ? (
        <p>No blood requests found.</p>
      ) : (
        <div className={styles.cardContainer}>
          {bloodRequests.map((request) => (
            <BloodRequestCard
              key={request._id}
              request={request}
              onDelete={handleDelete}
              onEdit={handleEdit} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestPage;
