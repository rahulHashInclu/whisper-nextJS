'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if(status === 'unauthenticated'){
      router.push('/signin');
    }
    else if(status === 'authenticated'){
      router.push('/upload');
    }
  },[status, router]);

  return <div>Loading...</div>;
}
