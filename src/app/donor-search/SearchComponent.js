import { useState } from 'react';
import styles from './search.module.css'; 

const SearchComponent = ({ onSearch }) => {
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('');

  const handleSearch = () => {
    onSearch({ bloodType, location, urgency });
  };

  return (
    <div className={styles.searchPageContainer}>
      <h2>Search for Donors</h2>

      {/* Blood Type Dropdown */}
      <label className={styles.label}>Blood Type:</label>
      <select 
        className={styles.input} 
        value={bloodType} 
        onChange={(e) => setBloodType(e.target.value)}
      >
        <option value="">Select Blood Type</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>

      {/* Location Input */}
      <label className={styles.label}>Location:</label>
      <input
        className={styles.input}
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* Urgency Dropdown */}
      <label className={styles.label}>Urgency:</label>
      <select 
        className={styles.input} 
        value={urgency} 
        onChange={(e) => setUrgency(e.target.value)}
      >
        <option value="">Select Urgency</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button className={`${styles.button} primary`} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
