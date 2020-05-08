import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Children } from 'core/common-types';
import Link from '@material-ui/core/Link';

type BaseLinkProps = {
  children: Children;
  to: string;
};

const BaseLink: React.FC<BaseLinkProps> = ({ children, to }) => (
  <Link to={to} variant="body2" component={RouterLink}>
    {children}
  </Link>
);

export default BaseLink;
