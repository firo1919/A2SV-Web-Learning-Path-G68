interface Props {
	readonly skill: string;
}

function Skill({ skill }: Props) {
	return <div className="bg-[#F8F8FD] text-[#2D298E] font-normal text-[16px] px-3 py-1">{skill}</div>;
}
export default Skill;
