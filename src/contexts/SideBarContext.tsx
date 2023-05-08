import { createContext, Dispatch, SetStateAction } from 'react';

interface SideBarContextType {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SideBarContext = createContext<SideBarContextType | undefined>(
  undefined,
);
