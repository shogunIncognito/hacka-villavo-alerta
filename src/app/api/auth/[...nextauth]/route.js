import { dbConnect } from '@/db/db_config'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password', placeholder: '*********' }
      },
      async authorize (credentials) {
        try {
          await dbConnect()

          const existUser = await User.findOne({ email: credentials?.email }).select('+password')
          console.log({ existUser }); // llega pass?
          
          if (existUser === null) throw new Error('User not found')

          const isValidPassword = await bcrypt.compare(credentials.password, existUser.password)
          if (!isValidPassword) throw new Error('Invalid password')

          return {
            username: existUser.username,
            email: existUser.email,
            superAdmin: existUser.role,
            _id: existUser._id
          } 
        } catch (error) {
          console.log({ error })
          throw new Error('Error authenticating')
        }
      }
    })
  ],
  callbacks: {
    async jwt ({ token, user }) {
      return { ...token, ...user }
    },
    async session ({ session, token }) {
      try {
        session.user = token
        return session
      } catch (error) {
        return null
      }
    }
  },
  pages: {
    signIn: '/auth/'
  }
})

export { handler as GET, handler as POST }