import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
const MyApp = ({ Component, pageProps }) => {
	// Use the layout defined at the page level, if available
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<SessionProvider session={pageProps.session}>
			{/* <Component {...pageProps} /> */}
			{getLayout(<Component {...pageProps} />)}
		</SessionProvider>
	);
};

export default MyApp;
