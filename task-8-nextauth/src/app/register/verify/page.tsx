"use client";
import { useResendOtpMutation, useVerifyUserMutation } from "@/app/store/features/api/authSlice";
import { useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import OTPInput from "react-otp-input";
import { useTimer } from "react-timer-hook";
import { toast, ToastContainer } from "react-toastify";

const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	weight: "900",
});

function VerificationPage() {
	const email = useSearchParams().get("email");
	const { data: session } = useSession();
	if (session?.user || !email) {
		redirect("/");
	}

	const router = useRouter();
	const [otp, setOtp] = useState("");
	const [verifyUser, { isLoading }] = useVerifyUserMutation();
	const [resendOtp] = useResendOtpMutation();
	const [retryOtp, setRetryOtp] = useState(false);
	const [newOtp, setNewOtp] = useState(false);

	const expiryTimestamp = new Date();
	expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + 5);
	const { minutes, seconds, restart } = useTimer({ expiryTimestamp, onExpire: () => setRetryOtp(true) });

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		const newOtp = {
			email: email || "",
			OTP: otp,
		};
		console.log(newOtp);
		try {
			const response = await verifyUser(newOtp).unwrap();
			console.log(response);
			if (response.success) {
				router.push("/login");
			} else {
				toast("response.message", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
			}
		} catch (error) {
			toast("Wrong Otp", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
			console.log("error occured", error);
			setOtp("0000");
		}
	}

	async function handleResendOtp() {
		setNewOtp(true);
		const resend = {
			email: email || "",
		};

		try {
			const response = await resendOtp(resend).unwrap();
			console.log(response);
		} catch (error) {
			toast("Couldnt generate new otp", {
				draggable: false,
				theme: "colored",
				hideProgressBar: true,
				type: "error",
			});
			console.log("error occured", error);
			setOtp("0000");
		}
		setRetryOtp(false);
		const newTime = new Date();
		newTime.setMinutes(newTime.getMinutes() + 5);
		restart(newTime);
		setNewOtp(false);
	}

	return (
		<div className="bg-[#F5F5F5] fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
			<div className="w-180 h-212.5 bg-white flex flex-col items-center justify-center gap-11.5 px-39 py-8.5">
				<p className={`${poppins.className} text-[32px] text-[#25324B]`}>Verify Email</p>
				<p className="text-[#7C8493] text-[16px] font-normal">
					We&apos;ve sent a verification code to the email address you provided. To complete the verification
					process, please enter the code here.
				</p>
				<form onSubmit={handleSubmit} className="relative flex flex-col gap-11.5 w-full items-center">
					<OTPInput
						value={otp}
						inputType="number"
						shouldAutoFocus
						onChange={setOtp}
						numInputs={4}
						renderInput={(props) => <input {...props} />}
						placeholder="0000"
						containerStyle="w-full flex gap-[35px] justify-between items-center"
						inputStyle="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-3 border-[#4640DE66] rounded-sm bg-[#F8F8FD] grow h-12.5 font-medium text-[#D6DDEB] text-[34px] focus:outline-none focus:border-blue-700"
					/>
					{retryOtp ? (
						<button
							type="button"
							onClick={handleResendOtp}
							className="w-full bg-gray-900 hover:bg-gray-950 active:bg-gray-800 py-3 px-6 rounded-[80px] text-white font-bold text-[16px] cursor-pointer"
						>
							Resend Otp
						</button>
					) : (
						<>
							<p className="text-[#7C8493] text-[16px] font-normal">
								You can request to Resend code in{" "}
								<span className="text-blue-700">{`${minutes}:${seconds}`}</span>
							</p>
							<button
								type="submit"
								disabled={retryOtp}
								className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-600 py-3 px-6 rounded-[80px] text-white font-bold text-[16px] cursor-pointer"
							>
								Continue
							</button>
						</>
					)}

					<ToastContainer />
					{(isLoading || newOtp) && (
						<div
							className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center
                                bg-white opacity-50"
						>
							<ImSpinner2 className="text-7xl animate-spin" />
						</div>
					)}
				</form>
			</div>
		</div>
	);
}
export default VerificationPage;
