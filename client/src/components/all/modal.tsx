import React from 'react';
import { Modal } from 'antd';
import EmailUserChangePasswordContextProvider from '@/context/auth/emailUserChangePassword.context';
import CurrentChangePasswordContextProvider from '@/context/auth/currentChangePasswordSteps';

const MyModal: React.FC<{
    title: string,
    children: React.ReactNode,
    isModalOpen: boolean,
    handleCancel: ()=>void
}> = ({title, children, isModalOpen, handleCancel}) => {
  return (
    <>
      <Modal 
        width={700}
        title={title}
        open={isModalOpen} 
        maskClosable={false}
        footer={null}
        onCancel={handleCancel}
        centered={true}
        >
          {children}
      </Modal>
    </>
  );
};

export default MyModal;