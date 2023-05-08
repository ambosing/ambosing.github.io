import { FunctionComponent } from 'react';
import useViewportHeight from 'hooks/useViewportHeight';

const ViewportHeightSetter: FunctionComponent = () => {
  useViewportHeight();
  return null;
};

export default ViewportHeightSetter;
