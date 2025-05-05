import { useState } from 'react';
import HeaderMenu from './HeaderMenu';
import SubHeader from './SubHeader';

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(true);
    
    return (
        <>
            <HeaderMenu 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                isLoginOpen={isLoginOpen}
                setIsLoginOpen={setIsLoginOpen}
            />
            <SubHeader />
        </>
    )
}

export default HomePage
