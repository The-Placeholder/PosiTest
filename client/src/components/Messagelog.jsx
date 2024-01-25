const Messagelog=({chatlog,username})=>{
    const whichSide=(sideBool)=>{
        let returnStr=''
        sideBool?
            returnStr = "chat chat-end":
            returnStr = "chat chat-start"
        return returnStr
    }
    return(
        chatlog.map(x=>(
            <>
                <div className={whichSide(x.sender===username)}>
                    <div className="chat-header">
                        {x.sender}
                        <time className="text-xs opacity-50">- {x.time}</time>
                    </div>
                    <div className="chat-bubble">{x.message}</div>
                </div>
            </>
        ))
    )
}

export default Messagelog