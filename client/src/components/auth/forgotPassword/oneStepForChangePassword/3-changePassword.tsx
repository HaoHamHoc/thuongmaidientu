import handleChangePassword from "@/action/auth/changePassword";
import { isValidPassword } from "@/check/auth/register";
import { CurrentChangePasswordContext } from "@/context/auth/currentChangePasswordSteps";
import { EmailUserChangePasswordContext } from "@/context/auth/emailUserChangePassword.context";
import { Button, Flex, Form, Input, notification } from "antd";
import { useContext } from "react";
import { SendOutlined, RollbackOutlined } from '@ant-design/icons';

const ChangePassword: React.FC = () => {
    const { email } = useContext(EmailUserChangePasswordContext);
    const { setCurrent } = useContext(CurrentChangePasswordContext);

    const returnToStep1 = () => setCurrent(0);

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
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!isValidPassword(getFieldValue('password'))) {
                                        return Promise.reject('Password must contain at least 8 characters and include lowercase letters, uppercase letters, numbers, special characters and no spaces');
                                    }
                                    return Promise.resolve();
                                },
                            })
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
                <Flex justify="space-between">
                    <Form.Item noStyle>
                        <Button type="primary" htmlType="submit"><SendOutlined />Send</Button>
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button type="primary" danger onClick={returnToStep1}><RollbackOutlined style={{fontSize: "20px"}} />Return to step 1</Button>
                    </Form.Item>
                </Flex>
                
            </Form>
        </>
    );
}

export default ChangePassword;