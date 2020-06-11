import React, { ReactElement } from 'react';

import './MenuIcon.scss';

interface Props {
  collapsed: boolean;
}

export const MenuIcon = ({ collapsed }: Props): ReactElement => {
  return (
    <div className={`menu-icon ${collapsed && 'collapsed'}`}>
      <span className="menu-icon-line"></span>
      <span className="menu-icon-line"></span>
      <span className="menu-icon-line"></span>
    </div>
  );
};
