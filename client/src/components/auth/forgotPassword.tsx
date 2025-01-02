import { Flex } from "antd";
import StepsChangePassword from "./forgotPassword/stepsChangePassword";
import FormChangePassword from "./forgotPassword/formChangePassword";
import EmailUserChangePasswordContextProvider from "@/context/auth/emailUserChangePassword.context";
import { useMediaQuery } from "react-responsive";

const ForgotPassword: React.FC = () => {
    const isMobile = useMediaQuery({ maxWidth: "740px" });
    const isTablet = useMediaQuery({ maxWidth: "1023px", minWidth: "740px" });
    const isDesktop = useMediaQuery({ minWidth: "1023px" });

    console.log(isMobile, isTablet, isDesktop);

    return(
        <EmailUserChangePasswordContextProvider>
                <div>
                    <Flex vertical={isMobile}>
                        <StepsChangePassword isMobile={isMobile}/>
                        <FormChangePassword />
                    </Flex>
                </div>
        </EmailUserChangePasswordContextProvider>
    );
}

export default ForgotPassword;