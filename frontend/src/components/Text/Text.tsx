import React from 'react';
import styles from './Text.module.css';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, className }) => {
  return <p className={`${styles.text} ${className}`}>{children}</p>;
};

export default Text
