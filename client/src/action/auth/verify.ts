"use server"

import { sendRequest } from "@/util/api";

export const handleRefreshCodeVerify = async(email: string) => {
    const r = await sendRequest<IBackendRes<null>>({
        url: `${process.env.URL_BACKEND}/auth/updateCodeActive`,
        body: {
            email
        },
        method: "PUT"
    })
    return r;
};

const handleSendCodeVerify = async(email: string, code: string) => {
    const r = await sendRequest<IBackendRes<null>>({
        url: `${process.env.URL_BACKEND}/auth/activeAccount`,
        body: {
            email,
            code
        },
        method: "PUT"
    })
    return r;
};

export default handleSendCodeVerify;