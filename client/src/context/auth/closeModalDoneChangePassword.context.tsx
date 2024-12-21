"use client"

import React from 'react';

export interface ICloseModalContext {
    closeModal: ()=>void;
};

const DEFAULT_CLOSEMODAL: ICloseModalContext = {
    closeModal: ()=>{}
};

export const CloseModalContext = React.createContext<ICloseModalContext>(DEFAULT_CLOSEMODAL)

const CloseModalContextProvider: React.FC<{ 
    children: React.ReactNode,
    closeModal: ()=>void;
}> = ({children, closeModal})=> {

  const values: ICloseModalContext = React.useMemo(
        () => ({
            closeModal
        }),
        [closeModal],
    );

  return <CloseModalContext.Provider value={values}>{children}</CloseModalContext.Provider>;
};

export default CloseModalContextProvider