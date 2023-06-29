import React from 'react'
import "./Header.css";
import img from "./image/logo.png";
import {Link,Outlet} from "react-router-dom";


export default function Header() {
  return (
    <>
         <header>
    {/* <img src={img}  alt="" /> */}
    
       
      <ul>
        <img className='logo'src={img} alt=""/>
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact Us</a></li>
     <Link to = "login"> <button className='Lbut'>Login</button></Link>
      <Link to ="register"><button className='Rbut'>Register</button></Link>
      </ul>
    </header>
    {/* <Outlet/> */}
    </>
  );
};


// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// export default function Header() {
//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#features">Features</Nav.Link>
//             <Nav.Link href="#pricing">Pricing</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
// </>
//       )
//       }