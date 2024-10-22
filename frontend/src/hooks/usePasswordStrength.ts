import React, { useState, useEffect } from 'react';

export const usePasswordStrength = (password: string) => {
  const [passwordStrength, setPasswordStrength] = useState({
    level: 'Weak',
    percentage: 30, //default percentage for 'Weak'
  });
  
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSymbol: false,
    isLongEnough: false,
  });

  useEffect(() => {
    const checkPasswordStrength = (password: string) => {
      if (password.length === 0) {
        setPasswordStrength({ level: '', percentage: 0 }); //set empty string if no input
        setPasswordCriteria({
          hasLowerCase: false,
          hasUpperCase: false,
          hasNumber: false,
          hasSymbol: false,
          isLongEnough: false,
        });
        return;
      }

      let strength = 'Weak';
      let percentage = 30;

      const hasLowerCase = /[a-z]/.test(password);
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isLongEnough = password.length >= 10;

      //criteria state
      setPasswordCriteria({ hasLowerCase, hasUpperCase, hasNumber, hasSymbol, isLongEnough });

      if (isLongEnough && hasLowerCase && hasUpperCase && hasNumber && hasSymbol) {
        strength = 'Strong';
        percentage = 100;
      } else if (isLongEnough && (hasLowerCase || hasUpperCase) && hasNumber) {
        strength = 'Medium';
        percentage = 60;
      }

      setPasswordStrength({ level: strength, percentage });
    };

    checkPasswordStrength(password);
  }, [password]);

  return { passwordStrength, passwordCriteria };
};
