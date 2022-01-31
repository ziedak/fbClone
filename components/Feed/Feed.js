import InputBox from "./InputBox";
import Stories from "./Stories";
import Posts from "./Posts";
const Feed = () => {
	return (
		<div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
			<div className="mx-auto max-w-md  md:max-w-lg lg:maw-w-2xl">
				{/* Strories */}
				<Stories />
				{/* InputBox */}
				<InputBox />
				{/* Posts */}
				<Posts />
			</div>
		</div>
	);
};

export default Feed;
