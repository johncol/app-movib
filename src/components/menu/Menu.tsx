import React, { ReactElement, useState } from 'react';

import './Menu.scss';

interface Props {}

export const Menu = (props: Props): ReactElement => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <nav className={`menu ${collapsed && 'collapsed'}`}>
      <button onClick={() => setCollapsed((collapsed) => !collapsed)} className="menu-button">
        <MenuIcon />
      </button>
      <div className="menu-options">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem totam, optio architecto
        quibusdam libero fuga maiores, similique debitis alias omnis labore molestias consectetur
        ipsam odio quia laudantium expedita incidunt ea.
      </div>
    </nav>
  );
};

const MenuIcon = (): ReactElement => {
  return (
    <svg width="30" height="30">
      <path
        fill="#eb3a8e"
        d="M31,0L1,0C0.4,0 0,0.4 0,1S0.4,2 1,2L31,2C31.6,2 32,1.6 32,1S31.6,0 31,0zM24,6L1,6C0.4,6 0,6.4 0,7S0.4,8 1,8L24,8C24.6,8 25,7.6 25,7S24.6,6 24,6zM1,14L17,14C17.6,14 18,13.6 18,13S17.6,12 17,12L1,12C0.4,12 0,12.4 0,13S0.4,14 1,14zM20,18L1,18C0.4,18 0,18.4 0,19S0.4,20 1,20L20,20C20.6,20 21,19.6 21,19S20.6,18 20,18zM18,24L1,24C0.4,24 0,24.4 0,25S0.4,26 1,26L18,26C18.6,26 19,25.6 19,25S18.6,24 18,24z"
      ></path>
    </svg>
  );
};
