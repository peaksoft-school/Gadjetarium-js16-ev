import React, { useState } from 'react';
import { styled } from '@mui/system';
import { SUBMENUS } from '../../utils/constants/index';

const PopUp = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleMenuClick = (menuKey) => {
    setActiveMenu(prev => (prev === menuKey ? null : menuKey));
    setActiveItem(null);
  };

  const handleSubMenuClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Wrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveMenu(null);
        setActiveItem(null);
      }}
    >
      <Trigger>Администратор ▼</Trigger>

      {isHovered && (
        <MenuContainer>
          <MainMenu>
            {Object.keys(SUBMENUS).map((menuKey) => (
              <MenuItem key={menuKey} onClick={() => handleMenuClick(menuKey)}>
                <Text $active={activeMenu === menuKey}>{menuKey}</Text>
              </MenuItem>
            ))}
          </MainMenu>

          {activeMenu && (
            <SubMenu>
              {SUBMENUS[activeMenu].map((item) => (
                <MenuItem key={item} onClick={() => handleSubMenuClick(item)}>
                  <Text $active={activeItem === item}>{item}</Text>
                </MenuItem>
              ))}
            </SubMenu>
          )}
        </MenuContainer>
      )}
    </Wrapper>
  );
};

export default PopUp;

// Styled components
const Wrapper = styled('div')({
  position: 'relative',
  display: 'inline-block',
});

const Trigger = styled('div')({
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '10px 14px',
  cursor: 'pointer',
  backgroundColor: '#f5f5f5',
  userSelect: 'none',
});

const MenuContainer = styled('div')({
  position: 'absolute',
  top: 0,
  left: '100%',
  display: 'flex',
  backgroundColor: 'white',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  borderRadius: '6px',
  overflow: 'hidden',
  zIndex: 999,
  marginLeft: '8px',
});

const MainMenu = styled('ul')({
  listStyle: 'none',
  margin: 0,
  padding: '8px 0',
  minWidth: '200px',
});

const SubMenu = styled(MainMenu)({
  borderLeft: '1px solid #eee',
  backgroundColor: '#fafafa',
});

const MenuItem = styled('li')({
  padding: '10px 16px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'background 0.2s ease',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const Text = styled('span')(({ $active }) => ({
  color: $active ? 'hotpink' : '#333',
  fontWeight: $active ? 'bold' : 'normal',
}));
