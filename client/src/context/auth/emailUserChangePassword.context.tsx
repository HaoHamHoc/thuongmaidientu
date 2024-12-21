"use client"

import React, {useState} from 'react';

export interface IEmailUserChangePasswordContext {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const DEFAULT_EMAIL: IEmailUserChangePasswordContext = {
    email: "",
    setEmail: () => {},
};

export const EmailUserChangePasswordContext = React.createContext<IEmailUserChangePasswordContext>(DEFAULT_EMAIL)

const EmailUserChangePasswordContextProvider: React.FC<{ children: React.ReactNode }> = ({children})=> {
  const [email, setEmail] = useState<string>("");

  const values: IEmailUserChangePasswordContext = React.useMemo(
        () => ({
            email,
            setEmail,
        }),
        [email, setEmail],
    );

  return <EmailUserChangePasswordContext.Provider value={values}>{children}</EmailUserChangePasswordContext.Provider>;
};

export default EmailUserChangePasswordContextProvider