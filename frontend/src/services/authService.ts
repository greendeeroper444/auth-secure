import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';

export const useRegister = () => {
  const navigate = useNavigate();

  const register = async (username: string, password: string) => {
    try {
      const data = await registerUser(username, password);
      
      toast.success(`Welcome ${username}!! You successfully registered.`, {
        position: 'top-right',
      });

      setTimeout(() => {
        navigate('/');
      }, 3000);

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { register };
  
}