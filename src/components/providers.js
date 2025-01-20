'use client'

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { BASE_PATH } from "@/helper/constants";

export default function Providers({children}){
    const sessionBasepath = `${BASE_PATH}/api/auth`
    return(
        <SessionProvider basePath={sessionBasepath}>
            <Toaster position="bottom-right" />
            {children}
        </SessionProvider>
    )
}