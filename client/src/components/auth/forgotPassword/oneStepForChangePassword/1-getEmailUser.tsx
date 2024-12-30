import { handleSendEmailToGetCode } from "@/action/auth/changePassword";
import { isValidEmail } from "@/check/auth/register";
import { CurrentChangePasswordContext } from "@/context/auth/currentChangePasswordSteps";
import { EmailUserChangePasswordContext } from "@/context/auth/emailUserChangePassword.context";
import { Button, Form, Input, notification } from "antd";
import { useContext, useState } from "react";
import { SendOutlined } from '@ant-design/icons';

const GetEmailUser: React.FC = () => {
    const { setEmail } = useContext(EmailUserChangePasswordContext);
    const { setCurrent } = useContext(CurrentChangePasswordContext);

    const onFinish = async(values: {email: string}) => {
        const res: IBackendRes<null>= await handleSendEmailToGetCode(values.email);

        if(res?.statusCode === 200 ){
            notification.success({
                message: "Success",
                description: res.message,
                duration: 3
            });
            setEmail(values.email);
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
                name="send-email"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item>
                    <span
                        style={{
                            fontSize: "1.6rem"
                        }}
                    >Enter your email to get verify code</span>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!isValidEmail(getFieldValue('email'))) {
                                    return Promise.reject('Invalid email address');
                                }
                                return Promise.resolve();
                            },
                        })
                    ]}
                >
                     <Input placeholder="Input your email" />
                </Form.Item>
                <Form.Item>
                    <Button 
                        type="primary"
                        htmlType="submit"
                    >
                        <SendOutlined />
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default GetEmailUser;

