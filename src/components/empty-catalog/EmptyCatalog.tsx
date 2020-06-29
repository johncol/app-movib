import React, { ReactElement } from 'react';
import { HugeMessage } from '../huge-message/HugeMessage';

export const EmptyCatalog = (): ReactElement => {
  return <HugeMessage threeWordsMessage="No movies here" />;
};
