import { useState } from "react";
import './component_styles/profile_menu.css'

interface UserProfileDetails {
    username: string,
    isLoggedIn: boolean,
    handleLogoutClick: () => void,
    handleLoginClick: () => void
}

const ProfileDetails = ({username, isLoggedIn, handleLogoutClick, handleLoginClick} : UserProfileDetails) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMenuOpen(prev => !prev);
        console.log(isMenuOpen)
    }

    return (
        <>
            <div className='profile_container'>
                <img onClick={(e) => handleOpen(e)} className="profile_image" src="/profile_image2.webp"></img>

                <div className={`menu_details_container_${isMenuOpen ? 'open' : 'closed'}`}>
                    <h2 className="menu_header">Hey {username}</h2>
                    <div className="menu_item_container">
                        <button className="menu_item">MenuItem</button>
                    </div>

                    <div className="button_container">
                        {isLoggedIn ? (
                            <button className="authButton" onClick={(e) => {
                                    handleLogoutClick();
                                    handleOpen(e);
                                }
                            }>
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
