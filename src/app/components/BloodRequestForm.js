import { useState, useEffect } from 'react';
import styles from '../request/request.module.css';

const BloodRequestForm = ({ onRequestSuccess, editingRequest, onUpdate }) => {  
  const [requesterName, setRequesterName] = useState('');
  const [relation, setRelation] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');
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

  const germanCities = [
    'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 
    'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nuremberg', 'Mannheim',
  ];

  useEffect(() => {
    if (editingRequest) {
      setRequesterName(editingRequest.requesterName);
      setRelation(editingRequest.relation);
      setBloodType(editingRequest.bloodType);
      setLocation(editingRequest.location);
      setUrgency(editingRequest.urgency);
      setMessage(editingRequest.message);
    } else {
      setRequesterName('');
      setRelation('');
      setBloodType('');
      setLocation('');
      setUrgency('');
      setMessage('');
    }
  }, [editingRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { requesterName, relation, bloodType, location, urgency, message };

    if (editingRequest) {
      requestData._id = editingRequest._id; 
      await onUpdate(requestData); 
    } else {
      const response = await fetch('/api/blood-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      setNotification(data.message);

      if (data.success) {
        onRequestSuccess({ requesterName, bloodType, location, urgency });
        setTimeout(() => setNotification(''), 3000); 
      }
    }
    
    if (!editingRequest) {
      setRequesterName('');
      setRelation('');
      setBloodType('');
      setLocation('');
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

        {/* Relation Dropdown */}
        <select className={styles.select} value={relation} onChange={(e) => setRelation(e.target.value)} required>
          <option value="">Select Relation</option>
          <option value="Self">Self</option>
          <option value="Friend">Friend</option>
          <option value="Family">Family</option>
          <option value="Others">Others</option>
        </select>

        {/* Blood Type Dropdown */}
        <select className={styles.select} value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
          {bloodTypes.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        {/* Location Dropdown */}
        <select className={styles.select} value={location} onChange={(e) => setLocation(e.target.value)} required>
          <option value="">Select Location</option>
          {germanCities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        {/* Urgency Dropdown */}
        <select className={styles.select} value={urgency} onChange={(e) => setUrgency(e.target.value)} required>
          {urgencyLevels.map((level) => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>

        <textarea
          className={styles.textarea}
          placeholder="Additional Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button className={styles.button} type="submit">
          {editingRequest ? 'Update Request' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default BloodRequestForm;
