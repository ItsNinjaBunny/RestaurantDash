import React from 'react'
import { FaMail } from 'react-icons/fa';


import{Nav,NavBtnLink,NavBtn,NavMenu,NavLink,Bars,H1}from './NavbarElements'
const Navbar = () => {
  return (
    < >
        <Nav>
            <H1>Order Ready</H1>
            {/* <NavLink to="/">
                <img src='.\.\logo.svg'></img>
            </NavLink>
            <Bars/>
            <NavMenu>
                <NavLink to="/menuitems" activeStyle>
                    Menu
                </NavLink>
                <NavLink to="/offers" activeStyle>
                    Offers
                </NavLink>
                <NavLink to="/ordertracking" activeStyle>
                    Orders
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="/Login">Sign Out</NavBtnLink>
            </NavBtn> */}
        </Nav>
    </>
  )
}

export default Navbar