"use client"

import React, { useContext } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Row, Col, Button, Form, Input, Divider, notification } from 'antd';
import Link from 'next/link';
import handleRegister from '@/action/auth/register';
import { EmailUserVerifyContext } from '@/context/auth/emailUserVerify.context';
import { useRouter } from 'next/navigation';
import checkSpaceInputRegister, { isValidEmail, isValidPassword } from '@/check/auth/register';

const Register: React.FC<IBackendRes<IDataRes>> = () => {
    const router = useRouter();

    const { setEmail } = useContext(EmailUserVerifyContext);

    function capitalizeFirstLetter(val: string) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const onFinish = async(input: IRegisterInput) => {
    if(input.password !== input.confirmpassword){
         notification.error({
            message: "Error",
            description: "Confirm password is not correct",
            duration: 3
        });
    }else{
        let res: IBackendRes<IDataRes> = await handleRegister(input);
        if(+res?.statusCode === 200){
            notification.success({
                message: "Success",
                description: "Register success",
                duration: 3
            });

            if(res?.data?.user?.email) {
                setEmail(res?.data?.user?.email);
                router.push("/auth/verify");
            }
        }else{
            if(typeof res?.message === "string"){
                notification.error({
                    message: "Error",
                    description: res?.message,
                    duration: 3
                })
            }else{
                 notification.error({
                    message: "Error",
                    description: capitalizeFirstLetter(res?.message[0]),
                    duration: 3
                })
            }
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
                >Sign up</legend>
                <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                 <div
                    style={{ display: 'flex', justifyContent: "space-between" }}
                 >
                     <Form.Item
                        name="firstname"
                        rules={[
                            { required: true, message: 'Please input your Firstname!'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!checkSpaceInputRegister(getFieldValue("firstname"))) {
                                        return Promise.reject('Invalid information, please remove extra spaces!');
                                    }
                                    return Promise.resolve();
                                },
                            })
                        ]}
                        style={{ display: 'inline-block', width: 'calc(35%)' }}
                    >
                        <Input placeholder="Firstname" />
                    </Form.Item>
                        <Form.Item
                        name="surname"
                        rules={[
                            { required: true, message: 'Please input your Surname!'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!checkSpaceInputRegister(getFieldValue("surname"))) {
                                        return Promise.reject('Invalid information, please remove extra spaces!');
                                    }
                                    return Promise.resolve();
                                },
                            })
                        ]}
                        style={{ display: 'inline-block', width: 'calc(60%)' }}
                    >
                        <Input placeholder="Surname" />
                    </Form.Item>
                </div>
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
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your Password!' },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!isValidPassword(getFieldValue('password'))) {
                                    return Promise.reject('Password must contain at least 8 characters and include lowercase letters, uppercase letters, numbers, special characters and no spaces');
                                }
                                return Promise.resolve();
                            },
                        })
                    ]}
                >
                    <Input.Password type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="confirmpassword"
                    rules={[
                        { required: true, message: 'Please input your Re-Password!' },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (getFieldValue('confirmpassword') !== getFieldValue('password')) {
                                    return Promise.reject('Password and Confirm password do not match!');
                                }
                                return Promise.resolve();
                            },
                        })
                    ]}
                >
                    <Input.Password type="password" placeholder="Confirm password" />
                </Form.Item>
                <Form.Item>
                    <Link href={"/"} 
                    ><ArrowLeftOutlined />back to home page</Link>
                    <Button block type="primary" htmlType="submit"
                         style={{
                            marginTop: "10px"
                        }}
                    >
                    Sign up
                    </Button>
                </Form.Item>
                <Divider style={{
                    marginBottom: 0
                }}/>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                            Already have an account?<Link href="/auth/login">Login now!</Link>
                    </div>
                </Form>
                </fieldset>
            </Col>
        </Row>
    </>
  );
};

export default Register;