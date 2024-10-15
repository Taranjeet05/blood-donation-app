"use client";
import SearchComponent from './SearchComponent';
import { useState } from 'react';
import styles from './search.module.css';

const DonorSearchPage = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (searchCriteria) => {
    try {
      const response = await fetch(`/api/blood-requests/search?${new URLSearchParams(searchCriteria)}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      setResults([]);
    }
  };

  return (
    <div className={styles.searchPageContainer}>
      <SearchComponent onSearch={handleSearch} />
      <h2 className={styles.heading}>Search Results</h2>
      <div className={styles.resultsContainer}>
        {results.length > 0 ? (
          results.map((donor) => (
            <div key={donor._id} className={styles.donorCard}>
              <h3>{donor.requesterName}</h3>
              <p>Blood Type: {donor.bloodType}</p>
              <p>Location: {donor.location}</p>
              <p>Urgency: {donor.urgency}</p>
            </div>
          ))
        ) : (
          <p>No blood requests found.</p>
        )}
      </div>
    </div>
  );
};

export default DonorSearchPage;
