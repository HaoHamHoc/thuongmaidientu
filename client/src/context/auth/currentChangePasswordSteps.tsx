"use client"

import React, {useState} from 'react';

export interface ICurrentChangePasswordContext {
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

const DEFAULT_CURRENT: ICurrentChangePasswordContext = {
    current: 0,
    setCurrent: () => {},
};

export const CurrentChangePasswordContext = React.createContext<ICurrentChangePasswordContext>(DEFAULT_CURRENT)

const CurrentChangePasswordContextProvider: React.FC<{ 
    children: React.ReactNode,
    current: number,
    setCurrent: React.Dispatch<React.SetStateAction<number>>
}> = ({children, current, setCurrent})=> {

  const values: ICurrentChangePasswordContext = React.useMemo(
        () => ({
            current,
            setCurrent,
        }),
        [current, setCurrent],
    );

  return <CurrentChangePasswordContext.Provider value={values}>{children}</CurrentChangePasswordContext.Provider>;
};

export default CurrentChangePasswordContextProvider