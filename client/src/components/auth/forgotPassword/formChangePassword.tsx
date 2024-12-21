import React, { useContext, useState } from 'react';
import GetEmailUser from './oneStepForChangePassword/1-getEmailUser';
import InputCodeVerify from './oneStepForChangePassword/2-inputCodeVerify';
import ChangePassword from './oneStepForChangePassword/3-changePassword';
import Done from './oneStepForChangePassword/4-done';
import { CurrentChangePasswordContext } from '@/context/auth/currentChangePasswordSteps';


const FormChangePassword: React.FC = () => {
    const { current } = useContext(CurrentChangePasswordContext);
    
    return (
        <div
            style={{
                border: "1px solid #ccc",
                flex: 1,
                padding: "20px",
                borderRadius: "20px"
            }}
        >
            {
                current === 0
                &&
                <GetEmailUser />
            }
            {
                current === 1
                &&
                <InputCodeVerify />
            }
            {
                current === 2
                &&
                <ChangePassword />
            }
            {
                current === 3
                &&
                <Done />
            }
        </div>
    );
}

export default FormChangePassword;