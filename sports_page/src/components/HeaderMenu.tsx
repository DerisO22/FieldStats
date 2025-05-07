import './Component_Styles/header_menu.css'
import LoginForm from './LoginForm';

interface HeaderMenuProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderMenu = ({ isLoggedIn, setIsLoggedIn, isLoginOpen, setIsLoginOpen }: HeaderMenuProps) => {
  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="headerMenuContainer">
        <img className='logo_image' src='page_logo.webp'></img>

        <div className="authContainer">
          {isLoggedIn ? (
            <button className="authButton" onClick={handleLogoutClick}>
              Logout
            </button>
          ) : (
            <button className="authButton" onClick={handleLoginClick}>
              Login
            </button>
          )}
        </div>

        <LoginForm 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isOpen={isLoginOpen}
          setIsOpen={setIsLoginOpen}
        />
      </div>
    </>
  )
}

export default HeaderMenu;
