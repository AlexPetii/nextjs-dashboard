"use server";

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import {sql} from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import { getUser } from './app/lib/data';
import bcrypt from 'bcrypt';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

async function getUsername(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user: ', error);
        throw new Error('Failed to fetch user.')
    }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
            .object({email: z.string().email(), password: z.string().min(6)}) 
            .safeParse(credentials);
            
            if(parsedCredentials.success){
                const {email, password} = parsedCredentials.data;
                const user = await getUser(email);
                if(!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);

                if(passwordsMatch) return user;
            }

            console.log('Invalid credentails');
            return null;
        },
    }),
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
});
