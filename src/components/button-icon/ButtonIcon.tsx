import React, {
  ReactElement,
  PropsWithChildren,
  DetailedHTMLProps,
  ButtonHTMLAttributes,
} from 'react';

import './ButtonIcon.scss';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface Props extends PropsWithChildren<ButtonProps> {
  className?: string;
}

export const ButtonIcon = ({ children, className, ...props }: Props): ReactElement => {
  return (
    <button className={`button-icon ${className}`} {...props}>
      {children}
    </button>
  );
};
