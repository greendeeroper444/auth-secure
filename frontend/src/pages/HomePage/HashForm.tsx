import React, { useState } from 'react'
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import styles from './HomePage.module.css';

interface HashFormProps {
  tableData: Array<{ default: string; hash: string; salt: string; pepper: string; combined: string }>;
  setTableData: React.Dispatch<React.SetStateAction<Array<{ 
    default: string; 
    hash: string; 
    salt: string; 
    pepper: string;
    combined: string; 
  }>>>;
}

function HashForm({ tableData, setTableData }: HashFormProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [hashingMethod, setHashingMethod] = useState('none'); //default to no hashing
  const [inputSaltValue, setInputSaltValue] = useState<string>('');
  const [inputPepperValue, setInputPepperValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hashedValue = '';
    let combinedHash = '';
    let appliedSalt = false;
    let appliedPepper = false;

    //determine the hashing method and calculate the hashed value if applicable
    if (hashingMethod === 'hashOnly') {
      hashedValue = bcrypt.hashSync(inputValue, 10); //hashing the input only
      combinedHash = hashedValue; //for combined hash, use just the hashed value
    } else if (hashingMethod === 'hashWithSalt') {
      if (inputSaltValue) {
        hashedValue = bcrypt.hashSync(inputValue + inputSaltValue, 10);// hashing with salt
        combinedHash = bcrypt.hashSync(inputValue + inputSaltValue, 10); //calculate combined hash
        appliedSalt = true; //salt was applied
      } else {
        toast.error('Please provide a salt value for hashing with salt.');
        return; //exit if no salt is provided
      }
    } else if (hashingMethod === 'hashWithSaltAndPepper') {
      if (inputSaltValue && inputPepperValue) {
        hashedValue = bcrypt.hashSync(inputValue + inputSaltValue + inputPepperValue, 10); //hashing with salt and pepper
        combinedHash = bcrypt.hashSync(inputValue + inputSaltValue + inputPepperValue, 10); //calculate combined hash
        appliedSalt = true; //salt was applied
        appliedPepper = true; //pepper was applied
      } else {
        toast.error('Please provide both salt and pepper values for hashing with salt and pepper.');
        return; 
      }
    } else {
      hashedValue = inputValue;
      combinedHash = inputValue; //for combined hash, use the plain input value
    }

    //create a new entry to store
    const newEntry = {
      default: inputValue,
      hash: hashedValue,
      salt: appliedSalt ? inputSaltValue : '',
      pepper: appliedPepper ? inputPepperValue : '',
      combined: combinedHash,
    };

    //update the table data and local storage
    const updatedData = [...tableData, newEntry];
    setTableData(updatedData);
    localStorage.setItem('hashTableData', JSON.stringify(updatedData));

    toast.success('Data submitted successfully!', {
      position: 'top-right',
    });

    //clear the input fields
    setInputValue('');
    setInputSaltValue(''); //clear salt input
    setInputPepperValue(''); //clear pepper input
    setHashingMethod('none'); //reset to default
  };

  return (
    <form className={styles.inputGroup} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='Enter value'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      <select
        id='hashing-method'
        value={hashingMethod}
        onChange={(e) => setHashingMethod(e.target.value)}
        aria-label='Select hashing method'
      >
        <option value='none'>Select Hashing Method</option>
        <option value='hashOnly'>Hash Only</option>
        <option value='hashWithSalt'>Hash with Salt</option>
        <option value='hashWithSaltAndPepper'>Hash with Salt and Pepper</option>
      </select>
      {
        hashingMethod !== 'none' && (
          <>
            {
              (hashingMethod === 'hashWithSalt' || hashingMethod === 'hashWithSaltAndPepper') && (
                <input
                  type="text"
                  placeholder='Enter Salt'
                  value={inputSaltValue}
                  onChange={(e) => setInputSaltValue(e.target.value)}
                />
              )
            }
            {
              hashingMethod === 'hashWithSaltAndPepper' && (
                <input
                  type="text"
                  placeholder='Enter Pepper'
                  value={inputPepperValue}
                  onChange={(e) => setInputPepperValue(e.target.value)}
                />
              )
            }
          </>
        )
      }
      <button type="submit">Submit</button>
    </form>
  )
}

export default HashForm
