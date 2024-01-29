import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Messenger from '../../components/Messenger';
import { UserContext } from '../../../context/UserContext';

const InstructorLanding = () => {
  const { setChannel } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [roomCount, setRoomCount] = useState([1, 2, 3, 4]); //this is placeholder for rooms

  console.log(`roomCount`, roomCount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error('Error');
        }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
    };
    fetchData();
  }, []);

  const selectSuite = (roomID) => {
    setChannel(roomID);
    console.log(`changing rooms ${roomID}`);
  };

  return (
    <>
      <div
        id="contents-ctn"
        className="shadow-xl flex flex-row flex-wrap justify-evenly gap-15 m-5 p-5 pb-32 h-screen rounded-2xl max-h-[900px] "
      >
        <div
          id="lobby-ctn"
          className="w-7/12 flex flex-wrap h-full overflow-y-auto"
        >
          <h1 className="w-full text-center text-5xl font-bold text-black mt-3 self-center">
            Coding Rooms
          </h1>
          <div
            id="usercard-ctn"
            className="ctn flex flex-wrap gap-5 justify-evenly p-9 mb-16"
          >
            {roomCount.map((roomId, index) => (
              <div
                key={roomId + index}
                className="card w-5/12 h-36 shadow-xl flex justify-center content-center bg-g-greyblue "
              >
                <div className="card-body items-center text-center text-black">
                  <h2 className="card-title text-3xl">{`Room: ${roomId}`}</h2>
                  <div className="card-actions">
                    <Link to="/suite">
                      <button
                        className="btn btn-primary opacity-75"
                        onClick={() => selectSuite(roomId)}
                      >
                        Select
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* End of card-ctn */}
          </div>
          {/* End of usercard-ctn */}
        </div>
        {/* End of lobby-ctn */}
        <div id="chatroom-ctn" className="ctn w-4/12 h-full overflow-auto">
          <Messenger isglobal={true} />
        </div>
      </div>
      {/* End of content-ctn */}
    </>
  );
};

export default InstructorLanding;
