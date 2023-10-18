import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          {user && (<h1>{user.name}'s Grocery List</h1>)}
          {!user && (<h1>Grocery List</h1>)}
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.name}&nbsp;</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar;
