import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import img3 from "./image/regis.png"
import "./Register.css";
import Header from './Header';
import axios from 'axios'
import swal from "sweetalert";




export default function Register() {
  var navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  console.log("Name onchange: " + name);

  const handleSubmit = (e) => {
    e.preventDefault();
    // var x = document.getElementById("rname").value;
    // var y = document.getElementById("remail").value;
    // var a = document.getElementById("rpass").value;
    // var b = document.getElementById("rmob").value;
    // if (x == ""|| y == "" || a == "" || b == "") {
    //   swal("All field must be filled out");
    //   return false;
    // }

    console.log("handleRegister Defined");
    console.log("Name,Email,Mobile,Password in handleSubmit:" + name,
      email,
      password,
      mobile
    );


    var formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("mobile", mobile);
    console.log("formData:" + formData);


    //backend api calling
    axios.post("http://localhost:8000/api/register", formData).then((response) => {
      console.log("backend response: " + response);
      // var stringData = JSON.stringify(response);
      // console.log("stringData: ", stringData);
      // var parseData = JSON.parse(stringData);
      // console.log("parseData: ", parseData);

      if (response.data.status == "1") {
        setTimeout(() => {
          swal(" ", "You are successfully registerd!", "success");
          navigate("/login");
        }, 1000);
      }
      else {
        setTimeout(() => {
          swal("  ", "please enter data in the field!", "error");
        }, 1000);
      }
    })
      .catch((error) => {
        console.log("backend error: " + error)
      });

  };



  return (
    <>
      <Header />

      <img src={img3} className='lpic' alt="" />

      <div className='mainBody'>
        <form className='formItem' >
          <div className='abcd'>

            <h1>Register</h1>
            <p>Kindly fill in this form to register.</p>
            <h3>* Mandatory Fields</h3>
            <label><b> Name:*</b></label>
            <input type="text" placeholder='Enter your name' id='rname' className='mb-3' required value={name} onChange={(e) => setName(e.target.value)} /><br />

            <label><b> Email:*</b></label>
            <input type="email" name="" id="remail" placeholder='Enter your Email' className='mb-3' required value={email} onChange={(e) => setEmail(e.target.value)} /><br />

            <label><b> Password:*</b> </label>
            <input type="password" name="" id="rpass" placeholder='Enter your password' className='mb-3' required value={password} onChange={(e) => setPassword(e.target.value)} /><br />

            <label><b>Mobile:*</b></label> <input type="number" id='rmob' placeholder='Enter your mobile no' className='mb-3' required value={mobile} onChange={(e) => setMobile(e.target.value)} /><br />

            {name.length > 0 && email.length > 0 && password.length > 0 && mobile.length > 0 ? (<button className='button' style={{ cursor: "pointer" }} onClick={handleSubmit}>Register</button>) : (<button className='button' style={{ cursor: "not-allowed" }} disabled onClick={handleSubmit}>Register</button>)}
          
            <div>
              <p>Already have an account? <a href="./login">Log in</a>.</p>
            </div>

          </div>
        </form>
      </div>
    </>
  );
};
