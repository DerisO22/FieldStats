
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './component_styles/footer.css';

const Footer = () => {
    const [marginTop, setMarginTop] = useState(0);

    useEffect(() => {
        const updateFooterPosition = () => {
            const pageContainer = document.querySelector('.page_container');
            if (pageContainer) {
                const containerHeight = pageContainer.getBoundingClientRect().height;
                const windowHeight = window.innerHeight;
                const newMargin = Math.max(windowHeight - containerHeight - 100, 20);
                setMarginTop(newMargin);
            }
        };

        updateFooterPosition();
        window.addEventListener('resize', updateFooterPosition);
        
        // Update position when content might change
        const observer = new MutationObserver(updateFooterPosition);
        const pageContainer = document.querySelector('.page_container');
        if (pageContainer) {
            observer.observe(pageContainer, { childList: true, subtree: true });
        }

        return () => {
            window.removeEventListener('resize', updateFooterPosition);
            observer.disconnect();
        };
    }, []);

    const handleScrollTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div className='footer_container' style={{ marginTop: `${marginTop}px` }}>
            <div className='logo_container'>
                <img className='logo_image' src='/page_logo.webp' alt="Logo" />
            </div>
            
            <div className='footer_menu'>
                <Link onClick={() => handleScrollTop()} to="/" className="headerMenuItem">Home</Link>
                <Link onClick={() => handleScrollTop()} to="/sports" className="headerMenuItem">Sports</Link>
                <Link onClick={() => handleScrollTop()} to="/schools" className="headerMenuItem">Schools</Link>
                <Link onClick={() => handleScrollTop()} to="/news" className="headerMenuItem">News</Link>
                <Link onClick={() => handleScrollTop()} to="/players" className="headerMenuItem">Players</Link>
            </div>

            <h1 className='copyright'>© Deris O'Malley</h1>
        </div>
    );
};

export default Footer;
