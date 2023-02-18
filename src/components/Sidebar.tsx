import React, { useEffect, useState } from 'react'
import { slide as Menu } from 'react-burger-menu';

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '25px',
    top: '20px'
  },
  bmBurgerBars: {
    background: '#1c1e33',
    height: '10%',
  },
  bmBurgerBarsHover: {
    background: '#1c1e33'
  },
  bmCrossButton: {
    height: '25px',
    width: '25px',
  },
  bmCross: {
    background: '#1c1e33'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    width: '400px',
    maxWidth: '60%'
  },
  bmMenu: {
    background: 'rgba(254, 254, 254, 255)',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    overflowY: 'hidden',
    textAlign: 'left'
  },
  bmMorphShape: {
    fill: '#ffffff'
  },
  bmItemList: {
    color: '#1c1e33',
    padding: '0.5em'
  },
  bmItem: {
    cursor: 'pointer',
    padding: '0.8em',
    textDecoration: 'none',
  },
  bmOverlay: {
    background: 'rgba(255, 255, 255, 0.2)',
    width: '100%'
  }
}

type SidebarProps = {
  target: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ target, setTarget, setStart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bmStyles, setBmStyles] = useState(styles);
  const largeWidth = 1400;
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  }
  const closeSideBar = () => {
    setIsOpen(false);
  }
  const selectMenu = (target: string) => {
    setTarget(target);
    setStart(false);
    window.history.replaceState(null,'',`/${target}`);
    setIsOpen(false);
  }
  return (
    <Menu styles={ bmStyles } right isOpen={isOpen} onOpen={handleIsOpen} onClose={closeSideBar}>
      <a className="menu-item"
        onClick={()=>{selectMenu('')}}
        onKeyDown={(e)=>{if (e.key === 'Enter') selectMenu('')}}
        style={target==='' ? {textDecoration: 'underline'} : {textDecoration: ''}}
      >
        Home
      </a>
      <a className="menu-item"
        onClick={()=>{selectMenu('plankton1')}}
        onKeyDown={(e)=>{if (e.key === 'Enter') selectMenu('plankton1')}}
        style={target==='plankton1' ? {textDecoration: 'underline'} : {textDecoration: ''}}
      >
        Plankton 1
      </a>
      <a className="menu-item"
        onClick={()=>{selectMenu('plankton2')}}
        onKeyDown={(e)=>{if (e.key === 'Enter') selectMenu('plankton2')}}
        style={target==='plankton2' ? {textDecoration: 'underline'} : {textDecoration: ''}}
      >
        Plankton 2
      </a>
    </Menu>
  )
}

export default Sidebar
