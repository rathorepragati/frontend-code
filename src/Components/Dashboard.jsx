import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Dashboard() {
  var navigate = useNavigate();
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState([]);
  const [specificUserData, setSpecificUserData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [email1, setEmail1] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [newSpecificUserData, setNewSpecificUserData] = useState([]);


  const handleClose = () => setUpdate(false);
  const handleShow = () => setUpdate(true);


   if(email==null||email==undefined||email=="undefined"||email==""){
    navigate("/Login");
    }
  const userLogout = async () => {
    console.log("User called logout")
    var isUser = localStorage.removeItem("email");
    const email = localStorage.getItem("email");
    if (email == null || email == undefined || email == "undefined" || email == "") {

      navigate("/login");
    }
    console.log("isUser", isUser);
  }

  //Users Data
  const getUserData = async () => {
    // var formData = new FormData();
    // formData.append("token",token);

    axios.get("http://localhost:8000/api/users" , {headers:{Authorization:token}}).
      then((response) => {
        console.log("Backend response", response);
       

        if (response.data.status == "1") {
          swal(" ", "User data fetched successfully", "success")
          setUserData(response.data.data);
        }
        else {
          swal("  ", "Users data not fetched ", "error")
        }
      }).catch((error) => {
        console.log("Backend error:" + error);
      });
  }

  //Specific User Data
  const getSpecificUserData = async (email) => {
    axios.get(`http://localhost:8000/api/users/${email}`).then((response) => {
      console.log("backend response:", response);
      setSpecificUserData(response.data.data)
      console.log("response.data.data:", response.data.data);

      if (response.data.status == "1") {
        swal(" ", "User data fetched successfully", "success")
      }
      else {
        swal("  ", "User not fetched", "error")
      }
    }).catch((error) => {
      console.log("backend error: " + error)
    });

  }


  //userDelete
  const userDelete = async (email) => {
    console.log("delete", email);
    const isDelete = window.confirm("Are you sure you want to delete?")
    if (isDelete) {
      axios.post(`http://Localhost:8000/api/delete/${email}`,{token},{headers:{Authorization:token}}).then((response) => {
        console.log("Backend response", response);

        if (response.data.status == "1") {
          setTimeout(() => {
            getUserData();
            swal(" ", "User Deleted Successfully!", "success");
          }, 2000)
        }
        else {
          swal(" ", "User not deleted!", "error");
        }

      }).catch((error) => {
        console.log("Backend error:" + error);
      });
    }
  }

  //userUpdate
  const userUpdate = async (email) => {
    console.log("update", email);
    axios.get(`http://localhost:8000/api/users/${email}`).then((response) => {
      console.log("backend response:", response);
      setNewSpecificUserData(response.data)
      console.log("response.data.data:", response.data.data);

      setName(response.data.data.name);
      console.log("response.data.data.name:",response.data.data.name);

      setEmail1(response.data.data.email);
      console.log("response.data.data.email:",response.data.data.email);
      
      setMobile(response.data.data.m_no);
      console.log("response.data.data.m_no:",response.data.data.m_no);

      //   if(response.data.status == "1") {
      //     swal(" ", "User data fetched successfully", "success")
      // }
      // else{
      //   swal("  ", "User not fetched", "error")
      // }

    }).catch((error) => {
      console.log("backend error: " + error)
    });
    console.log("condition true")
    setUpdate(true);
  }

//save user data or update user
const saveUserChanges = async (e) => {
  e.preventDefault();
  console.log("getting data at the time of update or save changes",name,image,email1,mobile);

var formData = new FormData();

formData.append("name",name)
formData.append("email1",email1)
formData.append("m_no",mobile)
formData.append("image",image)

  axios.post(`http://localhost:8000/api/update/${email}`,formData,{headers:{Authorization:token}}).then((response) => {
    console.log("backend response:", response);
    setNewSpecificUserData(response.data.data)
    console.log("response.data.data:", response.data.data);

    setName(response.data.data.name);
    console.log("response.data.data.name:",response.data.data.name);

    setEmail1(response.data.data.newEmail);
    console.log("response.data.data.email:",response.data.data.newEmail);
    
    setMobile(response.data.data.m_no);
    console.log("response.data.data.m_no:",response.data.data.m_no);

    // setPassword(response.data.data.m_no);

      if(response.data.status == "1") {
        swal(" ", "User updated successfully", "success")
    }
    else{
      swal("  ", "User not updated", "error")
    }

  }).catch((error) => {
    console.log("backend error: " + error)
  });
}

  useEffect(() => {
    getUserData(email)
    getSpecificUserData(email);
    console.log("getSpecificUserData", getSpecificUserData);
  }, [email]);


  return (
    <div>
      <h1> Hello user {email}</h1>
      <div> {specificUserData.name}
        <img src={`../images/${specificUserData.image}`} alt="" style={{ height: "100px", width: "100px",borderRadius:"50px"}} /></div>
      <button onClick={userLogout}>Log out</button>

      <table>
        <tr>
          <th>Sr no.</th>
          <th>Name</th>
          <th>Email</th>
          <th colSpan={2} align="center">Action</th>
        </tr>

        {userData.map((data, i) => {
          return (

            <tr key={i}>
              <td>{i + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td><button onClick={() => userUpdate(data.email)} className="up">Update</button></td>
              <td><button onClick={() => userDelete(data.email)} className="del">Delete</button></td>
            </tr>
          );
        })}
      </table>
      <Modal show={update} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mainBody'>
            <form className='formItem' >
              <div className='abcd'>


                 {/* <h1>Update Details</h1> */}
                {/* <p>Kindly fill in this form to register.</p>
                <h3>* Mandatory Fields</h3> */}
                <label><b> Name:*</b></label>
                <input type="text" placeholder='Enter your name' id='rname' name='name' className='input' required value={name} onChange={(e) => setName(e.target.value)} /><br />

                <label><b> Email:*</b></label>
                <input type="email" name="" id="remail" placeholder='Enter your Email' className='input' required value={email1} onChange={(e) => setEmail1(e.target.value)} /><br />

                {/* <label><b> Password:*</b> </label>
                <input type="password" name="" id="rpass" placeholder='Enter your password' className='input' required value={password} onChange={(e) => setPassword(e.target.value)} /><br /> */}

                <label><b>Mobile:*</b></label> <input type="number" id='rmob' placeholder='Enter your mobile no' className='input' required value={mobile} onChange={(e) => setMobile(e.target.value)} /><br />

                <label><b> Profile Image:*</b> </label>
                <input type="file" name="image" className='input' required  onChange={(e) => setImage(e.target.files[0])} /><br />


                <button className='button' onClick={saveUserChanges} style={{ cursor: "pointer" }} >Save Changes</button>



              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>



    </div>
  )
}

