import { useState, memo } from 'react';
import './Component_Styles/header_menu.css'
import LoginForm from './LoginForm';
import ProfileDetails from './ProfileDetails';
import SearchBar from './SearchBar';

interface HeaderMenuProps {
	isLoginOpen: boolean;
	setIsLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setNotification: any;
	onSearch: (searchTerm: string) => void;
}

const HeaderMenu = ({isLoginOpen, setIsLoginOpen, setNotification, onSearch }: HeaderMenuProps) => {
	const [ currentUsername, setCurrentUsername ] = useState<string>('');

	const handleLoginClick = () => {
		setIsLoginOpen(true);
	};

	const handleLogoutClick = () => {
		setNotification({isVisible: true, message: 'Logged out', type: "info"});
		setCurrentUsername('');
	};

	const retrieveCurrentUsername = (username: string) => {
		setCurrentUsername(username);
	}

	return (
		<>
			<div className="headerMenuContainer">
				<img className='logo_image' src='/page_logo.webp'></img>

				<SearchBar 
					onSearch={onSearch}
				/>

				<div className="authContainer">
					<ProfileDetails 
						handleLogoutClick={handleLogoutClick}
						handleLoginClick={handleLoginClick}
					/>
				</div>

				<LoginForm 
					isOpen={isLoginOpen}
					setIsOpen={setIsLoginOpen}
					setNotification={setNotification}
				/>
			</div>
		</>
	)
}

export default memo(HeaderMenu);