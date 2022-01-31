import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
	secret: process.env.APP_SECRET,
	debug: true,
	// Configure one or more authentication providers
	providers: [
		FacebookProvider({
			clientId: process.env.FB_CLIENT_ID,
			clientSecret: process.env.FB_CLIENT_SECRET,
			state: false, // Disable the state feature
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		// ...add more providers here
		// CredentialsProvider({
		// 	name: "AppName",
		// 	credentials: {
		// 		email: {
		// 			label: "Email",
		// 			type: "text",
		// 			placeholder: "daveglow@foomail.com",
		// 		},
		// 		password: { label: "Password", type: "password" },
		// 	},
		// 	async authorize(credentials, req) {
		// 		const res = await fetch(process.env.CREDENTIALS_AUTH_URL, {
		// 			method: "POST",
		// 			body: JSON.stringify(credentials),
		// 			headers: { "Content-Type": "application/json" },
		// 		});
		// 		const user = await res.json();

		// 		if (res.ok && user) {
		// 			return user;
		// 		}
		// 		return null;
		// 	},
		// }),
	],
	// session: {
	// 	strategy: "jwt",
	// 	maxAge: 30 * 24 * 60 * 60, // 30 days
	// },
	// pages: {
	// 	signIn: "/signin",
	// 	signOut: "/signin",
	// 	error: "/signin",
	// },
});
