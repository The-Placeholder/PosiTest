import { useNavigate } from 'react-router-dom';

const NavBackBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-ghost border-white text-white bg-ghost border-solid p-2"
      onClick={() => navigate('/lobby')}
    >
      Return to Lobbies
    </button>
  );
};
export default NavBackBtn;
