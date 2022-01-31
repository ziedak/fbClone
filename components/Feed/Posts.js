import {
	collection,
	getDocs,
	getDocsFromServer,
	getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { app, db } from "../../firebase";
import { getApp } from "firebase/compat/app";
import Post from "./Post";
const Posts = () => {
	// const [value, loading, error] = useCollection(collection(db, "posts"), {
	// 	snapshotListenOptions: { includeMetadataChanges: true },
	// });

	const [psts, setpsts] = useState([]);
	useEffect(async () => {
		const querySnapshot = await getDocs(collection(db, "posts"));
		// .then(
		// 	(docc) => {
		// 		console.log("docc", docc);
		// 		setpsts(docc);
		// 	}
		// );
		const dc = [];
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
			console.log(doc.data());
			dc.push(doc.data());
		});
		setpsts(dc);
	}, []);

	console.log("psts", psts);
	return (
		<div>
			{/* {error && <strong>Error: {JSON.stringify(error)}</strong>}
			{loading && <span>Collection: Loading...</span>}
			{value && console.log(value)} */}

			{psts.map((post, idx) => (
				<Post key={idx} post={post} />
			))}
		</div>
	);
};

export default Posts;
