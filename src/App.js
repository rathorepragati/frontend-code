// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React Pragati
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;

// 
// import Header from './Header';
// import Footer from './Footer';
// import Nav_bar from './Nav_bar';

// import axios from 'axios';
// // import Contant from './Contant';
// import Main from './Components/Main';

// const App = () => {
//   const isActive = true;
//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [isResponse,setIsResponse] = useState(false);

//   const url = "http://localhost:8000/api/users";
//   const getData = async() => {
//     console.log("get data function called");
//     //return;

//   axios.get(url).then((res) => {
//     console.log("res backend ready",res.data);

//     if(res.data.status == 1){
//       console.log("successful status:" + res.data.messages);
//       setName(res.data.data[1].name);
//       setEmail(res.data.data[1].email);
//       setIsResponse(true);
//     }
//     else{
//       console.log("failure status:"+ res.data.messages);
//     }
//   })
//   .catch((err) => {
//     console.log("backend error: " + err);
//   });
// };
//   return (
//     <div>
//      <Main/>
//       {/* <Header/> */}
//       {/* <Nav_bar/>  */}
//       {/* <Contant/>
//       <Footer/> */}
//        {/* { isActive ?(
//        <div>
//        ecommerce app 
//       <p>welcome</p>
//       <button onClick={getData}>Get Data</button>
//       <h1>Online{isResponse?(<h2>name:-{name},email:-{email}</h2>):("")}</h1> */}
//         {/* </div> */}
//   {/* // ): ("pragati")}
//   // Ecommerce App 
//   // <p>Welcome</p> */}
 
//   </div>
//   );
// };

// export default App;

import React,{useState} from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Contant from './Components/Contant'
import axios from "axios";
import Main from "./Components/Main";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login"
import Nopage from './Components/Nopage';
import Dashboard from './Components/Dashboard';


export default function App () {
  return (
   <BrowserRouter>
     <Routes>
      <Route path="/" element={<Header/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="*" element={<Nopage/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>

   </BrowserRouter>
  );
};
