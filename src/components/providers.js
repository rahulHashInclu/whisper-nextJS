'use client'

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { BASE_PATH } from "@/helper/constants";
import { TimelineProvider } from "@/context/audioContext";

export default function Providers({children}){
    const sessionBasepath = `${BASE_PATH}/api/auth`
    return(
        <SessionProvider basePath={sessionBasepath}>
        <TimelineProvider>
        <Toaster position="bottom-right" />
        {children}
        </TimelineProvider>
        </SessionProvider>
    )
}