import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState('');

  const handleConfirmPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/reset-password/${uidb64}/${token}/`, { new_password: newPassword });
      alert('Password reset successfully');
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div>
      <h1>Confirm Password Reset</h1>
      <form onSubmit={handleConfirmPassword}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Confirm Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;