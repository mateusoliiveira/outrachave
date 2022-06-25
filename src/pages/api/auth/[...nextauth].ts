import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ApiClient, ApiServer } from "../../../_services"
import { clientURL, serverURLApi } from "../../../lib/api"
import axios from "axios"
import { signIn } from "next-auth/react"

export default NextAuth({
  providers: [
    Credentials({
      type: 'credentials',
      async authorize(credentials: any, req): Promise<any> {
        let {
          data,
          status
        } = await
            ApiClient
              .post("/guests/login", credentials)
        if (status === 200) {
          return {
            email: credentials?.username,
            user: data.user.name,
            token: data.token
            //userRole: user.admin ? 'admin' : false,
          }
        }
        return null
      },
      credentials: {

      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      //user?.userRole === 'admin' ? token.userRole = 'admin' : false
      user?.token != undefined ? token.token = user.token : false
      return token
    },
    async redirect({ url }) {
      url = clientURL
      return url
    },
  },
  pages: {
    error: '/login',
    signOut: '/',
  },
})
