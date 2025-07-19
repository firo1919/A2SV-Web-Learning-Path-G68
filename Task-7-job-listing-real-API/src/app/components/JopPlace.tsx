interface Props {
	readonly opType: string;
}

function JopPlace({ opType }: Props) {
	const variants = {
		inPerson: "bg-green-100 text-[#56CDAD]",
		virtual: "bg-purple-100 text-purple-500",
	};
	return (
		<div
			className={`${
				variants[opType as keyof typeof variants] || "bg-gray-100 text-gray-400"
			} text-[12px] font-semibold w-[76px] h-full flex items-center justify-center rounded-full`}
		>
			{opType}
		</div>
	);
}
export default JopPlace;
