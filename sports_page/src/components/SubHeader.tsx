import '../components/component_styles/subheader_menu.css'

const SubHeader = () => {

    return (
        <div className="subheaderMenuContainer">
            {/* <div className="headerLogo">
                <img src={logo} alt="Logo" />
            </div> */}

            <div className="headerMenu">
                <div className="headerMenuItem">Home</div>
                <div className="headerMenuItem">Item</div>
                <div className="headerMenuItem">Item</div>
                <div className="headerMenuItem">Item</div>
            </div>
        </div>
    )
}

export default SubHeader
