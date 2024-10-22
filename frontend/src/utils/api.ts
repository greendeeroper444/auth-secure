import axios from "axios";

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/register', {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error registering user');
  }
}


export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, 
    });

    return response.data;
  } catch (error: unknown) {
    //check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      //if the error response exists, throw a specific error with the server's message
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || 'Error logging in');
      }
      //otherwise, throw a generic AxiosError message
      throw new Error(error.message || 'Error logging in');
    }

    //for non-Axios errors, throw a generic message
    throw new Error('An unexpected error occurred during login');
  }
}

export const logoutUser = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/users/logout', {}, { 
      withCredentials: true 
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error logging out');
  }
};