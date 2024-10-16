import { dbConnect } from '@/db/db_config'
import Admin from '@/models/Admin'
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
      async authorize(credentials) {
        try {
          await dbConnect()

          const existAdmin = await Admin.findOne({ email: credentials?.email }).select('+password')

          if (existAdmin === null) throw new Error('User not found')
          const isValidPassword = await bcrypt.compare(credentials.password, existAdmin.password)
          if (!isValidPassword) throw new Error('Invalid password')

          return {
            username: existAdmin.username,
            email: existAdmin.email,
            superAdmin: existAdmin.role,
            _id: existAdmin._id
          }
        } catch (error) {
          console.log({ error })
          throw new Error('Error authenticating')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      try {
        session.user = token
        return session
      } catch (error) {
        return null
      }
    }
  },
  pages: {
    signIn: '/auth/admin'
  }
})

export { handler as GET, handler as POST }