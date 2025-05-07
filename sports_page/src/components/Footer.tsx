
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

  return (
    <div className='footer_container' style={{ marginTop: `${marginTop}px` }}>
      <div className='logo_container'>
        <img className='logo_image' src='/page_logo.webp' alt="Logo" />
      </div>
      
      <div className='footer_menu'>
        <Link to="/" className="headerMenuItem">Home</Link>
        <Link to="/sports" className="headerMenuItem">Sports</Link>
        <Link to="/schools" className="headerMenuItem">Schools</Link>
        <Link to="/news" className="headerMenuItem">News</Link>
      </div>

      <h1 className='copyright'>© Deris O'Malley</h1>
    </div>
  );
};

export default Footer;
