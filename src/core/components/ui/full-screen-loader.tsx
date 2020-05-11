import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

type FullScreenLoaderProps = {
  debounce?: number;
};

const FullScreenLoader: React.FC<FullScreenLoaderProps> = () => (
  <div className="view view--centered">
    <CircularProgress size={100} color="primary" />
  </div>
);

export default FullScreenLoader;
