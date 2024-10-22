import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';
import { usePasswordStrength } from '../../hooks/usePasswordStrength';
import { useRegister } from '../../services/authServices';
import { Button, Input, Text } from '../../components';
import backgrounAuthSecure from '../../assets/backgrounds/background-authsecure.png';
import { FaUser, FaLock } from 'react-icons/fa'; 
import { toast } from 'react-toastify';


function RegisterPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { passwordStrength, passwordCriteria } = usePasswordStrength(password);
  const { level } = passwordStrength;
  const { register } = useRegister();



  const showPasswordErrorToast = () => {
    const criteriaMessages = [];
    if (!passwordCriteria.hasLowerCase) criteriaMessages.push('at least one lowercase letter');
    if (!passwordCriteria.hasUpperCase) criteriaMessages.push('at least one uppercase letter');
    if (!passwordCriteria.hasNumber) criteriaMessages.push('at least one number');
    if (!passwordCriteria.hasSymbol) criteriaMessages.push('at least one symbol');
    if (!passwordCriteria.isLongEnough) criteriaMessages.push('at least 10 characters');

    const message = `Password must contain: ${criteriaMessages.join(', ')}.`;
    toast.error(message, { position: 'top-right' });
  };
  //submit button event handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   setErrorMessage('Passwords do not match');
    //   return;
    // }

    // if (level !== 'Strong') {
    //   setErrorMessage('Password must be Strong to proceed.');
    //   return;
    // }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-right',
      });
      return;
    }

    if (level !== 'Strong') {
      showPasswordErrorToast();
      return;
    }

    try {
      await register(username, password);
      setErrorMessage('');
    } catch (error: any) {
      toast.error(error.message, {
        position: 'top-right',
      });
    }
  };

  const passwordStrengthClass = 
    level === 'Strong' 
      ? styles.Strong 
      : level === 'Medium' 
      ? styles.Medium 
      : styles.Weak;

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* left box */}
        <div className={styles.left}>
          <img src={backgrounAuthSecure} alt="Background Image" />
        </div>
        
        {/* right box */}
        <div className={styles.right}>
          
          <Text className={styles.title}>Create An Account</Text>
          <Text className={styles.subtitle}>This system is for school activity.</Text>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              id='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
              label='Username'
              icon={<FaUser />}
              required
            />
            
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              label='Password'
              icon={<FaLock />}
              required
            />

            {/* password validation */}
            {
              password.length > 0 && (
                <>
                  <div className={styles.passwordStrengthBarContainer}>
                    <div
                      className={`${styles.passwordStrengthBar} ${styles[level]}`}
                      style={{ width: `${passwordStrength.percentage}%` }}
                    ></div>
                  </div>
                  <Text className={`${styles.passwordStrength} ${passwordStrengthClass}`}>
                    {level}
                  </Text>
                </>
              )
            }

            <Input
              id='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm your password'
              label='Confirm Password'
              icon={<FaLock />}
              required
            />

            {
              errorMessage && <Text className={styles.errorMessage}>{errorMessage}</Text>
            }

            <br />
            
            <Button type='submit'>Sign up</Button>
          </form>

          <Text className={styles.footer}>
            Already have an account? <Link to='/' className={styles.link}>Login</Link>
          </Text>

        </div>
      </div>
    </div>
  )
}

export default RegisterPage