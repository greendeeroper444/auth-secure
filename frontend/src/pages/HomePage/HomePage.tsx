import React, { useState, useEffect } from 'react'
import styles from './HomePage.module.css';
import { useFetchUser } from '../../hooks/useFetchUser';
import { useLogout } from '../../services/authServices';
import HashForm from './HashForm';
import HashTable from './HashTable';


interface HashEntry {
  default: string;
  hash: string;
  salt: string;
  pepper: string;
}


function HomePage() {
  const { username, error } = useFetchUser();
  const { logout } = useLogout();

  //specify the type of tableData as an array of HashEntry
  const [tableData, setTableData] = useState<HashEntry[]>(() => {
    //load initial data from localStorage if available
    const storedData = localStorage.getItem('hashTableData');
    return storedData ? JSON.parse(storedData) : []; //return parsed data or an empty array
  });

  useEffect(() => {
    //update localStorage whenever tableData changes
    localStorage.setItem('hashTableData', JSON.stringify(tableData));
  }, [tableData]);

  const handleLogout = async () => {
    if (username) {
      await logout(username);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Hashing/Salting/Peppering Practice</h1>
      {
        username ? <p>Welcome, {username}!</p> : <p>Loading...</p>
      }
      <br />
      <button onClick={handleLogout}>Logout</button>
      <br />
      <br />
      <HashForm tableData={tableData} setTableData={setTableData} />
      <HashTable tableData={tableData} setTableData={setTableData} />
    </div>
  )
}

export default HomePage