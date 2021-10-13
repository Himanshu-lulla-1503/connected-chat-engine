import React,{useEffect,useRef,useState} from 'react'
import io from 'socket.io-client';


let socket;
function Peer() {
    const userStream = useRef(null);
    const [mystream,Setmystream]=useState(null);
    const [pause,Setpause]=useState(false);
    const [togglebtn,Settogglebtn]=useState('Stop Video');
    const [togglebtn2,Settogglebtn2]=useState('Pause Video');
    useEffect(()=>{
        socket = io('http://localhost:5000', {transports : ['websocket']});
        socket.emit('join room');
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true,
        }).then((stream)=>{
            userStream.current.srcObject=stream;
            Setmystream(stream);
        }).catch(err=>console.log(err))

    },[])

    const pauseVideo=()=>{
        if(!pause){
            userStream.current.pause();
            Settogglebtn2('Play Video');
            Setpause(true);
        }
        else{
            userStream.current.srcObject=mystream;
            Settogglebtn2('Pause Video');
            Setpause(false);
        }
    }
    const stopVideo=()=>{
        if(!userStream.current.srcObject){
            userStream.current.srcObject=mystream;
            Settogglebtn('Start Video');
        }
        else{
            userStream.current.srcObject=null;
            Settogglebtn('Start Video');

        }
       
       
    }
    return (
        <>
        <video ref={userStream} controls autoPlay playsInline muted></video>
        <button onClick={stopVideo}>{togglebtn}</button>
        <button onClick={pauseVideo}>{togglebtn2}</button>
        </>
    )
}

export default Peer;
