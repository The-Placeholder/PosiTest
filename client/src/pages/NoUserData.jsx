import { NavLink } from 'react-router-dom';
import notfoundPanda from '/notfound-panda.jpg';

export default function NoUserData() {
  return (
    <div className="flex flex-col flex-wrap gap-20">
      <h2 className="text-5xl">No User Data found</h2>
      <div>
        <img src={notfoundPanda} alt="page not found panda image" />
      </div>

      <NavLink
        to="/"
        className="text-3xl btn btn-primary p-10 flex content-center"
      >
        Return to Homepage
      </NavLink>
    </div>
  );
}
