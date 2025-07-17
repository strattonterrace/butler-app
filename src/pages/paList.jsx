import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function PAList() {
  const [personalAssistants, setPersonalAssistants] = useState([]);

  useEffect(() => {
    const fetchPAs = async () => {
      try {
        const { data, error } = await supabase
          .from('pa')
          .select('*')
          .eq('is_active', true); // optional

        if (error) throw error;
        console.log('Fetched PAs:', data);
        setPersonalAssistants(data);
      } catch (error) {
        console.error('Error fetching personal assistants:', error.message);
      }
    };

    fetchPAs();
  }, []);

  return (
    <div>
      <h1>Personal Assistants</h1>
      <ul>
        {personalAssistants.map((pa) => (
          <li key={pa.id}>
            {pa.first_name} {pa.last_name} — {pa.vehicle_make} {pa.vehicle_model}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PAList;

















// import React, { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient';

// function PAList() {
//   const [paList, setPAList] = useState([]);

//   useEffect(() => {
//     fetchPAs();
//   }, []);

//   const fetchPAs = async () => {
//   try {
//     const { data, error } = await supabase
//       .from('pa')
//       .select('*')
//       .eq('is_active', true); // optional filter if you want only active PAs

//     if (error) throw error;

//     console.log('Fetched PAs:', data); // ✅ this should now show your PA data
//     setPersonalAssistants(data);
//   } catch (error) {
//     console.error('Error fetching personal assistants:', error.message);
//   }
// };

  

//   return (
//     <div>
//       <h1>Personal Assistant List</h1>
//       {paList.length === 0 ? (
//         <p>No personal assistants found.</p>
//       ) : (
//         <ul>
//           {paList.map((pa) => (
//             <li key={pa.id}>
//               {pa.first_name} {pa.last_name} – {pa.vehicle_make} {pa.vehicle_model} ({pa.vehicle_year})
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default PAList;