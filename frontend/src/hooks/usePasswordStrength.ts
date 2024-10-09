import React,{ useState, useEffect } from 'react'

export const usePasswordStrength = (password: string) => {
  const [passwordStrength, setPasswordStrength] = useState('Weak');

  useEffect(() => {
    const checkPasswordStrength = (password: string) => {
      let strength = 'Weak';

      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isLongEnough = password.length >= 10;

      if (isLongEnough && hasLowerCase && hasUpperCase && hasNumber && hasSymbol) {
        strength = 'Strong';
      } else if (isLongEnough && (hasLowerCase || hasUpperCase) && hasNumber) {
        strength = 'Medium';
      }

      setPasswordStrength(strength);
    };

    checkPasswordStrength(password);
  }, [password]);

  return passwordStrength;
  
}