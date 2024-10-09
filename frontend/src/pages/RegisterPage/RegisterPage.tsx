import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { usePasswordStrength } from '../../hooks/usePasswordStrength';
import { useRegister } from '../../services/authService';
import { Button, Input, Text } from '../../components';


function RegisterPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const passwordStrength = usePasswordStrength(password);
  const { register } = useRegister();

  //submit button event handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (passwordStrength !== 'Strong') {
      setErrorMessage('Password must be Strong to proceed.');
      return;
    }

    try {
      await register(username, password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const passwordStrengthClass = 
    passwordStrength === 'Strong' 
      ? styles.Strong 
      : passwordStrength === 'Medium' 
      ? styles.Medium 
      : styles.Weak;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Text className={styles.title}>Create An Account</Text>
        <Text className={styles.subtitle}>This system is for school activity.</Text>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label='Username'
            required
          />
          
          <Input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            required
          />

          {/* password validation */}
          <Text className={`${styles.passwordStrength} ${passwordStrengthClass}`}>
            {passwordStrength}
          </Text>

          <Input
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label='Confirm Password'
            required
          />

          {errorMessage && <Text className={styles.errorMessage}>{errorMessage}</Text>}

          <Button type='submit'>Sign up</Button>
        </form>
        <Text className={styles.footer}>
          Already have an account? <Link to='/' className={styles.link}>Login</Link>
        </Text>
      </div>
      
      <ToastContainer />
    </div>
  )
}

export default RegisterPage