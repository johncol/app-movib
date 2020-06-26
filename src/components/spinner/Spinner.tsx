import React, { ReactElement } from 'react';

import './Spinner.scss';

interface Props {
  when?: boolean;
}

export const Spinner = ({ when = true }: Props): ReactElement | null => {
  if (!when) {
    return null;
  }

  return (
    <div className="lds-default spinner">
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
