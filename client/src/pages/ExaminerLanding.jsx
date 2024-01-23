import { useEffect, useState } from 'react';

const ExaminerLanding = () => {
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

  return (
    <>
      <div
        id="contents-ctn"
        className="ctn flex flex-row flex-nowrap gap-8 justify-evenly mx-2 h-screen"
      >
        <div
          id="lobby-ctn"
          className="ctn w-7/12 flex flex-row flex-wrap gap-5 justify-evenly content-center h-full overflow-scroll pt-20"
        >
          {users.map((user) => (
            <div className="card w-5/12 ctn shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{user.username}</h2>
                <div className="card-actions">
                  <button className="btn btn-primary">Select</button>
                </div>
              </div>
            </div>
          ))}
          {/* End of card-ctn */}
        </div>
        {/* End of lobby-ctn */}
        <div id="chatroom-ctn" className="ctn w-4/12 h-full">
          chats
        </div>
      </div>
      {/* End of content-ctn */}
    </>
  );
};

export default ExaminerLanding;
