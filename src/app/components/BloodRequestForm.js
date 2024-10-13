import { useState } from 'react';
import styles from '../request/request.module.css'; 

const BloodRequestForm = () => {
  const [requesterName, setRequesterName] = useState('');
  const [relation, setRelation] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState('');

  const bloodTypes = [
    { value: '', label: 'Select Blood Type' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  const urgencyLevels = [
    { value: '', label: 'Select Urgency' },
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/blood-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requesterName, relation, bloodType, urgency, message }),
    });

    const data = await response.json();
    setNotification(data.message);

    if (data.success) {
      setRequesterName('');
      setRelation('');
      setBloodType('');
      setUrgency('');
      setMessage('');
    }
  };

  return (
    <div>
      {notification && <p>{notification}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Your Name"
          value={requesterName}
          onChange={(e) => setRequesterName(e.target.value)}
          required
        />
        <select className={styles.select} value={relation} onChange={(e) => setRelation(e.target.value)} required>
          <option value="">Select Relation</option>
          <option value="Self">Self</option>
          <option value="Family">Family</option>
          <option value="Friend">Friend</option>
          <option value="Other">Other</option>
        </select>
        <select className={styles.select} value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
          {bloodTypes.map((blood) => (
            <option key={blood.value} value={blood.value}>
              {blood.label}
            </option>
          ))}
        </select>
        <select className={styles.select} value={urgency} onChange={(e) => setUrgency(e.target.value)} required>
          {urgencyLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
        <textarea
          className={styles.textarea}
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.button} type="submit">Request Blood</button>
      </form>
    </div>
  );
};

export default BloodRequestForm;
