"use client";
import { Poppins } from "next/font/google";
import { useState } from "react";
import OTPInput from "react-otp-input";

const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	weight: "900",
});

function VerificationPage() {
	const [otp, setOtp] = useState("");

	return (
		<div className="bg-[#F5F5F5] fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
			<div className="w-180 h-212.5 bg-white flex flex-col items-center justify-center gap-11.5 px-39 py-8.5">
				<p className={`${poppins.className} text-[32px] text-[#25324B]`}>Verify Email</p>
				<p className="text-[#7C8493] text-[16px] font-normal">
					We&apos;ve sent a verification code to the email address you provided. To complete the verification
					process, please enter the code here.
				</p>
				<OTPInput
					value={otp}
					shouldAutoFocus
					onChange={setOtp}
					numInputs={4}
					renderInput={(props) => <input {...props} />}
					placeholder="0000"
					containerStyle="w-full flex gap-[35px] justify-between items-center"
					inputStyle="border-3 border-[#4640DE66] rounded-sm bg-[#F8F8FD] grow h-12.5 font-medium text-[#D6DDEB] text-[34px] focus:outline-none focus:border-blue-700"
				/>
				<p className="text-[#7C8493] text-[16px] font-normal">You can request to Resend code in 0:30</p>
				<button className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-600 py-3 px-6 rounded-[80px] text-white font-bold text-[16px] cursor-pointer">
					Continue
				</button>
			</div>
		</div>
	);
}
export default VerificationPage;
