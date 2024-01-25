import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h2>Page not found!</h2>
      <p>Only cheaters get here</p>

      <p>
        Go to the <NavLink to="/">Homepage</NavLink>.
      </p>
    </div>
  );
}