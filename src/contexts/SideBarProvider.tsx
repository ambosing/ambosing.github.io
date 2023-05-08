import React, { useState, FunctionComponent, ReactNode } from 'react';
import { SideBarContext } from './SideBarContext';

type ProviderProps = {
  children: ReactNode;
};

const SideBarProvider: FunctionComponent<ProviderProps> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <SideBarContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
