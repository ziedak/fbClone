import NextAuth from "next-auth";
// import Providers from 'next-auth/providers'

const tenantName = process.env.B2C_AUTH_TENANT_NAME;
const loginFlow = process.env.B2C_LOGIN_FLOW_NAME;
const maxAge = Number(process.env.CLIENT_SESSION_MAX_AGE);
const jwtSecret = process.env.NEXTAUTH_JWT_SECRET;
const appSecret = process.env.NEXTAUTH_APP_SECRET;
const clientId = process.env.B2C_AUTH_CLIENT_ID;
const clientSecret = process.env.B2C_AUTH_CLIENT_SECRET;
const apiAccessClaim = process.env.B2C_API_ACCESS_CLAIM;
const signingKey = process.env.NEXTAUTH_SIGNING_KEY;
const encryptionKey = process.env.NEXTAUTH_ENCRYPTION_KEY;
const encryption = process.env.NEXTAUTH_ENCRYPT_JWT;

const tokenUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${loginFlow}/oauth2/v2.0/token`;

const options = {
	session: {
		jwt: true,
		maxAge,
	},
	jwt: {
		secret: jwtSecret,
		encryption,
		signingKey,
		encryptionKey,
	},
	secret: appSecret,
	pages: {
		signOut: "/auth/signout",
	},
	providers: [
		{
			id: "azureb2c",
			name: "Azure B2C",
			type: "oauth",
			version: "2.0",
			debug: true,
			scope: `https://${tenantName}.onmicrosoft.com/api/${apiAccessClaim} offline_access openid`,
			params: {
				grant_type: "authorization_code",
			},
			accessTokenUrl: tokenUrl,
			requestTokenUrl: tokenUrl,
			authorizationUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${loginFlow}/oauth2/v2.0/authorize?response_type=code+id_token+token&response_mode=form_post`,
			profileUrl: "https://graph.microsoft.com/oidc/userinfo",
			profile: (profile) => {
				console.debug("\n");
				console.debug("~~ PROFILE", profile);
				console.debug("\n");

				// The NextAuth `user` object available to the client
				return {
					id: profile.oid,
					name: `${profile.given_name} ${profile.family_name}`,
					email: profile.emails.length ? profile.emails[0] : null,
					image: undefined,
				};
			},
			clientId,
			clientSecret,
			idToken: true,
			state: false,
		},
	],
	callbacks: {
		// eslint-disable-next-line no-unused-vars
		jwt: async (token, user, account, profile, isNewUser) => {
			const now = parseInt(Date.now() / 1000, 10);
			const tokenExpiryPaddingSeconds = 30;
			const isSignIn = !!user;

			// Add auth_time to token on signin in
			if (isSignIn) {
				// eslint-disable-next-line no-param-reassign
				token.b2c = {
					accessToken: account.accessToken,
					refreshToken: account.refreshToken,
					iat: profile.iat,
					exp: profile.exp,
				};
			}

			console.debug(
				"\n Token expires / refreshes in: ",
				token.b2c.exp - now,
				" / ",
				token.b2c.exp - tokenExpiryPaddingSeconds - now
			);

			/**
			 * Add some extra seconds to refresh before it is completely expired to avoid
			 * any edge case scenarios where the token expires in transit if it is almost
			 * expired, but validated prior to an API call, and then sent in the
			 * Authorization header and expires.
			 */
			if (token.b2c.exp - tokenExpiryPaddingSeconds < now) {
				const refreshQuery = `?grant_type=refresh_token&refresh_token=${token.b2c.refreshToken}&scope=https://${tenantName}.onmicrosoft.com/api/${apiAccessClaim} offline_access openid&client_id=${process.env.B2C_AUTH_CLIENT_ID}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&client_secret=${process.env.B2C_AUTH_CLIENT_SECRET}`;
				const response = await fetch(`${tokenUrl}${refreshQuery}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				});

				try {
					const result = await response.json();

					// eslint-disable-next-line no-param-reassign
					token.b2c = {
						accessToken: result.access_token,
						refreshToken: result.refresh_token,
						iat: result.not_before,
						exp: result.expires_on,
					};
				} catch (e) {
					console.error("There was an error trying to refresh the accessToken");
					console.error(e);
				}
			}

			return Promise.resolve(token);
		},
	},
};

export default (req, res) => NextAuth(req, res, options);
