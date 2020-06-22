import React, { ReactElement } from 'react';

import './EmptyCatalog.scss';

export const EmptyCatalog = (): ReactElement => {
  return (
    <div className="empty-catalog">
      <p className="empty-catalog-message">
        <span>No</span>
        <strong>movies</strong>
        <span>here</span>
      </p>
    </div>
  );
};
