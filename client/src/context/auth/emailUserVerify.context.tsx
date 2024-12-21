"use client"

import React, {useState} from 'react';

export interface IEmailUserVerifyContext {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const DEFAULT_EMAIL: IEmailUserVerifyContext = {
    email: "",
    setEmail: () => {},
};

export const EmailUserVerifyContext = React.createContext<IEmailUserVerifyContext>(DEFAULT_EMAIL)

const EmailUserVerifyContextProvider: React.FC<{ children: React.ReactNode }> = ({children})=> {
  const [email, setEmail] = useState<string>("");

  const values: IEmailUserVerifyContext = React.useMemo(
        () => ({
            email,
            setEmail,
        }),
        [email, setEmail],
    );

  return <EmailUserVerifyContext.Provider value={values}>{children}</EmailUserVerifyContext.Provider>;
};

export default EmailUserVerifyContextProvider;