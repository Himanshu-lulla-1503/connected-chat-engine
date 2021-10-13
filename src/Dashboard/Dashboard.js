import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import './Dashboard.css';


const Participants=styled.div`
height:80%;
overflow-y:scroll;
background:'pink';
`;
const Functions=styled.div`
height:20%;
background:'orange';
display:flex;
flex-direction:column;

`;

const Dashboard = () => {
    return (
       <>
       <div className="container-fluid " style={{height:'100vh'}}> 
       <div className="row h-100">
           <div className="col-md-3 h-100 bg-white d-flex flex-column shadow-md" >
              <Participants>
              
              <h3 className="text-center">Username</h3>
              <div>
              <h6 className="mt-5">Active Groups</h6>
              <hr/>

              </div>
             
              <div>
              <h6 className="mt-5">Users Active</h6>
              <hr/>
              
              </div>

              </Participants>
              <Functions>
              <div className=" d-flex justify-content-evenly mb-2">
                <div class="input_container">
                    <input type="text" class="awsome_input" placeholder="Create a Group"/>
                    <span class="awsome_input_border"/>
                </div>
                <button className="btn buttons text-warning" style={{borderRadius:'30px'}}><i className="fas fa-2x fa-plus-circle "></i></button>

              </div>
              <div className=" d-flex justify-content-evenly">
              <div class="input_container">
                    <input type="text" class="awsome_input" placeholder="Join a Group"/>
                    <span class="awsome_input_border"/>
                </div>
                <button className="btn buttons text-danger" style={{borderRadius:'30px'}}><i className="fas fa-2x fa-arrow-alt-circle-right"></i></button>
              
              </div>

              
               
                  
              </Functions>
               
           </div>
           <div className="col-md-9 bg h-100 bg-light ">
           <h1 className="text-center"> Chat Title</h1>
           <div className="h-75">

           </div>
           <div className="h-25 w-100">
           <div class="input_container w-100">
                    <input type="text" class="awsome_input form-control" placeholder="Type Something"/>
                    <span class="awsome_input_border"/>
            
            </div>

           </div>


           </div>
       </div>


       </div>
       </>
    )
}

export default Dashboard;
