import { auth } from "@/auth";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signInUserWithGoogle } from "../actions";
import RegisterForm from "../components/RegisterForm";
const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	weight: "900",
});

async function RegistrationPage() {
	const session = await auth();
	if (session?.user) {
		redirect("/");
	}
	return (
		<div className="bg-[#F5F5F5] fixed top-0 left-0 w-screen bottom-0 flex items-center justify-center">
			<div className="w-full h-full px-8 py-2 md:w-140 md:px-20 md:h-auto lg:w-180 lg:px-30 lg:py-6 lg:h-auto 2xl:w-180 2xl:px-39 2xl:py-8.5 2xl:h-auto bg-white flex flex-col items-center justify-center gap-3  ">
				<p className={`${poppins.className} text-[32px] text-[#25324B]`}>Sign Up Today!</p>
				<form action={signInUserWithGoogle} className="w-full">
					<button
						type="submit"
						className="flex items-center justify-center h-12.5 gap-3 rounded-md border border-[#CCCCF5] w-full"
					>
						<FcGoogle className="text-xl" />
						<p className="text-[#4640DE] text-[16px] font-bold cursor-pointer">Sign Up with Google!</p>
					</button>
				</form>
				<div className="flex gap-4 items-center justify-between w-full">
					<div className="w-full bg-[#D6DDEB] h-[1px]"></div>
					<p className="shrink-0 text-[#202430] font-normal text-[16px] opacity-50">Or Sign Up with Email</p>
					<div className="w-full bg-[#D6DDEB] h-[1px]"></div>
				</div>
				<RegisterForm />
				<div className="w-full flex gap-2">
					<p className="text-[#202430] text-[16px] font-normal opacity-70">Already have an account?</p>
					<Link href={"/login"} className="text-[#4640DE] text-[16px] font-semibold">
						Login
					</Link>
				</div>
				<p className="text-[#7C8493] text-[14px] font-normal w-full">
					By clicking &apos;Continue&apos;, you acknowledge that you have read and accepted our{" "}
					<span className="text-[#4640DE]">Terms of Service</span> and{" "}
					<span className="text-[#4640DE]">Privacy Policy.</span>
				</p>
			</div>
		</div>
	);
}
export default RegistrationPage;
