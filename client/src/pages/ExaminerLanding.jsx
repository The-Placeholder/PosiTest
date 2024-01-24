import { useEffect, useState } from 'react';

const ExaminerLanding = ({ setnavTitle }) => {
  const [users, setUsers] = useState([]);
  console.log(users);
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

  setnavTitle('Examiner Lobby');

  return (
    <>
      <div
        id="contents-ctn"
        className="shadow-xl flex flex-row flex-wrap justify-evenly gap-15 m-5 p-5 h-full rounded-2xl "
      >
        <div
          id="lobby-ctn"
          className="w-7/12 flex flex-wrap h-full overflow-y-auto"
        >
          <h1 className="w-full text-center text-5xl font-bold text-black mt-3 self-center">
            Student Lobbies
          </h1>
          <div
            id="usercard-ctn"
            className="ctn flex flex-wrap gap-5 justify-evenly p-9 mb-16"
          >
            {users.map((user) => (
              <div className="card w-5/12 h-36 shadow-xl flex justify-center content-center bg-g-greyblue ">
                <div className="card-body items-center text-center text-black">
                  <h2 className="card-title text-3xl">{user.username}</h2>
                  <div className="card-actions">
                    <button className="btn btn-primary opacity-75">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* End of card-ctn */}
          </div>
          {/* End of usercard-ctn */}
        </div>
        {/* End of lobby-ctn */}
        <div id="chatroom-ctn" className="ctn w-4/12 h-screen">
          <h1>chat component</h1>
        </div>
      </div>
      {/* End of content-ctn */}
    </>
  );
};

export default ExaminerLanding;
