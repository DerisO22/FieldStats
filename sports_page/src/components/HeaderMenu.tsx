import { useState } from 'react';
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
  const [ currentUsername, setCurrentUsername ] = useState<string>('');

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleLogoutClick = () => {
    setNotification({isVisible: true, message: 'Logged out', type: "info"});
    setCurrentUsername('');
    setIsLoggedIn(false);
  };

  const retrieveCurrentUsername = (username: string) => {
    setCurrentUsername(username);
  }

  return (
    <>
      <div className="headerMenuContainer">
        <img className='logo_image' src='/page_logo.webp'></img>

        <div className="authContainer">
            <ProfileDetails 
              username={currentUsername === '' ? 'Not Signed In' : `Hey ${currentUsername}`}
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
              retrieveCurrentUsername = {retrieveCurrentUsername}
          />
      </div>
    </>
  )
}

export default HeaderMenu;
