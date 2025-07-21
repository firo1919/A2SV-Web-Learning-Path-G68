import { Poppins } from "next/font/google";
import Link from "next/link";
import SignInForm from "../components/SignInForm";

const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	weight: "900",
});
function LoginPage() {
	return (
		<div className="bg-[#F5F5F5] fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
			<div className="w-180 h-212.5 bg-white flex flex-col items-center justify-center gap-6 px-39 py-8.5">
				<p className={`${poppins.className} text-[32px] text-[#25324B]`}>Welcome Back!</p>
				<div className="flex gap-4 items-center justify-between w-full">
					<div className=" bg-[#D6DDEB] h-[1px] flex-1/4"></div>
					<p className=" grow"></p>
					<div className=" bg-[#D6DDEB] h-[1px] flex-1/4"></div>
				</div>
				<SignInForm />
				<div className="w-full flex gap-2">
					<p className="text-[#202430] text-[16px] font-normal opacity-70">Dont have an account?</p>
					<Link href={"/register"} className="text-[#4640DE] text-[16px] font-semibold">
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
}
export default LoginPage;
