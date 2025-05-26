import './App.css'
import { useState, memo, useCallback } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import HeaderMenu from './components/HeaderMenu';
import SubHeader from './components/SubHeader';
import Footer from './components/Footer';
import PageRoutes from './routes/PageRoutes';
import PopUpNotification from './components/PopUpNotification';
import { ModalProvider } from './contexts/ModalContext';

const App = () => {
    // Login Auth States
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const [notification, setNotification] = useState<{
      isVisible: boolean,
      message: string,
      type?: 'success' | 'error' | 'info',
      duration: number,
      onClose: () => void
    }
    >({isVisible: false, message: '', type: 'info', duration: 0, onClose: () => {}});
    const [searchTerm, setSearchTerm] = useState<string>('');
    
    return (
        <>
            <PopUpNotification
              isVisible={notification?.isVisible}
              message={notification.message}
              type={notification?.type}
              duration={notification?.duration}
              onClose={useCallback(() => setNotification(prev => ({ ...prev, isVisible: false })), [])}
            />
            {/* React Router for navigating between pages */}
            <ModalProvider>
              <Router>
                  <HeaderMenu 
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            isLoginOpen={isLoginOpen}
                            setIsLoginOpen={setIsLoginOpen}
                            setNotification={setNotification}
                            onSearch={useCallback((term: string) => setSearchTerm(term), [])}
                  />
                  <SubHeader />
                  <PageRoutes searchTerm={searchTerm} />
                  <Footer />
              </Router>
            </ModalProvider>
        </>
    )
}

export default memo(App);