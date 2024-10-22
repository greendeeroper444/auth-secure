import React from 'react'
import { toast } from 'react-toastify';
import styles from './HomePage.module.css';

interface HashTableProps {
  tableData: Array<{ default: string; hash: string; salt: string; pepper: string; combined: string }>;
  setTableData: React.Dispatch<React.SetStateAction<Array<{ default: string; hash: string; salt: string; pepper: string; combined: string }>>>;
}

function HashTable({ tableData, setTableData }: HashTableProps) {
  const handleDelete = (index: number) => {
    const updatedData = tableData.filter((_, i) => i !== index); //remove the entry at the specified index
    setTableData(updatedData);
    localStorage.setItem('hashTableData', JSON.stringify(updatedData)); //update local storage

    toast.success('Data deleted successfully!', {
      position: 'top-right',
    });
  };

	const handleTryItClick = () => {
    toast.info('Not available right now.', {
      position: 'top-right',
    });
  };
	
  return (
    <>
      {
        tableData.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Default</th>
                <th>Hash Only</th>
                <th>Salt</th>
                <th>Pepper</th>
                <th>Hashed (Combining hash, salt, pepper)</th>
                <th>Testing</th>
								<th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.default}</td>
                    <td className={styles.scrollableCell}>{data.hash}</td>
                    <td>{data.salt}</td>
                    <td>{data.pepper}</td>
                    <td className={styles.scrollableCell}>{data.combined}</td>
                    <td><button onClick={handleTryItClick}>Try it</button></td>
										<td><button onClick={() => handleDelete(index)}>Delete</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </>
  )
}

export default HashTable
