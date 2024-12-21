import { Flex } from "antd";
import StepsChangePassword from "./forgotPassword/stepsChangePassword";
import FormChangePassword from "./forgotPassword/formChangePassword";
import CurrentChangePasswordContextProvider from "@/context/auth/currentChangePasswordSteps";
import { useState } from "react";
import EmailUserChangePasswordContextProvider from "@/context/auth/emailUserChangePassword.context";

const ForgotPassword: React.FC = () => {
    const [current, setCurrent] = useState<number>(0);

    return(
        <EmailUserChangePasswordContextProvider>
            <CurrentChangePasswordContextProvider current={current} setCurrent={setCurrent}>
                <div>
                    <Flex>
                        <StepsChangePassword />
                        <FormChangePassword />
                    </Flex>
                </div>
            </CurrentChangePasswordContextProvider>
        </EmailUserChangePasswordContextProvider>
    );
}

export default ForgotPassword;