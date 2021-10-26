import React, { useContext } from 'react'
import styled from 'styled-components';
import { authContext } from '../App';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'
// const Navbardiv = styled.div`
// width:100%;
// height:48px;
// display:flex;
// background:#f8f9fa; 
// align-items:center;
// justify-content:space-between;
// `
const Userimage= styled.img`
height:36px;
width:36px;
border-radius:50%;
box-shadow: 4px 2px 8px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 4px 2px 8px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 4px 2px 8px 0px rgba(0,0,0,0.75);
cursor:pointer;

`
const Username = styled.p`
color:#000;
font-weight:500;
margin-left:12px;

`


const Navbar = () => {
    const userinfo = useContext(authContext);
    console.log(userinfo);
    console.log(userinfo.loginStatus.user.photoURL);
    return (
        // <Navbardiv>
        //        <div className="userprofilediv d-flex p-2 h-100 bg-primary">
        //            <Userimage src={userinfo.loginStatus.user.photoURL} />
        //            <Username>{userinfo.loginStatus.user.displayName}</Username>

        //        </div>
             
                
        //         <div className="bg-success h-100">
        //        <ul className="h-100 d-flex align-items-center bg-warning px-5 justify-content-around">
        //             <Listitems className="active"><a href="#">Home</a></Listitems>
        //             <Listitems><a href="#">Home</a></Listitems>
        //         </ul>
        //         </div>
  

               

        // </Navbardiv>
<>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="d-flex">
  <Userimage src={userinfo.loginStatus.user.photoURL} />
  <Username>{userinfo.loginStatus.user.displayName}</Username>


  </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse " id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/dashboard">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item ">
        <NavLink className="nav-link" to="/facetime">FaceTime <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">About</a>
      </li>
     
      </ul>
    
  </div>
</nav>

</>

         

            
       
    )
}

export default Navbar
