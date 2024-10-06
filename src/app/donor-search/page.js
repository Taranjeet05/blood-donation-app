"use client";
import SearchComponent from './SearchComponent';
import { useState } from 'react';
import styles from './search.module.css';
const DonorSearchPage = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (searchCriteria) => {
    const response = await fetch(`/api/donors/search?${new URLSearchParams(searchCriteria)}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className={styles.searchPageContainer}>
      <SearchComponent onSearch={handleSearch} />
      <h2 className={styles.heading}>Search Results</h2> 
      <div className={styles.resultsContainer}>
        {results.map((donor) => (
          <div key={donor._id} className={styles.donorCard}>
            <h3>{donor.name}</h3>
            <p>Blood Type: {donor.bloodType}</p>
            <p>Location: {donor.location}</p>
            <p>Urgency: {donor.urgency}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorSearchPage;
