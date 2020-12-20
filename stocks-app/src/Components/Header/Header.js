import React from 'react'
import Logo from '../../logo.svg'

function Header() {
    return (
        <div className="header__wrapper">
            <div className="header__logo">
                <img src={Logo} width={25} height={25} />
            </div>
            {/* search */}
            <div className="header__search">
                <div className="header__searchContainer">
                    
                </div>
            </div>
            {/* menuitems */}
        </div>
    )
}

export default Header
