
import React, { useContext } from 'react';
import { KeyOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { CurrentChangePasswordContext } from '@/context/auth/currentChangePasswordSteps';
import { useMediaQuery } from 'react-responsive';

const StepsChangePassword: React.FC<{isMobile: boolean}> = ({isMobile}: {isMobile: boolean}) => {
  const { current } = useContext(CurrentChangePasswordContext);
  const isMiniMobile = useMediaQuery({ minWidth: "532px" });

  return (
      <Steps
        style={{
            height: isMobile ? "50px":"200px",
            width: isMobile ? "100%":"30%",
        }}
        size='small'
        current={current}
        direction={isMobile ? "horizontal":"vertical"}
        responsive={false}
        items={[
          {
            title: isMiniMobile ? 'Email':"",
            icon: <UserOutlined />,
          },
          {
            title: isMiniMobile ? 'Verification':"",
            icon: <SolutionOutlined />,
          },
          {
            title: isMiniMobile ? 'Change':"",
            icon: <KeyOutlined />,
          },
          {
            title: isMiniMobile ? 'Done':"",
            icon: <SmileOutlined />,
          },
        ]}
      />
    );
  }

export default StepsChangePassword;