import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const StudentLanding = () => {
  const { userData } = useContext(UserContext);

  console.log('inside student', userData);

  return (
    <>
      <h1>Student Landing</h1>
      {!!userData && <h2>{userData[0].username} successfully logged in</h2>}
    </>
  );
};

export default StudentLanding;
