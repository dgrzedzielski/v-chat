import React from 'react';
import FullScreenLoader from './full-screen-loader';

type DelayedFullScreenLoaderProps = {
  debounce: number;
};

const DelayedFullScreenLoader: React.FC<DelayedFullScreenLoaderProps> = ({
  debounce,
}) => {
  const [shouldRender, setShouldRender] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShouldRender(true), debounce);

    return () => clearTimeout(timeout);
  });

  return <>{shouldRender && <FullScreenLoader />}</>;
};

export default DelayedFullScreenLoader;
