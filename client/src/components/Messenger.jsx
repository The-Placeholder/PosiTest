import { useEffect,useState,useContext,useRef } from "react"
import Messagelog from "./Messagelog.jsx"
import socket from '../../utils/socket.js';
import { UserContext } from "../../context/UserContext.jsx";
import '../App.css'

const Messenger=({isglobal})=>{ 
    const {channel,userData}=useContext(UserContext)
    const [chatlog,setChatlog]=useState(null)
    const scrollingDivRef=useRef(null);
        // NEED USERNAME
    const [username, setUsername]=useState(`guest${Math.floor(Math.random()*1000)}`)
        // NEED USERNAME

    let suiteroom
    isglobal?suiteroom='global':suiteroom=channel

    useEffect(()=>{
        setChatlog(null)
        socket.emit('ComponentLoad',[username,suiteroom])
        socket.on('chatRecordTransfer',(message)=>{
            setChatlog(message)
        })
    },[])

    useEffect(()=>{
        if(scrollingDivRef){
            scrollingDivRef.current.scrollTop=scrollingDivRef.current.scrollHeight
        }
    },[chatlog])

    const sendIT=(event)=>{
        if(event.key==='Enter'&&event.target.value!==''){
            socket.emit('MessageRequest',[event.target.value,userData.profile_pic])
            event.target.value=''
        }
    }

    const globalorprivate=()=>{
        let returnStr 
        suiteroom==='global'?
            returnStr='Global':
            returnStr='Private'
        return returnStr
    }

    return(
        <div id='msgr_ctn' className="h-full">
            <h1 className="text-4xl text-center mb-2 msgr_head text-black">{globalorprivate()} Chat</h1>
            <div id="msgr_log" className="msgr_overflow p-2 pt-12" ref={scrollingDivRef}>
                {chatlog&&<Messagelog chatlog={chatlog} username={username}/>}
            </div>
            <div className="bg-stone-400 h-2 w-full my-2 border-1 border-black"></div>
            <input id="msgr_input" onKeyUp={sendIT} className="textarea textarea-bordered textarea-md w-full msgr_input" placeholder="Message here" autoComplete="off"></input>                
        </div>
    )    
}


export default Messenger