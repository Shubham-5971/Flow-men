import React, { useState} from 'react';
import { Box,Typography, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { AddMembers, Members, UserDetails } from './utility';

const Component = styled(Box)`
  margin-top: 9%;
  margin-left: 1%;
  justify-content: center;
  height: auto;
  margin-bottom: 2% !important;
`;

const Header = styled(Box)`
  margin: 3%;
  border-bottom: 2px solid lightgray;
`;

const MidSection = styled(Box)`
  margin: 3%;
`;

const Navbar = styled(Box)`
  display: flex;
  gap: 30px;
  color: gray;
  margin-top: 2%;
`;

const NavItem = styled(Typography)`
  cursor: pointer;
  position: relative;
  ${(props) => props.isActive ? `
    color: #333;
    font-weight: 600;
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #333;
    }
  `:""}
`;

const navItems = ["User details", "Members", "Add Member"];

function Setting() {
  const location = useLocation();
  const initialSelectedItem = navItems[location.state?.selectedItem ]|| navItems[0]; 
  // console.log(initialSelectedItem)

  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Component>
      <Header>
        <Typography sx={{ fontSize: 30, fontWeight: 600 }}>Settings</Typography>
        <Navbar>
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              isActive={selectedItem === item}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </NavItem>
          ))}
        </Navbar>
      </Header>
      <MidSection>
        {
          selectedItem === "User details" ? <UserDetails /> : selectedItem === "Members" ? <Members />
            : <Box sx={{ justifyContent: 'center', display: 'flex' }}><AddMembers /></Box>
        }
      </MidSection>
    </Component>
  );
}

export default Setting;
