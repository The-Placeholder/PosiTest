import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const StudentLanding = () => {
  const { userData } = useContext(UserContext);

  console.log('inside student', userData);

  return (
    <>
      <div id="contents-ctn" className=""></div>
    </>
  );
};

export default StudentLanding;
