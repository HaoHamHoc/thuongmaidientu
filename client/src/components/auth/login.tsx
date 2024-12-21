"use client"

import React, { useContext, useState } from 'react';
import { LockOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col, Button, Checkbox, Form, Input, Flex, Divider, notification, message } from 'antd';
import Link from 'next/link';
import handleLogin from '@/action/auth/login';
import { useRouter } from 'next/navigation';
import { blue } from '@ant-design/colors'
import MyModal from '../all/modal';
import ForgotPassword from './forgotPassword';
import CloseModalContextProvider from '@/context/auth/closeModalDoneChangePassword.context';
import { EmailUserVerifyContext } from '@/context/auth/emailUserVerify.context';

const Login: React.FC = () => {
    const [isHoverRefresh, setIsHoverRefresh] = useState<boolean>(false);
    const onMouseOver = () => setIsHoverRefresh(true);
    const onMouseOut = () => setIsHoverRefresh(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { setEmail } = useContext(EmailUserVerifyContext);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const router = useRouter() 
  const onFinish = async(values: ILoginInput) => {
    const res = await handleLogin(values.email, values.password);

    if(!res?.err){
        message.success({
            content: "Login success",
            duration: 3

        });
        router.push("/");
    }else{
         notification.error({
            message: "Error",
            description: res.err,
            duration: 3
        });

        if(res?.code === 3){
            setEmail(values.email);
            router.push("/auth/verify")
        }
    }
  };

  return (
    <>
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8} span={12}>
            <fieldset
                 style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}
            >
                <legend
                    style={{
                        fontSize: "20px", 
                        fontWeight: "500"
                    }}
                >Login</legend>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Username!' },
                        { min: 8, message: 'Password must be longer than or equal to 8 characters'}
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
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
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                        <Button type='text'
                            style={{
                                background: "none",
                                color: isHoverRefresh ? blue.primary:"#000"
                            }}
                            onMouseOver={onMouseOver}
                            onMouseOut={onMouseOut}
                            onClick={()=>{
                                setIsModalOpen(true);
                            }}
                        >
                            Forgot password?
                        </Button>
                    </Flex>
                </Form.Item>
                <Form.Item>
                    <Link href={"/"} 
                    ><ArrowLeftOutlined />back to home page</Link>
                    <Button block type="primary" htmlType="submit"
                         style={{
                            marginTop: "10px"
                        }}
                    >
                    Log in
                    </Button>
                </Form.Item>
                <Divider style={{
                    marginBottom: 0
                }}/>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                            You don't have an account?<Link href="/auth/register">Register now!</Link>
                    </div>
                </Form>
                </fieldset>
            </Col>
        </Row>
        <MyModal
            title='Change your password'
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
        >
            <CloseModalContextProvider closeModal={handleCancel}>
                <ForgotPassword/>
            </CloseModalContextProvider>
        </MyModal>
    </>
  );
};

export default Login;