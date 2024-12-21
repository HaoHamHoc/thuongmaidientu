import React, { useContext } from 'react';
import { KeyOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import { CurrentChangePasswordContext } from '@/context/auth/currentChangePasswordSteps';

const StepsChangePassword: React.FC = () => {
  const { current } = useContext(CurrentChangePasswordContext);

  return (
      <Steps
        style={{
            height: "200px",
            width: "30%",
        }}
        size='small'
        current={current}
        direction="vertical"
        items={[
          {
            title: 'Email',
            icon: <UserOutlined />,
          },
          {
            title: 'Verification',
            icon: <SolutionOutlined />,
          },
          {
            title: 'Change password',
            icon: <KeyOutlined />,
          },
          {
            title: 'Done',
            icon: <SmileOutlined />,
          },
        ]}
      />
    );
  }

export default StepsChangePassword;