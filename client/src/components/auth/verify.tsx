"use client"

import { Button, Checkbox, Col, Divider, Flex, Form, Input, notification, Row } from 'antd';
import { ArrowRightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import { EmailUserVerifyContext } from '@/context/auth/emailUserVerify.context';
import { handleRefreshCodeVerify } from '@/action/auth/verify';
import { blue } from '@ant-design/colors'
import handleSendCodeVerify from '@/action/auth/verify';
import { useRouter } from 'next/navigation';

const Verify: React.FC = () => {
    const [isHoverRefresh, setIsHoverRefresh] = useState<boolean>(false);
    const onMouseOver = () => setIsHoverRefresh(true);
    const onMouseOut = () => setIsHoverRefresh(false);

    const router = useRouter();

    const { email } = useContext(EmailUserVerifyContext);

    const onFinish = async(values: {code: string}) => {
        let res = await handleSendCodeVerify(email, values.code);
        if(+res?.statusCode === 200){
            notification.success({
                message: "Success",
                description: res?.message,
                duration: 3
            });
            router.push("/auth/login");
        }else{
            notification.error({
                message: "Error",
                description: res?.message,
                duration: 3
            });
        }
    };

    const onRefreshCodeVerify = async() => {
        let res: IBackendRes<null> = await handleRefreshCodeVerify(email);
        if(+res?.statusCode === 200){
            notification.success({
                message: "Success",
                description: res?.message,
                duration: 3
            });
        }else{
            notification.error({
                message: "Error",
                description: res?.message,
                duration: 3
            });
        }
    }

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
                >Verify account</legend>
                <Form
                    name="verify"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <p
                        style={{
                            margin: "5px 0",
                            fontSize: "1.5rem",
                            color: "#555"
                        }}
                    >
                        Check code verify at '{email || "abc@gmail.com"}'
                    </p>
                    <Form.Item
                    name="code"
                    rules={[
                        { required: true, message: 'Please input your Username!' },
                    ]}
                >
                    <Input placeholder="Enter your code" />
                </Form.Item>
                <Form.Item>
                    <span
                        style={{
                            color: blue.primary,
                            cursor: "pointer",
                            opacity: isHoverRefresh ? 0.5:1
                        }}

                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}

                        onClick={()=>onRefreshCodeVerify()}
                    ><ArrowRightOutlined />Resend code</span>
                    <Button block type="primary" htmlType="submit"
                         style={{
                            marginTop: "10px"
                        }}
                    >
                        Send code
                    </Button>
                </Form.Item>
                <Divider style={{
                    marginBottom: 0
                }}/>
                </Form>
                </fieldset>
            </Col>
        </Row>
    </>
  );
}

export default Verify;