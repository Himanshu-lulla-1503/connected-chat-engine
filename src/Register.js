import React,{useState} from 'react';
import App from'./App';
import { Redirect,Link,useHistory } from 'react-router-dom';
import icon3 from './img/icon3 update.png';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const Register=(props)=>{
    return(
        
         <>
<section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src={icon3} className="img-fluid"
          alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="d-flex  align-items-center justify-content-center justify-content-lg-around ">
            <h1 className="fw-bold mb-4 me-3">Join Us</h1>
          </div>

         
        
          <div className="form-outline mb-4">
          <label className="form-label" for="form3Example3">Email address</label>
            <input type="email" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" autoComplete='on' />
           
          </div>

        
          <div className="form-outline mb-3">
          <label className="form-label" for="form3Example4">Password</label>
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" />
            
          </div>
          <div className="form-outline mb-3">
          <label className="form-label" for="form3Example4">Confirm Password</label>
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Confirm password" />
            
          </div>


          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg mb-1"
              >Register</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="/"
                className="link-danger">SignIn</Link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
       </>
        
      
    )
}
export default Register;
