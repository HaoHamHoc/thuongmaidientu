import { Button, Flex } from "antd";
import { SmileOutlined } from '@ant-design/icons';
import { green } from '@ant-design/colors'
import { CloseModalContext } from "@/context/auth/closeModalDoneChangePassword.context";
import { useContext } from "react";
import { CurrentChangePasswordContext } from "@/context/auth/currentChangePasswordSteps";

const Done: React.FC = () => {
    const { closeModal } = useContext(CloseModalContext);
    const { setCurrent } = useContext(CurrentChangePasswordContext);

    const handleDoneChangePassword: ()=>void = () => {
        setCurrent(0);
        closeModal();
    }

    return (
        <Flex vertical justify="space-evenly" align="center" 
            style={{
                height: "100%"
            }}
        >
            <span
                style={{
                    fontSize: "1.6rem",
                    color: green.primary,
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            ><SmileOutlined style={{
                fontSize: "2rem",
                margin: "0 5px"
            }}/>Change password successfully</span>
            <div
                 style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    padding: "0 10px"
                }}
            >
                <Button type="primary" onClick={()=>handleDoneChangePassword()}>
                    Close
                </Button>
            </div>
        </Flex>
    );
}

export default Done;