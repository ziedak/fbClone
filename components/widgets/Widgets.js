import {
	DotsHorizontalIcon,
	SearchIcon,
	VideoCameraIcon,
} from "@heroicons/react/solid";
import React from "react";
import Contacts from "./Contacts";

const contacts = [
	{
		src: "https://links.papareact.com/f0p",
		name: "zied",
	},
	{
		src: "https://links.papareact.com/f0p",
		name: "zied",
	},
	{
		src: "https://links.papareact.com/f0p",
		name: "zied",
	},
];
const Widgets = () => {
	return (
		<div className="hidden lg:flex flex-col w-60 p-2 mt-5">
			<div className="flex justify-between items-center text-gray-500 mb-5">
				<h2 className="text-xl">Contacts</h2>
				<div className="flex space-x-2">
					<VideoCameraIcon className="h-6" />
					<SearchIcon className="h-6" />
					<DotsHorizontalIcon className="h-6" />
				</div>
			</div>
			{contacts.map((contact, idx) => (
				<Contacts key={idx} contact={contact} />
			))}
		</div>
	);
};

export default Widgets;
