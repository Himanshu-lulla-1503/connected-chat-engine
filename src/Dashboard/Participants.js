import React,{useContext} from 'react'
import styled from "styled-components";
import './Dashboard.css';
import { authContext } from '../App';
import { current } from 'immer';

const Participantdiv=styled.div`
height:80%;
overflow-y:scroll;


`;


const Participants = (props) => {
  const share=async ()=>{
    try {
        await navigator.share({
            title: 'Connected-Chat-Engine',
            text: `Join My Group on Connected-chat-Engine my roomID is ${props.current}`,
            url: `http://localhost:3000/${props.current}`
       
      })
    }
      catch(err) {
       alert('Some error occured');
      }
  }



    const authValue=useContext(authContext);
    console.log(authValue)
    return (
        <Participantdiv>
              
              
              <div>
              <h6 className="mt-5">Active Groups</h6>
              <hr/>
              {props.rooms.map((curele,index)=>{
                  return(
                    <div className="left_side_divs mt-0 d-flex justify-content-around align-items-center my-1" onClick={()=>props.toggle(curele.roomID)}>
                    <div className="h-100 w-75 p-2 ">{curele.roomName}</div> 
                    <div className="d-flex justify-content-around w-25">
                    <a href="#"  onClick={(e)=>{e.preventDefault();
                    props.leavegroup(curele.roomID);
                    }}>
                    <i class="fas fa-minus-circle text-danger"></i>
                    </a>
                    <a href="#2" onClick={(e)=>{e.preventDefault();
                    share();
                    }}>
                    <i class="fas fa-share-alt"></i>
                    </a>
                    <a href="#3" onClick={(e)=>{e.preventDefault();
                    navigator.clipboard.writeText(props.current);                    
                    }}>
                    <i class="fas fa-clipboard text-dark"></i>
                    </a>
  
                    </div>
                </div>
                
                  )
              })}
              

              </div>
             
              <div>
              <h6 className="mt-5">Users Active</h6>
              <hr/>
              {props.users[props.current]&&
              <div>
                {props.users[props.current].map((curele,i)=>{
                   return (
                    <div className="left_side_divs mt-0 d-flex justify-content-around align-items-center my-1" onClick={()=>props.toggleonetoonechat(curele.id)}>
                    <div className="h-100 w-100 p-2 ">{curele.name}</div> 
                    </div>

                   )
                })}
                </div>
        }
              
              </div>

              </Participantdiv>
    )
}

export default Participants
