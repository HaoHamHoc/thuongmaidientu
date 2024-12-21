"use server"

import { signIn } from "@/auth"

const handleLogin = async(email: string, password: string) => {
    try{
        const r = await signIn("credentials",{
            email: email,
            password: password,
            redirect: false
        });

        return r;
    }catch(err){
        console.log("Err:",err);
        if((err as any)?.name === "InvalidEmailPasswordError"){
            return{
                err: (err as any)?.type,
                code: 1
            }
        }else if((err as any)?.name === "CallbackRouteError"){
            return{
                err: "Server Error",
                code: 2
            }
        }else if((err as any)?.name === "AccountIsNotActive"){
             return{
                err: (err as any)?.type,
                code: 3
            }
        }else{
            return {
                err: (err as any)?.type,
                code: 0
            };
        }
    
    }
}

export default handleLogin;