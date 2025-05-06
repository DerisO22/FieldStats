import { Link } from 'react-router-dom'
import './component_styles/footer.css'

const Footer = () => {
  return (
    <>
        <div className='footer_container'>
            <div className='logo_container'>
                <img className='logo_image' src='page_logo.webp'></img>
            </div>
          
            <div className='footer_menu'>
                <Link to="/" className="headerMenuItem">Home</Link>
                <Link to="/sports" className="headerMenuItem">Sports</Link>
                <Link to="/schools" className="headerMenuItem">Schools</Link>
                <Link to="/news" className="headerMenuItem">News</Link>
            </div>

            <h1 className='copyright'>© Deris O'Malley</h1>
        </div>
    </>
  )
}

export default Footer;