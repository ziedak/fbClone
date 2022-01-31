import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { app, db, storage } from "../../firebase";

import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const InputBox = () => {
	const { data: session } = useSession();
	const inputRef = useRef(null);
	const filePickerRef = useRef(null);

	const [imageToPost, setImageToPost] = useState(null);

	const sendPost = async (e) => {
		e.preventDefault();

		if (!inputRef.current.value) return;

		// try {
		const docRef = await addDoc(collection(db, "posts"), {
			message: inputRef.current.value,
			name: session.user.name,
			email: session.user.email,
			image: session.user.image,
		}).then((dc) => {
			if (imageToPost) {
				//upload imageToPost
				const uploadtask = ref(storage, `posts/${dc.id}`);
				uploadString(uploadtask, imageToPost, "data_url").then(
					() => {
						//on upload complete

						const storageRef = ref(storage, `posts/${dc.id}`);

						getDownloadURL(storageRef).then(async (url) => {
							console.log("url", url);

							let postRef = doc(db, "posts", dc.id);

							// Set the "imageUrl" field of the post
							await updateDoc(postRef, {
								postImage: url,
							});

							console.log(postRef);
						});
					},
					(error) => console.log("Error upload image: ", error)
				);
				removeImage();
			}
		});
		//console.log("Document written with ID: ", docRef.id);
		// }
		// catch (e) {
		// 	console.error("Error adding document: ", e);
		// }

		inputRef.current.value = "";
	};

	const AddImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			setImageToPost(readerEvent.target.result);
		};
	};

	const removeImage = () => {
		setImageToPost(null);
	};

	return (
		<div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
			<div className="flex space-x-4 p-4 items-center">
				<Image
					className="rounded-full"
					src={session.user.image}
					width={40}
					height={40}
					layout="fixed"
				/>
				<form className="flex flex-1">
					<input
						ref={inputRef}
						className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
						type="text"
						placeholder={`Whats on your mind ${session.user.name}`}
					/>
					<button hidden onClick={(e) => sendPost(e)}></button>
				</form>

				{imageToPost && (
					<div
						className="flex flex-col hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
						onClick={(e) => removeImage()}
					>
						<img className="h-10 object-contain" src={imageToPost} alt="" />
						<p className="text-xs text-rose-500 text-center">Remove</p>
					</div>
				)}
			</div>

			<div className="flex justify-evenly p-3 border-t">
				<div className="inputIcon">
					<VideoCameraIcon className="h-7 text-rose-500 " />
					<p className="text-xs sm:text-sm xl:text-base">Live Video</p>
				</div>
				<div
					className="inputIcon"
					onClick={() => filePickerRef.current.click()}
				>
					<CameraIcon className="h-7 text-green-400" />
					<p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
					<input
						ref={filePickerRef}
						type="file"
						hidden
						onChange={(e) => AddImageToPost(e)}
					/>
				</div>
				<div className="inputIcon">
					<EmojiHappyIcon className="h-7 text-yellow-300" />
					<p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
				</div>
			</div>
		</div>
	);
};

export default InputBox;
