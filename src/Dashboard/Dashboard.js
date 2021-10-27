import React,{useContext, useEffect,useRef,useState} from 'react'

import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import immer from 'immer';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import './Dashboard.css';
import Participants from './Participants';
import { authContext } from '../App';
import Avatar from './Avatar.jpg';
import { useHistory,useParams } from 'react-router';
import Navbar from './Navbar';
import Chatvideo from './chatvid.mp4';
import Messages from './Messages';
const Functions=styled.div`
height:20%;
background:'orange';
display:flex;
flex-direction:column;

`;

let initialmessages={}
let usersdata={}
const chat = true ;
const Dashboard = () => {
const params=useParams();
const userContent = useContext(authContext);

const [chatRooms,setchatRooms]=useState([]);
const [roomName,setRoomName] =useState('');
const [message,setMessage]=useState('');
const [messages,setMessages]=useState(initialmessages);
const [current,setCurrent]=useState(null);
const [joinRoomName,setjoinRoomName] =useState('');
const [userslist,setUserslist]=useState(usersdata);
const [username,setUsername]=useState('');
const socketRef=useRef();
const [users,setUsers]=useState({});
const [isChannel,setisChannel]=useState(true);
useEffect(()=>{
  console.log(userContent);
  setUsername(userContent.loginStatus.user.displayName)
  socketRef.current=io.connect("/");
  console.log(socketRef);
},[])
useEffect(()=>{
  setMessage('');

},[messages])
useEffect(()=>{
  socketRef.current.on('message',(payload)=>{
    setMessages(messages=>{
      const newmessages=immer(messages,draft=>{
        if(draft[payload.roomID]){
          draft[payload.roomID].push({user:payload.user,text:payload.text,senderID:payload.id});
        }
        else{
          draft[payload.roomID]=[{user:payload.user,text:payload.text,senderID:payload.id}];
        }
      });
      return newmessages;
    });
    
    
  })
},[])

useEffect(()=>{
  socketRef.current.on('room data',payload=>{
    console.log(payload);
    console.log(current);
    setUserslist(gotusers=>{
      const newusers=immer(gotusers,draft=>{
        draft[payload.roomID]=[...payload.arr]
      });
      return newusers;
    });
  },[]);

},[])
const togglechat=(id)=>{
  setCurrent(id);
  setisChannel(true);
}
const toggleonetoonechat=(id)=>{
  setCurrent(id);
  setisChannel(false);
}


const addroom=()=>{
  if(roomName===''){
    alert('please fill room name to create room');
  }
  else{
    let newid=uuidv4();
    const payload={
      roomID:newid,
      name:username,
      roomName
    }
    setCurrent(payload.roomID);
    socketRef.current.emit('create room',(payload));
    socketRef.current.on('rooms',(rooms)=>{
      console.log(rooms);
      setchatRooms(rooms);
    })
    
    setRoomName('');

  }
 
}
const joinroom=()=>{
  if(joinRoomName===''){
    alert('please fill room name to join');
  }
  
  else{
    
    const payload={
      roomjoined:joinRoomName,
      name:username
    }
    setCurrent(payload.roomjoined);
    socketRef.current.emit('join room',(payload));
    socketRef.current.on('rooms',(rooms)=>{
      setchatRooms(rooms);
    })
    setjoinRoomName('');

  }



}
const sendmessage=()=>{
  if(isChannel){
    socketRef.current.emit('send message',{sender:username,roomID:current,message,isChannel});
  }
  else{
    socketRef.current.emit('send message',{sender:username,roomID:current,message,isChannel,senderId:socketRef.current.id});
  }
   
}
const leavegroup=(id)=>{
  
  const payload={
    roomID:id,
    name:username,
    myid:socketRef.current.id
  }
  setMessages(messages=>{
    const newmessages=immer(messages,draft=>{
      if(draft[id]){
        delete draft[id]
      }
    });
    return newmessages;
  });
  setUserslist(userspresent=>{
    const newusers=immer(userspresent,draft=>{
      if(draft[id]){
        delete draft[id]
      }
    });
    return newusers;
  });
 

  socketRef.current.emit('leave room',(payload));
  socketRef.current.on('rooms',(rooms)=>{
    console.log(rooms);
    setchatRooms(rooms);
   
    
  })

  
}


    return (
       <>
       <Navbar/>
       <div className="container-fluid " style={{height:'100vh'}}> 
       <div className="row h-100">
           <div className="col-md-3 h-100 d-flex bg-light  flex-column shadow-md">
               <Participants rooms={chatRooms}  toggle={togglechat} users={userslist} current={current} leavegroup={leavegroup}
               toggleonetoonechat={toggleonetoonechat}
               
               
               />
              
              <Functions>
              <div className=" d-flex justify-content-evenly mb-2">
                <div className="input_container">
                    <input type="text" className="awsome_input" placeholder="Create a Group" value={roomName} onChange={(e)=>setRoomName(e.target.value)}/>
                    <span className="awsome_input_border"/>
                </div>
                {/* <i className="fas  fa-plus-circle "></i> */}
                <button className=" button btn1" onClick={addroom}><i className="fas  fa-plus-circle fa-2x"></i></button>
               
              </div>
              <div className=" d-flex justify-content-evenly">
              <div className="input_container">
                    <input type="text" className="awsome_input" placeholder="Join a Group" value={joinRoomName} onChange={(e)=>setjoinRoomName(e.target.value)}/>
                    <span className="awsome_input_border"/>
                </div>
                <button className=" button btn1" onClick={joinroom}><i className="fas  fa-arrow-alt-circle-right fa-2x"></i></button>
              </div>

              
               
                  
              </Functions>
               
           </div>
           <div className="col-md-9  h-100 " style={{background:'#fff'}}>
            {current===null ?
            <div className='initial_img_div h-100 w-100'>
              <video className=" w-100 h-100" autoPlay muted loop >
                <source src={Chatvideo} type="video/mp4"/>
              </video>

            </div>
            
        
        
           :
           <Messages messages={messages} current={current} UserID={socketRef.current.id}
           messagechange={setMessage} 
          //  setMessage(e.target.value)
           sendmessage={sendmessage}
           message={message}
           
           />
           }
           {/* <h1 className="text-center"> Chat Title</h1>
           <div className="h-75">

           </div>
           <div className="h-25 w-100">
           <div class="input_container w-100">
                    <input type="text" class="awsome_input form-control" placeholder="Type Something"/>
                    <span class="awsome_input_border"/>
            
            </div>

           </div> */}


           </div>
       </div>


       </div>
       </>
    )
}

export default Dashboard;
