import React, { ReactElement } from 'react';

import './HugeMessage.scss';

interface Props {
  threeWordsMessage?: string;
  line1?: string;
  line2?: string;
  line3?: string;
}

export const HugeMessage = ({ threeWordsMessage, line1, line2, line3 }: Props): ReactElement => {
  const [one, two, three] = (() => {
    if (threeWordsMessage) {
      return threeWordsMessage.split(' ');
    } else {
      return [line1, line2, line3];
    }
  })();

  return (
    <div className="huge-message">
      <p className="huge-message-content">
        <span>{one}</span>
        <strong>{two}</strong>
        <span>{three}</span>
      </p>
    </div>
  );
};
