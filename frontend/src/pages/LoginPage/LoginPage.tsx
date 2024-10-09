import React, { useState } from 'react'
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { Button, Input, Text } from '../../components';

function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };


  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Text className={styles.title}>Welcome back!</Text>
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

          <Button type='submit'>Sign up</Button>
        </form>
        <p className={styles.footer}>Don't have an account? <Link to='/register' className={styles.link}>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default LoginPage

// This application is for practicing a secure system using hash, salt, and pepper.