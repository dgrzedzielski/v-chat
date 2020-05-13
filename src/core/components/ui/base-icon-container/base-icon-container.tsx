import React from 'react';
import clsx from 'clsx';
import { Avatar } from '@material-ui/core';
import { Children } from 'core/common-types';
import './base-icon-container.scss';

type BaseIconContainerProps = {
  children: Children;
  color?: 'primary' | 'secondary' | 'default';
};

const BaseIconContainer: React.FC<BaseIconContainerProps> = ({
  children,
  color = 'secondary',
}) => {
  return (
    <Avatar
      className={clsx('base-icon-container', {
        'base-icon-container--primary': color === 'primary',
        'base-icon-container--secondary': color === 'secondary',
      })}
    >
      {children}
    </Avatar>
  );
};

export default BaseIconContainer;
