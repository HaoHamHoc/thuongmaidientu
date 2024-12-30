import { Flex } from "antd";
import StepsChangePassword from "./forgotPassword/stepsChangePassword";
import FormChangePassword from "./forgotPassword/formChangePassword";
import { useState } from "react";
import EmailUserChangePasswordContextProvider from "@/context/auth/emailUserChangePassword.context";

const ForgotPassword: React.FC = () => {
    return(
        <EmailUserChangePasswordContextProvider>
                <div>
                    <Flex>
                        <StepsChangePassword />
                        <FormChangePassword />
                    </Flex>
                </div>
        </EmailUserChangePasswordContextProvider>
    );
}

export default ForgotPassword;