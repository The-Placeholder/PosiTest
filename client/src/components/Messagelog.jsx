const Messagelog=({chatlog,username})=>{
    const whichSide=(sideBool)=>{
        let returnStr=''
        sideBool?
            returnStr = "chat chat-end":
            returnStr = "chat chat-start"
        return returnStr
    }

    const relativeTime=(postedTime)=>{
        const clock = new Date()[Symbol.toPrimitive]('number')
        let timeDiff = (postedTime-clock)/1000
        if(timeDiff<60){
            timeDiff=`${Math.floor(timeDiff)} seconds ago`
        } else if (timeDiff<360){
            timeDiff=`${Math.floor(timeDiff/60)} minutes ago`
        } else {
            timeDiff=`${Math.floor(timeDiff/360)} hours ago`
        }
        return timeDiff
    }

    return(
        chatlog.map(x=>(
            <>
                <div className={whichSide(x.sender===username)}>
                    <div className="chat-header">
                        {x.sender}
                        <time className="text-xs opacity-50">- {relativeTime(x.time)}</time>
                    </div>
                    <div className="chat-bubble">{x.message}</div>
                </div>
            </>
        ))
    )
}

export default Messagelog