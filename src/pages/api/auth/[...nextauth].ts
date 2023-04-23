import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import {JWT} from "next-auth/jwt";
import {useUserLogin} from "@/fetchApi/userRequest/userLogin";
const jwt = require('jsonwebtoken')

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Username", type: "text", placeholder: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const userLogin = useUserLogin();
                if (!credentials) {
                    return null
                }
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const user = await userLogin(credentials)
                    .then(res => res.json())
                    .catch(err => {
                        console.log(err)
                        return null
                    })
                const validationJWT = await jwt.verify(
                    user.token,
                    process.env.JWT_SECRET,
                    function(err:any, decoded:any) {
                        return err?{err: 'JWT Error'}:decoded
                })
                return validationJWT.err?null:user
            }
        })
    ],
    callbacks: {
        async jwt({token, user}: { token: JWT, user: any }) {
            return token
        },
        async session({session, token}: { session: any, token: JWT })
        {
            return {...session, ...token};
        },
        async redirect({url, baseUrl}:{url:string, baseUrl:string}) {
            return url
        }
    },
    secret:process.env.NEXT_PUBLIC_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/credentials-signin',
    },
    site: process.env.NEXTAUTH_URL
}

// @ts-ignore
export default NextAuth(authOptions)

