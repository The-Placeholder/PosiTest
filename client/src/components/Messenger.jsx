import { useEffect, useState, useContext, useRef } from 'react';
import Messagelog from './Messagelog.jsx';
import socket from '../../utils/socket.js';
import { UserContext } from '../../context/UserContext.jsx';
import '../App.css';

const Messenger = ({ isglobal, suite }) => {
  const { channel, userData } = useContext(UserContext);
  const [chatlog, setChatlog] = useState(null);
  const scrollingDivRef = useRef(null);
  const [username, setUsername] = useState(userData.username);
  const [participants, setParticipants] = useState([]);

  let suiteroom;
  isglobal ? (suiteroom = 'global') : (suiteroom = channel);
  let suiteformat = {};
  if (suite) {
    suiteformat.header =
      'text-4xl font-bold text-center text-white rounded-full p-1 mx-auto w-fit mb-5';
    suiteformat.chatninputCTN = 'h-full w-5/6 mr-2 chatbox_suite';
  } else {
    suiteformat.header =
      'text-4xl font-bold text-center text-black rounded-full p-1 mx-auto w-fit mb-5';
    suiteformat.chatninputCTN = 'h-full w-5/6 mr-2 chatbox';
  }

  useEffect(() => {
    setChatlog(null);
    socket.emit('ComponentLoad', [username, suiteroom]);
    socket.on('chatRecordTransfer', (message) => {
      setChatlog(message);
    });
    socket.on('participantUpdate', (participantList) => {
      setParticipants(participantList);
    });
  }, []);

  useEffect(() => {
    if (scrollingDivRef) {
      scrollingDivRef.current.scrollTop = scrollingDivRef.current.scrollHeight;
    }
  }, [chatlog]);

  const sendIT = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      socket.emit('MessageRequest', [event.target.value, userData.profile_pic]);
      event.target.value = '';
    }
  };

  const globalorprivate = () => {
    let returnStr;
    suiteroom === 'global'
      ? (returnStr = 'Lobby')
      : (returnStr = `Room ${channel}`);
    return returnStr;
  };

  return (
    <div id="msgr_ctn" className="h-full">
      <h1 className={suiteformat.header}>{globalorprivate()} Chat</h1>
      <div className="flex h-5/6 w-full">
        <div className={suiteformat.chatninputCTN}>
          <div
            id="msgr_log"
            className="msgr_overflow p-2 pt-12 w-full h-full mr-1"
            ref={scrollingDivRef}
          >
            {chatlog && <Messagelog chatlog={chatlog} username={username} />}
          </div>
          <input
            id="msgr_input"
            onKeyUp={sendIT}
            className="textarea textarea-bordered textarea-md w-full bg-g-greyblue mt-3"
            placeholder="Message here"
            autoComplete="off"
          ></input>
        </div>
        <div className="w-1/6 h-full border-2 bg-g-gray rounded-lg">
          <h2 className="text-center text-darkgray font-bold text-md mb-5 mt-2">
            {' '}
            Current Users
          </h2>
          {participants.map((x, key) => (
            <div key={key} className="ml-2">
              {x}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
