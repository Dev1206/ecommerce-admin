import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const adminEmails=['devkakadiya12@gmail.com'];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  
  adapter:MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks :{
    session: ({session,token,user}) => {
      if(adminEmails.includes(session?.user?.email)){
        return session;
      }
      else{
        return false;
      }
    },
  },
  
}

export default NextAuth(authOptions);

export async function isAdminRequest(req,res){
  const session = await getServerSession(req,res,authOptions);
  if(!adminEmails.includes(session?.user?.email)){
    res.status(401);
    res.end();
    throw 'Not authorized';
  }
}
