// import React, { ChangeEvent } from 'react'
// import styles from './Input.module.css';

// interface InputProps {
//   id: string;
//   type: string;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   label: string;
//   required: boolean;
//   strengthClass?: string;
//   strength?: string;
// }

// const Input: React.FC<InputProps> = ({
//   id,
//   type,
//   value,
//   onChange,
//   label,
//   required,
//   strengthClass,
//   strength,
// }) => {
//   return (
//     <div className={styles.inputGroup}>
//       <label htmlFor={id}>{label}</label>
//       <input
//         id={id}
//         type={type}
//         value={value}
//         onChange={onChange}
//         required={required}
//         className={styles.input}
//       />
      
//       {/* conditionally render password strength message */}
//       {
//         strength && (
//           <div className={`${styles.passwordStrength} ${strengthClass}`}>
//             {strength}
//           </div>
//         )
//       }
//     </div>
//   )
// }

// export default Input

import React, { ChangeEvent } from 'react'
import styles from './Input.module.css';

interface InputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  required: boolean;
  strengthClass?: string;
  strength?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  label,
  required,
  strengthClass,
  strength,
  icon,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>{label}</label>
      
      {/* container to wrap input and icon together */}
      <div className={styles.inputWithIcon}>
        {
          icon && <span className={styles.icon}>{icon}</span>
        }

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={styles.input}
        />
      </div>

      {/* conditionally render password strength message */}
      {
        strength && (
          <div className={`${styles.passwordStrength} ${strengthClass}`}>
            {strength}
          </div>
        )
      }
    </div>
  )
}

export default Input
