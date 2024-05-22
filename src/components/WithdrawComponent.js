import React, { useState } from 'react';
import { withdrawAccount } from '../services/accountService'; // Adjust the path as necessary

const WithdrawComponent = ({ isOpen, onClose, accountNumber, onWithdraw }) => {
  const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    const withdrawalData = {
      accountNumber,
      amount: parseFloat(amount),
    };

    try {
        const response = await withdrawAccount(withdrawalData);
        console.log('Withdrawal successful', response.data);
        onWithdraw(response.data); // Update the parent component
        onClose(); // Close the modal
      } catch (error) {
        console.error('Error during withdrawal', error);
        if (error.message.includes("CORS")) {
          alert("CORS error: Cannot access the server.");
        } else if (error.response && error.response.status === 422) {
          alert("Insufficient funds for withdrawal.");
        } else {
          // Handle other errors
        }
      }      
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-white mb-4">Withdraw Money</h2>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-2 p-2 text-black border"
        />
        <div>
          <button
            onClick={handleWithdraw}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawComponent;
