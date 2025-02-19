import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SIGN_IN, BASE_PATH } from "@/helper/constants";

export const authOptions = {
    basePath: "/whisper/api/auth",
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                try{
                    console.log('Attempting to authenticate...', credentials.email);
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
                    console.log("USER OBJECT AUTH config/...", user);
                    if(response?.ok && user?.access_token) {
                        return user;
                    }
                    else{
                        alert('Login failed')
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
        async jwt({token, user}){
            if(user){
                token.accessToken = user.access_token;
            }
            return token;
        },
        async session({session, token}){
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: '/signin',
        error: '/signin',
    },
    debug: true 
}

const handler = NextAuth(authOptions);

// For App Router, must export like this:
export { handler as GET, handler as POST };