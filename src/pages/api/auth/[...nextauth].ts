import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ApiClient } from "../../../_services"
import { clientURL } from "../../../lib/api"

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
            userRole: data.user.role === 1 ? 'admin' : false,
            email: data.user.email,
            user: data.user.name,
            token: data.token,
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
      user?.userRole === 'admin' ? token.userRole = 'admin' : false
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
