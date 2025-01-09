import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SIGN_IN } from "@/helper/constants";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                try{
                    const response = await fetch(SIGN_IN, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const user = await response.json();
                    if(response?.ok && user?.access_token) {
                        return user;
                    }
                    throw new Error('Login failed');
                }
                catch(err){
                    throw new Error('Authentication failed');
                }
            }
        })
    ],
    callbacks: {

    }
}