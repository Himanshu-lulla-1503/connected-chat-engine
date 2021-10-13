import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
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

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userStream = useRef();
    const peersRef = useRef([]);
    const [mystream,Setmystream]=useState(null);
    const [pause,Setpause]=useState(false);
    const [togglebtn,Settogglebtn]=useState('Stop Video');
    const [togglebtn2,Settogglebtn2]=useState('Pause Video');
    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userStream.current.srcObject = stream;
            Setmystream(stream);
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

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
        <Container>
            <StyledVideo muted ref={userStream} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
        <button onClick={stopVideo}>{togglebtn}</button>
        <button onClick={pauseVideo}>{togglebtn2}</button>
        </Container>
    );
};

export default Room;