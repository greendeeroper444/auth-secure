import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, type = 'button', onClick, className }) => {
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </button>
  )
}

export default Button
