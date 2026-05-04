import BookmarkForm from "@/components/shared/bookmark-form";
import { getTags } from "@/server/tag";

export const generateMetadata = () => {
	return {
		title: `Add`,
	};
};

const AddPage = async () => {
	const dataTag = await getTags();
	return (
		<>
			<BookmarkForm dataTag={dataTag} />
		</>
	);
};

export default AddPage;
