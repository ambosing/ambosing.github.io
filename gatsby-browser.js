import 'prismjs/themes/prism-tomorrow.css';
import React from 'react';
import SideBarProvider from './src/contexts/SideBarProvider';
import ViewportHeightSetter from './src/components/Common/ViewportHeightSetter';

export const wrapRootElement = ({ element }) => {
  return (
    <SideBarProvider>
      <ViewportHeightSetter />
      {element}
    </SideBarProvider>
  );
};
