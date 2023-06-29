import React, { useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import Dashboard from './Dashboard';
import "./Login.css"
import img4 from "./image/loginn.png"




export default function Login() {

  
   var navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("Name onchange: " + email);

  const handleSubmit = (e) => {
    e.preventDefault();
    // var x = document.getElementById("fname").value;
    // var y = document.getElementById("pass").value;
    // if (x == "" || y == "") {
    //   swal("Name and password must be filled out");
    //   return false;
    // }

    console.log("handleLogin Defined");
    console.log("Email,Password in handleSubmit:" + email,
      password,
    );


    var formData = new FormData();


    formData.append("email", email);
    formData.append("password", password);

    console.log("formData:" + formData);


    //backend api calling
    axios.post("http://localhost:8000/api/login", formData).then((response) => {
      console.log("backend response: " + response);
      // var stringData = JSON.stringify(response);
      // console.log("stringData: ", stringData);
      // var parseData = JSON.parse(stringData);
      // console.log("parseData: ", parseData);

      if (response.data.status == "1") {
        setTimeout(() => {
          swal(" ", response.data.message, "success");
           navigate("/Dashboard");
        }, 1000);
        console.log("response.data.email", response.data.email)
        localStorage.setItem("email",response.data.email)
        localStorage.setItem("token",response.data.token)
      }
      else {
        setTimeout(() => {
          swal("  ", response.data.message, "error");

        }, 1000);
      }
    })
    
      .catch((error) => {
        console.log("backend error: " + error)
      });
    
     };

   



  return (
    <div>
      <Header />
      <img src={img4} className='rpic' alt="" />

      <div className='main'>
      <form className='form' name='myForm' >
        <div className='Container'>
          <h1>Sign In</h1>
          <p>Sign in with your email and password</p>
        </div>
        
          <label><b> Email Id:</b></label>
          <input type="email"  id='fname'  placeholder="Enter your email id" className='inp' required value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />

          <label><b> Password: </b></label>
          <input type="password"  name="pass" id="pass" placeholder="Enter your password" className='inp' required value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />

        
        {email.length > 0 && password.length > 0 ?( <button className='but' onClick={handleSubmit}  >Login</button>
         ):( <button className='but' onClick={handleSubmit} style={{cursor:"not-allowed"}} disabled>Login</button>
         )}

        
         
        
      </form>
      <p className='register'>Not a member?<a href='./Register'>Register here!</a></p>
      </div>

    </div>
  )
}
