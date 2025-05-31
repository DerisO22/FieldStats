import { useState } from "react";
import './component_styles/profile_menu.css'
import { useAuth } from "../contexts/AuthContext";

interface UserProfileDetails {
    username: string,
    handleLogoutClick: () => void,
    handleLoginClick: () => void
}

const ProfileDetails = ({username, handleLogoutClick, handleLoginClick} : UserProfileDetails) => {
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
                    <h2 className="menu_header">{username}</h2>
                    <div className="menu_item_container">
                        <button className="menu_item">MenuItem</button>
                        <button className="menu_item">MenuItem</button>
                        <button className="menu_item">MenuItem</button>
                    </div>

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
