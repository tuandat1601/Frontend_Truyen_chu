import React, { useState } from 'react';
import axios from 'axios';

export default function SentEmail() {
	const [email, setEmail] = useState('');

	const handleResetPassword = async (e) => {
	  e.preventDefault();
      
	  try {
	    const response = await axios.post(`api/reset-password/`, { email });
	    console.log(response.data);
	    alert('Email sent successfully');
	    // Xử lý thành công: hiển thị thông báo gửi email thành công
	  } catch (error) {
	    console.error(error);
	    alert('An error occurred');
	    // Xử lý lỗi: hiển thị thông báo lỗi
	  }
	};
  return (
    <div>
<h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Sent email</button>
      </form>

    </div>
  )
}
