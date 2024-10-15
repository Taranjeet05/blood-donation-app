"use client";
import React, { useState } from 'react';
import styles from './BloodRequestCard.module.css';
import Link from 'next/link';  

const BloodRequestCard = ({ request, userEmail, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
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

          {userEmail && request.email !== userEmail && (
            <Link href={`/appointment-selection?requestId=${request._id}&urgency=${request.urgency}`} passHref>
              <button className={styles.button}>Donate</button>
            </Link>
          )}

          {userEmail && request.email === userEmail && (
            <>
              <button className={styles.button} onClick={() => onDelete(request._id)}>Delete Request</button>
              <button className={styles.button} onClick={() => onEdit(request)}>Edit Request</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BloodRequestCard;
