import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function PAList() {
  const [paList, setPAList] = useState([]);

  useEffect(() => {
    fetchPAs();
  }, []);

  const fetchPAs = async () => {
    const { data, error } = await supabase
      .from('pa')  
      .select('*');

    if (error) {
      console.error('Error fetching personal assistants:', error.message);
      console.error("Error fetching role:", error);
      console.log("Raw Supabase data response:", data);
    } else {
      console.log('Fetched PAs:', data);
      // If you want to log user email, make sure 'user' is defined, otherwise remove this line
      // console.log("Fetching role for:", user.email);
      setPAList(data);
    }
  };

  

  return (
    <div>
      <h1>Personal Assistant List</h1>
      {paList.length === 0 ? (
        <p>No personal assistants found.</p>
      ) : (
        <ul>
          {paList.map((pa) => (
            <li key={pa.id}>
              {pa.first_name} {pa.last_name} – {pa.vehicle_make} {pa.vehicle_model} ({pa.vehicle_year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PAList;