interface Props {
	readonly category: string;
}

function Category({ category }: Props) {
	const variants = {
		Marketing: "text-[#FFB836] bg-[#EB85331A]",
		Design: "text-[#56CDAD] bg-[#56CDAD1A]",
		IT: "bg-red-200 text-red-600",
		Development: "bg-green-200 text-green-600 ",
		Art: "bg-orange-200 text-orange-600",
		"Data Science": "bg-purple-200 text-purple-600",
		Analytics: "bg-pink-200 text-pink-600",
		"Customer Service": "bg-blue-200 text-blue-600",
		Support: "bg-amber-200 text-amber-600",
	};
	return (
		<div
			className={`${
				variants[category as keyof typeof variants] || "bg-gray-200 text-gray-600"
			} font-semibold text-[12px] py-1.5 px-2.5 rounded-full min-w-14 text-center`}
		>
			{category}
		</div>
	);
}
export default Category;
