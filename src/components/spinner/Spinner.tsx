import React, { ReactElement } from 'react';

import './Spinner.scss';

interface Props {
  when?: boolean;
  className?: string;
}

export const Spinner = ({ when = true, className }: Props): ReactElement | null => {
  if (!when) {
    return null;
  }

  return (
    <div className={`lds-default spinner ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
