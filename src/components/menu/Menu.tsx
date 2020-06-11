import React, { ReactElement, useState } from 'react';

import { MenuIcon } from './menu-icon/MenuIcon';

import './Menu.scss';

export const Menu = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <nav className={`menu ${collapsed && 'collapsed'}`}>
      <button onClick={() => setCollapsed((collapsed) => !collapsed)} className="menu-button">
        <MenuIcon collapsed={collapsed} />
      </button>
      <div className="menu-options">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem totam, optio architecto
        quibusdam libero fuga maiores, similique debitis alias omnis labore molestias consectetur
        ipsam odio quia laudantium expedita incidunt ea.
      </div>
    </nav>
  );
};
