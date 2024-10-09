export const registerUser = async (username: string, password: string) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error registering user');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Error registering user');
  }
}