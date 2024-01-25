import { useEffect,useState } from "react"
import Messagelog from "./Messagelog.jsx"
    // REPLACE WITH REAL SOCKET SERVER
const SOCKET_SERVER_MSGR_ROUTE = 'localhost:3000/msgr'
    // REPLACE WITH REAL SOCKET SERVER


// required input: username & room
const Messenger=()=>{
    const [websocket,setWebsocket]=useState(null)
    const [chatlog,setChatlog]=useState(null)
        // DELETE ON IMPLEMENTATION
    const [username, setUsername]=useState(null)
    const [room, setRoom]=useState(0)
        // DELETE ON IMPLEMENTATION

    useEffect(()=>{
        const socket = new WebSocket(`ws://${SOCKET_SERVER_MSGR_ROUTE}`)

        socket.onopen=async()=>{ //sends server username and saves websocket instance
            console.log('WebSocket connection opened')
            await setWebsocket(socket);
                // DELETE ON IMPLENTATION
            const tempuser = `guest${Math.floor(Math.random()*1000)}`
            setUsername(tempuser)
                // DELETE ON IMPLENTATION

            socket.send(JSON.stringify(['Username',tempuser]))
        }
        socket.onmessage=(event)=>{ //message event handler
            const inbound = JSON.parse(event.data)
            switch(inbound[0]){
                case 'chatRecordTransfer':
                    console.log('Received Message:',inbound[1])
                    setChatlog(inbound[1])
                    console.log('Setting Chatlog')
                    break;
            }
        }
    },[])

    const sendIT=(event)=>{
        if(event.key==='Enter'&&event.target.value!==''){
            websocket.send(JSON.stringify(['MessageRequest',event.target.value]))
            event.target.value=''
        }
    }

        // DELETE ON IMPLEMENTATION
    const switcheroo=()=>{
        if(websocket){
            websocket.close()
        }
        setRoom(1)
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
            <button id="test_switch_rooms" onClick={switcheroo}>switch rooms</button>
                {/* DELETE ON IMPLEMENTATION */}
        </>
    )
    
}


export default Messenger