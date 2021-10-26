import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import './Roomtemp.css';
const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 50%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room2 = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const [muted,setMuted]=useState(false);
    const [Stopvideo,setStopVideo]=useState(false);
    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("joinvid room", roomID);
            socketRef.current.on('room full',()=>{
                stopBothVideoAndAudio(userVideo.current.srcObject)
                alert('Sorry the room is Full');
                props.history.push('/');
            })
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID:userID,
                        peer,
                    });
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                const peerObject={
                    peer,
                    peerID:payload.callerID,
                }

                setPeers(users => [...users, peerObject]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
            


            socketRef.current.on('user left',id=>{
                const peerObj=peersRef.current.find(p=>p.peerID===id);
                if(peerObj){
                    peerObj.peer.destroy();
                }
                const peers=peersRef.current.filter(p=>p.peerID!==id);
                peersRef.current=peers;
                setPeers(peers);
            })
        })
    }, []);

    function stopBothVideoAndAudio(stream) {
        userVideo.current.srcObject.getTracks().forEach(function(track) {
            if (track.readyState == 'live') {
                track.stop();
            }
        });
    }

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }


    const mute=()=>{
        if(muted){
            setMuted(false);
        }
        else{
            setMuted(true);
        }
        userVideo.current.srcObject.getAudioTracks()[0].enabled = !(userVideo.current.srcObject.getAudioTracks()[0].enabled);
    }
    const stopvideo=()=>{
        if(Stopvideo){
            setStopVideo(false);
        }
        else{
            setStopVideo(true);
        }
        userVideo.current.srcObject.getVideoTracks()[0].enabled = !(userVideo.current.srcObject.getVideoTracks()[0].enabled);
    }

   
    return (
        <div className="main">
      <div className="main__left">
         <div className="main__videos">
            <div id="video-grid">
            
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} />
                );
            })}
       
                
                
      
            </div>
         </div>
         <div className="main__controls">
            <div className="main__controls__block">
               <div onClick={mute} className="main__controls__button main__mute_button">
                   {muted===true?
                   <i class="fas fa-microphone-slash"></i>:
                   <i className="fas fa-microphone"></i>
                 }
                  
                  <span>Mute</span>
               </div>
               <div onClick={stopvideo} className="main__controls__button main__video_button" >
               {Stopvideo===true?
                   <i class="fas fa-video-slash"></i>:
                   <i className="fas fa-video"></i>
                 }
                  
                  <span>Stop Video</span>
               </div>
            </div>
            <div className="main__controls__block">
               <div className="main__controls__button">
                  <i className="fas fa-shield-alt"></i>
                  <span>Security</span>
               </div>
               <div className="main__controls__button">
                  <i className="fas fa-user-friends"></i>
                  <span>Participants</span>
               </div>
               <div className="main__controls__button">
                  <i className="fas fa-comment-alt"></i>
                  <span>Chat</span>
               </div>
            </div>
            <div className="main__controls__block">
               <div className="main__controls__button">
                  <span className="leave_meeting">Leave Meeting</span>
               </div>
            </div>
         </div>
      </div>
      
   </div>
    );
};


export default Room2
