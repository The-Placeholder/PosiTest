import io from 'socket.io-client'
import { useEffect,useState } from "react"
import Messagelog from "./Messagelog.jsx"
    // REPLACE WITH REAL SOCKET SERVER
const SOCKET_SERVER_MSGR_ROUTE = 'http://localhost:3000'
    // REPLACE WITH REAL SOCKET SERVER


// required input: username & room
const Messenger=()=>{
    const [websocket,setWebsocket]=useState(null)
    const [chatlog,setChatlog]=useState(null)
        // DELETE ON IMPLEMENTATION
    const [username, setUsername]=useState(`guest${Math.floor(Math.random()*1000)}`)
    const [room, setRoom]=useState(0)
        // DELETE ON IMPLEMENTATION

    useEffect(()=>{
        const socket = io.connect(SOCKET_SERVER_MSGR_ROUTE)
        setWebsocket(socket)
        socket.emit('ComponentLoad',[username,room])

        socket.on('chatRecordTransfer',(message)=>{
            setChatlog(message)
        })
    },[])

    const sendIT=(event)=>{
        if(event.key==='Enter'&&event.target.value!==''){
            websocket.emit('MessageRequest',event.target.value)
            event.target.value=''
        }
    }

        // DELETE ON IMPLEMENTATION
    const switcheroom=()=>{
        setRoom(1)
        setChatlog(null)
        websocket.emit('ComponentLoad',[username,1])
    }
        // DELETE ON IMPLEMENTATION

    return(
        <>
            <div id='msgr_ctn' className={room===0?"h-screen":"h-1/2"}>
                <div id="msgr_log">
                    {chatlog&&<Messagelog chatlog={chatlog} username={username}/>}
                </div>
                <input id="msgr_input" onKeyUp={sendIT} className="textarea textarea-bordered textarea-md w-full max-w-xs" placeholder="chat here" autoComplete="off" autoFocus></input>                
            </div>
                {/* DELETE ON IMPLEMENTATION */}
            <button id="test_switch_rooms" onClick={switcheroom}>switch rooms</button>
                {/* DELETE ON IMPLEMENTATION */}
        </>
    )
    
}


export default Messenger