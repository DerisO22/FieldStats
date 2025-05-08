import '../components/component_styles/subheader_menu.css'
import { Link } from 'react-router-dom'

const SubHeader = () => {

    return (
        <div className="subheaderMenuContainer">
            {/* <div className="headerLogo">
                <img src={logo} alt="Logo" />
            </div> */}

            <div className="headerMenu">
                <Link to="/" className="headerMenuItem">Home</Link>
                <Link to="/sports" className="headerMenuItem">Sports</Link>
                <Link to="/schools" className="headerMenuItem">Schools</Link>
                <Link to="/news" className="headerMenuItem">News</Link>
                <Link to='/players' className='headerMenuItem'>Players</Link>
            </div>
        </div>
    )
}

export default SubHeader
