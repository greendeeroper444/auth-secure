import { useEffect, useState } from 'react'
import axios from 'axios';

interface UserResponse {
  username: string;
}

export const useFetchUser = () => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<UserResponse>('http://localhost:5000/api/users/getuser', { 
          withCredentials: true 
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch user');
      }
    };

    fetchUser();
  }, []);

  return { username, error };
};
