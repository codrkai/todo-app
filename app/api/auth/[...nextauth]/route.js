import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { supabase } from "@/lib/db"

const authOptions = {
    session: {strategy: 'jwt'},
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session}) {
            const { data, error } = await supabase.from('users').select('*').eq('email',session.user.email)

            // insert into db if email does not exist
            if (data.length < 1) {
                const { data, error } = await supabase.from('users').insert({email: session.user.email}).select()
                const user = data[0]
                session.user.id = user.id
            } else {
                const user = data[0]
                session.user.id = user.id
                if (error) {
                    console.log(error)
                }
            }
            
            return session
        }
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
