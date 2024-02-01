import nopic from '/noprofilepic.png';

const Messagelog = ({ chatlog, username }) => {
  const relativeTime = (postedTime) => {
    const clock = new Date()[Symbol.toPrimitive]('number');
    let timeDiff = (clock - postedTime) / 1000;
    if (timeDiff < 60) {
      timeDiff = `${Math.floor(timeDiff)} seconds ago`;
    } else if (timeDiff < 360) {
      timeDiff = `${Math.floor(timeDiff / 60)} minutes ago`;
    } else {
      timeDiff = `${Math.floor(timeDiff / 360)} hours ago`;
    }
    return timeDiff;
  };

  const formattedMsg = (sideBool, x, key) => {
    let tagObj = { msgCTN: null, msgBody: null };
    if (sideBool) {
      tagObj.msgCTN = 'chat chat-end';
      tagObj.msgBody = 'chat-bubble bg-g-orange text-white';
    } else {
      tagObj.msgCTN = 'chat chat-start';
      tagObj.msgBody = 'chat-bubble bg-g-blue text-white';
    }

    return (
      <div className={tagObj.msgCTN} key={key}>
        <div className="chat-image avatar">
          <div className="w-7 rounded-full">
            <img alt="user profile picture" src={x.icon || nopic} />
          </div>
        </div>
        <div className="chat-header">{x.sender}</div>
        <div className={tagObj.msgBody}>{x.message}</div>
        <div className="chat-footer opacity-50 text-xs">
          {relativeTime(x.time)}
        </div>
      </div>
    );
  };

  return chatlog.map((x, key) => formattedMsg(x.sender === username, x, key));
};

export default Messagelog;
