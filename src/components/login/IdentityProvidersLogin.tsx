import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import { EXTERNAL_LINK } from '../../constants/external-links';

export const IdentityProvidersLogin = (): ReactElement => {
  const redirectToSSO = (): void => {
    window.location.href = EXTERNAL_LINK.SocialSignOn;
  };

  return (
    <div className="identity-providers-login">
      <Button variant="primary" size="lg" type="button" block onClick={redirectToSSO}>
        Social Sign On
      </Button>
    </div>
  );
};
