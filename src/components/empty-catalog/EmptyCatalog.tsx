import React, { ReactElement } from 'react';

import './EmptyCatalog.scss';

export const EmptyCatalog = (): ReactElement => {
  return (
    <div className="empty-catalog">
      <p className="empty-catalog-message">No movies here</p>
    </div>
  );
};
