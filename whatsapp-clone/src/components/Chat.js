import React, { useEffect, useState } from "react";
import "./chat.css";
import {Avatar, IconButton} from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase/compat/app";


function Chat() {
    const [seed, setSeed] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => setRoomName(snapshot.data().name));

            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId]);


    useEffect(() => {
        setSeed(Math.floor(Math.random()*500));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: inputMessage,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInputMessage('');
    }

    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*500)}.svg`}/>

                <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>last seen {""}
                {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {
                    messages.map(message => (
                        <p className={`chat__message ${message.name === user.displayName && "chat__reciever"} `}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timeStamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>
                    ))
                }
                
            </div>

            <div className="chat__footer">
            <InsertEmoticonIcon />
            <form>
                <input type="text" placeholder="Type a message" value={inputMessage} onChange={e => setInputMessage(e.target.value)}/>
                <button onClick={sendMessage}>Send a message</button>
            </form>
            <MicIcon />
            </div>
        </div>
    )
}

export default Chat;