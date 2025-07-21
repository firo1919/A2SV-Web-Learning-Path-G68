function RegisterForm() {
	return (
		<div className="w-full">
			<form className="flex flex-col gap-5.5">
				<div className="flex flex-col gap-1">
					<label htmlFor="fullname" className="text-[#515B6F] text-[16px] font-semibold">
						Full Name
					</label>
					<input
						type="text"
						id="fullname"
						className="w-full border border-[#D6DDEB] rounded-[7px] py-3 px-4"
						placeholder="Enter your full name"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-[#515B6F] text-[16px] font-semibold" htmlFor="email">
						Email Address
					</label>
					<input
						type="text"
						className="w-full border border-[#D6DDEB] rounded-[7px] py-3 px-4"
						id="email"
						placeholder="Enter email address"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-[#515B6F] text-[16px] font-semibold" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						className="w-full border border-[#D6DDEB] rounded-[7px] py-3 px-4"
						id="password"
						placeholder="Enter password"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-[#515B6F] text-[16px] font-semibold" htmlFor="confirm-password">
						Confirm Password
					</label>
					<input
						type="text"
						className="w-full border border-[#D6DDEB] rounded-[7px] py-3 px-4"
						id="confirm-password"
						placeholder="Enter password"
					/>
				</div>
				<button className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-600 py-3 px-6 rounded-[80px] text-white font-bold text-[16px] cursor-pointer">
					Continue
				</button>
			</form>
		</div>
	);
}
export default RegisterForm;
