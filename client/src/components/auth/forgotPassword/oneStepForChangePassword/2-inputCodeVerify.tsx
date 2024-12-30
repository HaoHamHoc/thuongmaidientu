import { handleSendCodeChangePassword, handleSendEmailToGetCode } from "@/action/auth/changePassword";
import { CurrentChangePasswordContext } from "@/context/auth/currentChangePasswordSteps";
import { EmailUserChangePasswordContext } from "@/context/auth/emailUserChangePassword.context";
import { Button, Flex, Form, Input, notification } from "antd";
import { useContext, useState } from "react";
import { SendOutlined, RollbackOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import { ArrowRightOutlined } from '@ant-design/icons';

const InputCodeVerify: React.FC = () => {
    const [isHoverRefresh, setIsHoverRefresh] = useState<boolean>(false);
    const onMouseOver = () => setIsHoverRefresh(true);
    const onMouseOut = () => setIsHoverRefresh(false);

    const { email } = useContext(EmailUserChangePasswordContext);
    const { setCurrent } = useContext(CurrentChangePasswordContext);

    const returnToStep1 = () => setCurrent(0);

    const onFinish = async(values: {code: string}) => {
        const res: IBackendRes<null>= await handleSendCodeChangePassword(email, values.code);

        if(res?.statusCode === 200 ){
            notification.success({
                message: "Success",
                description: res.message,
                duration: 3
            });
            setCurrent(pre=>pre+1);
        }else{
            notification.error({
                message: "Error",
                description: res.message,
                duration: 3
            });
        }
    };

    const onRefreshCodeChangePassword = async() => {
        const res: IBackendRes<null>= await handleSendEmailToGetCode(email);
        
        if(res?.statusCode === 200 ){
            notification.success({
                message: "Success",
                description: res.message,
                duration: 3
            });
        }else{
            notification.error({
                message: "Error",
                description: res.message,
                duration: 3
            });
        }
    }

    return (
        <>
            <Form
                name="send-code"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item>
                    <span
                        style={{
                            fontSize: "1.6rem"
                        }}
                    >Enter your code verify to change password</span>
                </Form.Item>
                <Form.Item
                    name="code"
                >
                        <Input placeholder="Input your code" />
                </Form.Item>
                <Form.Item noStyle>
                    <p
                        style={{
                            color: blue.primary,
                            cursor: "pointer",
                            margin: "10px 0",
                            opacity: isHoverRefresh ? 0.5:1
                        }}

                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}

                        onClick={()=>onRefreshCodeChangePassword()}
                ><ArrowRightOutlined />Resend code</p>
                </Form.Item>
                <Form.Item noStyle>
                    <Flex justify="space-between">
                        <Button type="primary" htmlType="submit"><SendOutlined />Send</Button>
                        <Button type="primary" danger onClick={returnToStep1}><RollbackOutlined style={{fontSize: "20px"}} />Return to step 1</Button>
                    </Flex>
                </Form.Item>
            </Form>
        </>
    );
}

export default InputCodeVerify;