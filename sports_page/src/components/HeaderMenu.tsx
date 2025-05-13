import './Component_Styles/header_menu.css'
import LoginForm from './LoginForm';
import ProfileDetails from './ProfileDetails';

interface HeaderMenuProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginOpen: boolean;
  setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotification: any
}

const HeaderMenu = ({ isLoggedIn, setIsLoggedIn, isLoginOpen, setIsLoginOpen, setNotification }: HeaderMenuProps) => {
  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="headerMenuContainer">
        <img className='logo_image' src='/page_logo.webp'></img>

        <div className="authContainer">
            <ProfileDetails 
              username='Deris'
              isLoggedIn={isLoggedIn}
              handleLogoutClick={handleLogoutClick}
              handleLoginClick={handleLoginClick}
            />
        </div>

        <LoginForm 
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isOpen={isLoginOpen}
              setIsOpen={setIsLoginOpen}
              setNotification={setNotification}
          />
      </div>
    </>
  )
}

export default HeaderMenu;
