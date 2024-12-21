import handleChangePassword from "@/action/auth/changePassword";
import { CurrentChangePasswordContext } from "@/context/auth/currentChangePasswordSteps";
import { EmailUserChangePasswordContext } from "@/context/auth/emailUserChangePassword.context";
import { Button, Form, Input, notification } from "antd";
import { useContext } from "react";

const ChangePassword: React.FC = () => {
    const { email } = useContext(EmailUserChangePasswordContext);
    const { setCurrent } = useContext(CurrentChangePasswordContext);

    const onFinish = async(values: {password: string}) => {
        const res: IBackendRes<null>= await handleChangePassword(email, values.password);

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
                    >Enter your new password</span>
                </Form.Item>
                <Form.Item
                    name="password"
                     rules={
                        [
                            { required: true, message: 'Please input your Password!' },
                            { min: 8, message: 'Password must be longer than or equal to 8 characters'}
                        ]
                    }
                >
                     <Input type="password" placeholder="Input your new password" />
                </Form.Item>
                 <Form.Item
                    name="confirm-password"
                     rules={[
                        { required: true, message: 'Please input your confirm password!' },
                        ({getFieldValue}) => ({
                        validator(_, value) {
                            if (getFieldValue('confirm-password') !== getFieldValue('password')) {
                                return Promise.reject('Password and Confirm password do not match!');
                            }
                            return Promise.resolve();
                        },
                        })
                    ]}
                >
                     <Input type="password" placeholder="Input your confirm new password" />
                </Form.Item>
                <Form.Item>
                     <Button type="primary" htmlType="submit">Send</Button>
                </Form.Item>
                
            </Form>
        </>
    );
}

export default ChangePassword;