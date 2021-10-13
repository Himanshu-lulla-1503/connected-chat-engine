import React,{useState,useContext} from 'react';
import Dashboard from './Dashboard/Dashboard';
import { authContext } from './App';
import {auth,googleProvider,twitterProvider,yahooProvider} from './fireauth';
import App from'./App';
import { Redirect,Link,useHistory } from 'react-router-dom';
import icon3 from './img/icon3 update.png';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Auth=(props)=>{
    const history=useHistory();
    const authValue=useContext(authContext);
    console.log(authValue);
    const signIn=async(provider)=>{
        try{
            const res=await auth.signInWithPopup(provider);
            authValue.handlelogin(res);
            history.push('/dashboard');
           
        }catch(error){
            alert('login failed');
        }
    }
    
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
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" className="btn btn-primary btn-floating mx-1"  onClick={()=>signIn(yahooProvider)}>
              <i className="fab fa-yahoo"></i>
            </button>
            <button type="button" className="btn btn-primary btn-floating mx-1"  onClick={()=>signIn(twitterProvider)}>
              <i className="fab fa-twitter"></i>
            </button>

            

            <button type="button" className="btn btn-primary btn-floating mx-1"  onClick={()=>signIn(googleProvider)}>
              <i className="fab fa-google"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

        
          <div className="form-outline mb-4">
          <label className="form-label" for="form3Example3">Email address</label>
            <input type="email" id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" autoComplete='on'/>
          </div>

        
          <div className="form-outline mb-3">
          <label className="form-label" for="form3Example4">Password</label>
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" />
            
          </div>

          <div className="d-flex justify-content-between align-items-center">
           
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg mb-1"
              >Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                className="link-danger">Register</Link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>
       </>
        
      
    )
}
export default Auth;
