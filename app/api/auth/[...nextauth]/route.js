import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { supabase } from "@/lib/db"
import { secret } from "@aws-amplify/backend"

const authOptions = {
    // theme: {
    //     colorScheme: "auto", // "auto" | "dark" | "light"
    //     brandColor: "", // Hex color code
    //     logo: "", // Absolute URL to image
    //     buttonText: "" // Hex color code
    // },
    session: {strategy: 'jwt'},
    secret: secret('NEXTAUTH_SECRET'),
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
            clientSecret: secret('GITHUB_SECRET'),
        }),
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        })
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
