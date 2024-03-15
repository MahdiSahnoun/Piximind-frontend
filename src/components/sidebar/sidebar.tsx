import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { AiOutlineMenu} from 'react-icons/ai';
import { SidebarData } from "./sidebarData";
import Submenu from "./subMenu";
import logo from '../../images/logo.svg';
import { selectUser, logout } from "../../api/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0; 
  height: 5rem;
  width: 100%;
  background-color: #2db300;
 
`;


const SidebarNav = styled.div<{ sidebar: boolean }>`
  width: 300px;
  height: 120vh;
  background-color: #2db300;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-20%')};
  transition: 350ms;
`;

const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 2rem;
  left :-10rem;
  position: fixed;
  font-size: 2rem;
  margin-left:37rem;
  margin-top:2rem;

`;
const Logo = styled.img`
  width: 80%;
  margin-left: 1rem;
  margin-top: 2rem;
  filter: brightness(0) invert(1);
`;


const SidebarWrap = styled.div``;

const Sidebar: FC = () => {
    const [sidebar, setSidebar] = useState(false);
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showSidebar = () => setSidebar(!sidebar);

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/log-in');
    };



    const LogoutButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  font-size: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
      margin-left:2000px;
`;

    return (
        <IconContext.Provider value={{ color: '#fff' }}> {/*color of icons*/}
            <Nav>
                <NavIcon to="#" onClick={showSidebar}>
                    <AiOutlineMenu />
                </NavIcon>
                <LogoutButton onClick={handleLogout}>
                    <RiLogoutBoxRLine />
                </LogoutButton>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <Logo src={logo} alt="Logo" />
                <SidebarWrap>
                    <br/>
                    <br/>
                    <br/>
                    {SidebarData.map((item, index) => {
                        if (currentUser.role === 'Admin' || !item.subnav || !item.subnav.some(subItem => subItem.title === 'Users')) {
                            return <Submenu item={item} key={index} />;
                        } else {
                            return null;
                        }
                    })}
                </SidebarWrap>
            </SidebarNav>
        </IconContext.Provider>
    );
};

export default Sidebar;
