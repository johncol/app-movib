import React, { ReactElement, PropsWithChildren } from 'react';
import { MdDone, MdErrorOutline } from 'react-icons/md';

import './Alert.scss';

interface Props {
  when?: boolean;
  type: string;
  title: string;
}

enum TYPES {
  info = 'info',
  error = 'error',
}

export const Alert = (props: PropsWithChildren<Props>): ReactElement | null => {
  const { type, title, children, when = true } = props;
  if (!when) {
    return null;
  }

  return (
    <div className={`custom-alert ${classForType(type)}`}>
      <div className="custom-alert-icon">
        {type === TYPES.info && <MdDone />}
        {type === TYPES.error && <MdErrorOutline />}
      </div>

      <div className="custom-alert-content">
        <h4 className="custom-alert-title">{title}</h4>
        <section>{children}</section>
      </div>
    </div>
  );
};

const classForType = (type: string) => {
  return type === TYPES.info ? 'info' : type === TYPES.error ? 'error' : '';
};
