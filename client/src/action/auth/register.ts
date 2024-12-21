"use server"

import { IUser } from "@/types/next-auth";
import { sendRequest } from "@/util/api";

const handleRegister = async(data: any) => {
    const r = await sendRequest<IBackendRes<IDataRes>>({
        url: `${process.env.URL_BACKEND}/auth/register`,
        body: data,
        method: "POST"
    })
    return r;
}

export default handleRegister;