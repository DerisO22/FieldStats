// import logo from '../assets/logo.svg';
import './Component_Styles/header_menu.css'

const HeaderMenu = () => {
  return (
    <>
        <div className="headerMenuContainer">
            {/* <div className="headerLogo">
                <img src={logo} alt="Logo" />
            </div> */}

            <h1 className='headerTitle'>Logo</h1>

            <div className="headerMenu">
                <div className="headerMenuItem">Home</div>
                <div className="headerMenuItem">Item</div>
                <div className="headerMenuItem">Item</div>
                <div className="headerMenuItem">Item</div>
            </div>
        </div>
    </>
  )
}

export default HeaderMenu;