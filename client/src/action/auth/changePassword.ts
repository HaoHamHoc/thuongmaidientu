"use server"

import { sendRequest } from "@/util/api";

export const handleSendEmailToGetCode = async(email: string) => {
    const r = await sendRequest<IBackendRes<null>>({
        url: `${process.env.URL_BACKEND}/auth/getCodeChangePassword`,
        body: {
            email
        },
        method: "POST"
    })
    return r;
};

export const handleSendCodeChangePassword = async(email: string, code: string) => {
    const r = await sendRequest<IBackendRes<null>>({
        url: `${process.env.URL_BACKEND}/auth/checkCodeChangePassword`,
        body: {
            email,
            code
        },
        method: "PUT"
    })
    return r;
};

const handleChangePassword = async(email: string, password: string) => {
    const r = await sendRequest<IBackendRes<null>>({
        url: `${process.env.URL_BACKEND}/auth/changePassword`,
        body: {
            email,
            password
        },
        method: "PUT"
    })
    return r;
};

export default handleChangePassword;