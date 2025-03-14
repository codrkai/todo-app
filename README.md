
### Todo App with Supabase DB and Google Auth

##### NextJS v14
##### Supabase
##### Google Auth

### Installation and Setup

```bash
npm install
npm run dev
```

##### RENAME .env.example TO .env.local
    when deploying to Vercel or AWS, don't upload the .env file, you will need to import environment variables into the Vercel/AWS hosting settings

##### NEXTAUTH_SECRET
    generate a secret key using this command:
    npx auth secret
    or
    openssl rand -base64 32

##### GITHUB/GOOGLE KEYS
    Sign into your Github or Google account and navigate to the Developer Settings

##### SUPABASE DATABASE
    Sign into Supabase and set up your database. Get the Database URL and Service Role Key.
    Database connection file is located in: /lib/db.js

##### DATABASE TABLES
    users (id, email)
    items (item_id, user_id, content)

    SQL CODES:
    CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL UNIQUE
    )

    CREATE TABLE IF NOT EXISTS items (
        item_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users (id),
        content TEXT
    )

##### next.config.mjs (Allowed domains for images. Update as needed.)
    lh3.googleusercontent.com
    avatars.githubusercontent.com
    www.gravatar.com
    images.unsplash.com

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##### Screenshot
<img src="/public/screenshot.jpg" alt="Todo App Screenshot">

##### Demo
https://nextjs-14-todo-app.vercel.app/