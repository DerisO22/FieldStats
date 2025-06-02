import { useState } from "react";
import './component_styles/profile_menu.css'
import { useAuth } from "../contexts/AuthContext";

interface UserProfileDetails {
    handleLogoutClick: () => void,
    handleLoginClick: () => void
}

const ProfileDetails = ({handleLogoutClick, handleLoginClick} : UserProfileDetails) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { user, isAuthenticated, logout} = useAuth();

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMenuOpen(prev => !prev);
    }

    const handleLogout = async () => {
        await logout();
        handleLogoutClick();
        setIsMenuOpen(false);
    }

    return (
        <>
            <div className='profile_container'>
                <img onClick={(e) => handleOpen(e)} className="profile_image" src="/profile_image2.webp"></img>

                <div className={`menu_details_container_${isMenuOpen ? 'open' : 'closed'}`}>
                    <h2 className="menu_header">
                        {isAuthenticated ? `Hey ${user?.username}` : "Not Signed In"}
                    </h2>
                    {isAuthenticated &&
                        <div className="menu_item_container">
                            <button className="menu_item">Notifications</button>
                            <button className="menu_item">Account Settings</button>
                            <button className="menu_item">Theme</button>
                        </div>
                    }

                    <div className="button_container">
                        {isAuthenticated ? (
                            <button className="authButton" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <button className="authButton" onClick={(e) => {
                                    handleLoginClick();
                                    handleOpen(e);
                                }
                            }>
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileDetails
