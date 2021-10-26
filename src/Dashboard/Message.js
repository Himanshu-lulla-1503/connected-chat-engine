import React from 'react'
import ScrollToBottom  from 'react-scroll-to-bottom';
import './Message.css';
const Message = (props) => {
    return (
        
        <div>
            {props.message.senderID===null?
            <div className="w-100 d-flex align-items-center flex-column">
                <div className=" message_bubble_admin my-1  end_message text-center">
                {props.message.text}
                
                 </div>
               
            </div>:
            props.message.senderID==props.UserID?
            <div className="w-100 d-flex align-items-end flex-column">
            <div className="message_bubble_you my-1  end_message">
            {props.message.text}
             </div>
            <p>You</p>
            </div>:
             <div className="w-100 d-flex align-items-start flex-column" >
             <div className="message_bubble_other my-1  end_message">
             {props.message.text}
              </div>
             <p>{props.message.user}</p>
         </div>
    
            }
            
            
        </div>
        
    )
}

export default Message
