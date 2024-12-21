import { handleSendCodeChangePassword } from "@/action/auth/changePassword";
import { CurrentChangePasswordContext } from "@/context/auth/currentChangePasswordSteps";
import { EmailUserChangePasswordContext } from "@/context/auth/emailUserChangePassword.context";
import { Button, Form, Input, notification } from "antd";
import { useContext } from "react";


const InputCodeVerify: React.FC = () => {
    const { email } = useContext(EmailUserChangePasswordContext);
    const { setCurrent } = useContext(CurrentChangePasswordContext);

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
                        <Button type="primary" htmlType="submit">Send</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default InputCodeVerify;