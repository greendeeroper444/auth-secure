import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, registerUser } from '../utils/api';


//register service
export const useRegister = () => {
  const navigate = useNavigate();

  const register = async (username: string, password: string) => {
    try {
      const data = await registerUser(username, password);

      navigate('/');
      
      toast.success(`Welcome ${username}👋 !! You successfully registered.`, {
        position: 'top-right',
        // style: {
        //   backgroundColor: '#147452',
        //   color: '#fff'
        // }
      });

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { register };
  
};

//login service
export const useLogin = () => {
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const data = await loginUser(username, password);
    
      navigate('/home');
      toast.success(`Hello ${username}👋 !! Welcome back.`, {
        position: 'top-right',
      });
    
      return data;
    } catch (error: unknown) {
      //ensure error is narrowed down to the type `Error`
      if (error instanceof Error) {
        //display the error message from the backend or axios
        toast.error(error.message, {
          position: 'top-right',
        });
      } else {
        //fallback for unexpected errors
        toast.error('An unexpected error occurred. Please try again later.', {
          position: 'top-right',
        });
      }
    
      throw error;
    }
    
  };

  return { login };
};


//logout service
export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async (username: string) => {
    try {
      await logoutUser();

      navigate('/');

      toast.success(`Good bye ${username} 🥺!! See you soon.`, {
        position: 'top-right',
      });

    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out.', {
        position: 'top-right',
      });
    }
  };

  return { logout };
};