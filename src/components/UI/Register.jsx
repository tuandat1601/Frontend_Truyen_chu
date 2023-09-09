import axios from "axios";
import {useState} from "react";

export default function Register() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// Create the submit method.
	const submit = async e => {
	 e.preventDefault();
	 console.log(username)
	 console.log(email)
	 console.log(password)
	 const user = {
	       username: username,
	       email:email,
	       password: password
	      };
	 // Create the POST requuest
	await axios.post('api/register/', user ).then((response) => {
		const { id, username, email } = response.data;
		// Xử lý thành công
		
		localStorage.clear();
		localStorage.setItem("user",JSON.stringify(username))
		localStorage.setItem("userpart",JSON.stringify(username))
		localStorage.setItem("useremail",JSON.stringify(email))
		localStorage.setItem("userid",JSON.stringify(id))
		

	      })
	      .catch((error) => {
		console.error(error);
		// Xử lý lỗi
	      });
	
	// Initialize the access & refresh token in localstorage.      
       //  axios.defaults.headers.common['Authorization'] = 
       //                                  `Bearer ${data['access']}`;
	window.location.href = '/login'
   }
  return (
	<div className="Auth-form-container">
	<form className="Auth-form" onSubmit={submit}>
	  <div className="Auth-form-content">
	    <h3 className="Auth-form-title">Sign In</h3>
	    <div className="form-group mt-3">
	      <label>Username</label>
	      <input
		className="form-control mt-1"
		placeholder="Enter Username"
		name='username'
		type='text'
		value={username}
		required
		onChange={e => setUsername(e.target.value)}
	      />
	    </div>
	    <div className="form-group mt-3">
	      <label>Your email</label>
	      <input
		className="form-control mt-1"
		placeholder="Enter Your email"
		name='username'
		type='text'
		value={email}
		required
		onChange={e => setEmail(e.target.value)}
	      />
	    </div>
	    <div className="form-group mt-3">
	      <label>Password</label>
	      <input
		name='password'
		type="password"
		className="form-control mt-1"
		placeholder="Enter password"
		value={password}
		required
		onChange={e => setPassword(e.target.value)}
	      />
	    </div>
	    <div className="d-grid gap-2 mt-3">
	      <button type="submit" className="btn btn-primary">
		Submit
	      </button>
	    </div>
	  </div>
	</form>
    </div>
  )
}
