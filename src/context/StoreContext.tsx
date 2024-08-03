import React, { createContext, useContext, ReactNode } from 'react';
import { createRootStore, RootStoreType } from '../mobx_stores/RootStore';
import { useUser } from './UserContext';

const StoreContext = createContext<RootStoreType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const userContext = useUser();
  const rootStore = createRootStore(userContext);

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): RootStoreType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
