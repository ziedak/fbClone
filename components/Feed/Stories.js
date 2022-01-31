import React from "react";
import StoryCard from "./StoryCard";

const storiesList = [
	{
		name: "jef Bezaz",
		src: "https://links.papareact.com/k2j",
		profile: "https://links.papareact.com/xql",
	},
	{
		name: "Mark Zuck",
		src: "https://links.papareact.com/xql",
		profile: "https://links.papareact.com/k2j",
	},
	{
		name: "jef Bezaz",
		src: "https://links.papareact.com/k2j",
		profile: "https://links.papareact.com/xql",
	},
	{
		name: "Mark Zuck",
		src: "https://links.papareact.com/xql",
		profile: "https://links.papareact.com/k2j",
	},
	{
		name: "jef Bezaz",
		src: "https://links.papareact.com/k2j",
		profile: "https://links.papareact.com/xql",
	},
];

const Stories = () => {
	return (
		<div className="flex justify-center space-x-3 mx-auto">
			{storiesList.map((story, id) => (
				<StoryCard
					key={id}
					name={story.name}
					src={story.src}
					profile={story.profile}
				/>
			))}
		</div>
	);
};

export default Stories;
