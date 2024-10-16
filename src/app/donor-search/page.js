"use client";
import SearchComponent from './SearchComponent';
import { useState, useEffect } from 'react';
import styles from './search.module.css';
import BloodRequestCard from '../components/BloodRequestCard';

const DonorSearchPage = () => {
  const [results, setResults] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/users/profile');
        if (response.ok) {
          const userProfile = await response.json();
          setUserEmail(userProfile.email);
        }
      } catch (error) {
        console.error('Profile fetch error:', error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserProfile();
  }, []);

  const handleSearch = async (searchCriteria) => {
    setLoading(true); 
    try {
      const response = await fetch(`/api/blood-requests/search?${new URLSearchParams(searchCriteria)}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch error:', error.message);
      setResults([]);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={styles.searchPageContainer}>
      <SearchComponent onSearch={handleSearch} />
      <h2 className={styles.heading}>Search Results</h2>
      <div className={styles.resultsContainer}>
        {loading ? ( 
          <p>Loading...</p>
        ) : results.length > 0 ? (
          results.map((donor) => (
            <BloodRequestCard 
              key={donor._id} 
              request={donor} 
              userEmail={userEmail}  
            />
          ))
        ) : (
          <p>No blood requests found.</p>
        )}
      </div>
    </div>
  );
};

export default DonorSearchPage;
