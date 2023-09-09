import axios from "axios";
import {useState} from "react";
import { Link } from "react-router-dom";
import { loginStart, loginFailure, loginSuccess } from "../feature/slice";
import { useDispatch } from 'react-redux';
export default function Login() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch()
     const [password, setPassword] = useState('');
     // Create the submit method.
     const submit = async e => {
      e.preventDefault();
      dispatch(loginStart());
      try{

      
      const user = {
            username: username,
            password: password
           };
      // Create the POST requuest
      const {data} = await axios.post('http://localhost:8000/api/login/', user ,
        );
        console.log(user)
        localStorage.clear();
        localStorage.setItem("user",JSON.stringify(user["username"]))
        localStorage.setItem("username",JSON.stringify(user["username"]))
        localStorage.setItem("userpart",JSON.stringify(data["username"]))
        localStorage.setItem("useremail",JSON.stringify(data["email"]))
        localStorage.setItem("userid",JSON.stringify(data["id"]))
        
        dispatch(loginSuccess(data))
     // Initialize the access & refresh token in localstorage.      
     localStorage.setItem('access_token', data.access_token);
     localStorage.setItem('refresh_token', data.refresh_token);
          }
          catch(err){
            dispatch(loginFailure());
            console.log(err)
            
          }
     
    
     
 
     // Lưu refresh token vào localStorage
  
    //  axios.defaults.headers.common['Authorization'] = 
    //                                  `Bearer ${data['access']}`;
     window.location.href = '/'
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
        <Link to="/resetpassword">Quên mật khẩu</Link>
      </div>
    </form>
</div>
  )
}
