import { getSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed/Feed";
import Header from "../components/Header/Header";
import Login from "../components/Login";
import Sidebar from "../components/sideBar/Sidebar";
import Widgets from "../components/widgets/Widgets";

const Home = (props) => {
	console.log("props", props);
	if (!props.session) return <Login />;

	return (
		<div className="h-screen bg-gray-100 overflow-hidden">
			<Head>
				<title>Facebook Clone</title>
			</Head>
			{/* header */}
			<Header />
			<main className="flex">
				{/* sidebar */}
				<Sidebar />

				{/* feed */}
				<Feed />

				{/* widgets */}
				<Widgets />
			</main>
		</div>
	);
};

export async function getServerSideProps(context) {
	//Get User

	const session = await getSession(context);
	console.log("session", session);
	// Pass data to the page via props
	return { props: { session } };
}
export default Home;
