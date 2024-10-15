import React, { useState } from 'react';
import styles from './BloodRequestCard.module.css';

const BloodRequestCard = ({ request, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    onDelete(request._id);
  };

  return (
    <div className={styles.card} onClick={toggleDetails}>
      <h2>{request.requesterName}</h2>
      <p>Relation: {request.relation}</p>
      <p>Blood Type: {request.bloodType}</p>

      {isOpen && (
        <div className={styles.details}>
          <p><strong>Location:</strong> {request.location}</p>
          <p><strong>Urgency:</strong> {request.urgency}</p>
          <p><strong>Message:</strong> {request.message}</p>
          <button className={styles.button} onClick={handleDelete}>Delete Request</button>
          <button className={styles.button}>Edit Request</button> 
        </div>
      )}
    </div>
  );
};

export default BloodRequestCard;
