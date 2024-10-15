import { useState } from 'react';
import styles from './search.module.css';

const SearchComponent = ({ onSearch }) => {
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('');

  const germanCities = [
    'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen',
    'Leipzig', 'Bremen', 'Dresden', 'Hannover', 'Nuremberg', 'Mannheim',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ bloodType, location, urgency });
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      {/* Blood Type Dropdown */}
      <select className={styles.select} value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
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

      {/* Location Dropdown */}
      <select className={styles.select} value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Select Location</option>
        {germanCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Urgency Dropdown */}
      <select className={styles.select} value={urgency} onChange={(e) => setUrgency(e.target.value)}>
        <option value="">Select Urgency</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button className={styles.button} type="submit">Search</button>
    </form>
  );
};

export default SearchComponent;
