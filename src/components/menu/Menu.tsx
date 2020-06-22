import React, { ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { MenuIcon } from './menu-icon/MenuIcon';
import { options, MenuOption } from '../../constants/menu-options';
import './Menu.scss';

export const Menu = (): ReactElement => {
  const [collapsed, setCollapsed] = useState(true);

  const toggle = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  return (
    <nav className={`menu ${collapsed && 'collapsed'}`}>
      <button onClick={toggle} className="menu-button" aria-label="Toggle Menu">
        <MenuIcon collapsed={collapsed} />
      </button>
      <div className="menu-options">
        <ul>
          {options.map((action: MenuOption) => (
            <li key={action.link}>
              <NavLink to={action.link} onClick={toggle}>
                {action.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
