import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const FullScreenLoader: React.FC = () => (
  <div className="view view--centered">
    <CircularProgress size={100} color="primary" />
  </div>
);

export default FullScreenLoader;
