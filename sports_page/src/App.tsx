
import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SportsPage from './pages/SportsPage';
import HomePage from './pages/HomePage';
import SchoolsPage from './pages/SchoolsPage';
import NewsPage from './pages/NewsPage';
import HeaderMenu from './components/HeaderMenu';
import SubHeader from './components/SubHeader';
import Footer from './components/Footer';
import PageRoutes from './routes/PageRoutes';

const App = () => {
  // Login Auth States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  
  return (
    <>
    {/* React Router for navigating between pages */}
    <Router>
      <HeaderMenu 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                isLoginOpen={isLoginOpen}
                setIsLoginOpen={setIsLoginOpen}
            />
      <SubHeader />
        <PageRoutes />
      <Footer />
    </Router>
    </>
  )
}

export default App;