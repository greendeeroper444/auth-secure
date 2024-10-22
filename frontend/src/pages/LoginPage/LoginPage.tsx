import React, { useState } from 'react'
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { Button, Input, Text } from '../../components';
import backgrounAuthSecure from '../../assets/backgrounds/background-authsecure.png';
import { FaUser, FaLock } from 'react-icons/fa'; 
import { useLogin } from '../../services/authServices';

function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [error, setError] = useState<string | null>(null);

  const { login } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {

      //call the login function from the service
      await login(username, password);
    } catch (err) {
      // setError('Login failed. please check your credentials and try again.');
      console.error('Login error:', err);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.left}>
          <img src={backgrounAuthSecure} alt="Background Image" />
        </div>
        <div className={styles.right}>
          <Text className={styles.title}>Welcome back!</Text>
          <Text className={styles.subtitle}>This system is for school activity.</Text>
          <form onSubmit={handleSubmit} className={styles.form}>

            <Input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='username'
              label='Username'
              icon={<FaUser />}
              required
            />

            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='password'
              label='Password'
              icon={<FaLock />}
              required
            />

            <Button type='submit'>Sign up</Button>
          </form>

          <br />

          {/* {
            error && <p className={styles.errorMessage}>{error}</p>
          } */}

          <p className={styles.footer}>Don't have an account? <Link to='/register' className={styles.link}>Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage