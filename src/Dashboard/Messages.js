import React from 'react';
import './Dashboard.css';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import InputEmoji from "react-input-emoji";
const Messages = (props) => {
    console.log(props.messages);
    return (
        
        <>
           <h4 className="text-center">Chat Title</h4>
           
           
           <div className="h-75 p-2 messages_div d-flex flex-column">
           <ScrollToBottom className="scroller" initialScrollBehavior='smooth'>
            {props.messages[props.current]&&props.messages[props.current].map((curele,i)=><div key={i}><Message message={curele} UserID={props.UserID}/></div>)}
            </ScrollToBottom>
           </div>
           
           <hr/>
         
         
           <div className="h-25 w-100">
           <div className="input-group mb-3">
           <InputEmoji
            value={props.message}
            onChange={props.messagechange}
            cleanOnEnter
            onEnter={props.sendmessage}
            placeholder="Type a message"
            className="w-75"
            />
               
            {/* <input type="text" className="form-control send_message_form shadow-none" placeholder="Username" value={props.message}  onChange={props.messagechange}/> */}
            {/* <div className="input-group-append p-1">
                    <button className="btn btn-outline-success" onClick={props.sendmessage}>Send</button>
            </div> */}
            
            </div>

           </div>
        </>
    )
}

export default Messages
