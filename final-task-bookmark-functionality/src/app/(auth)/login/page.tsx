import { Poppins } from "next/font/google";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signInUserWithGoogle } from "../../actions";
import SignInForm from "../../components/SignInForm";

const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	weight: "900",
});
function LoginPage() {
	return (
		<div className="w-full h-full px-8 py-6 md:w-140 md:px-20 md:h-auto lg:w-160 lg:px-30 lg:py-6 lg:h-auto 2xl:w-180 2xl:px-39 2xl:py-8.5 2xl:h-auto bg-white flex flex-col items-center justify-center gap-6 ">
			<p className={`${poppins.className} text-[32px] text-[#25324B]`}>Welcome Back!</p>
			<div className="flex gap-4 items-center justify-between w-full">
				<div className=" bg-[#D6DDEB] h-[1px] flex-1/4"></div>
				<p className=" grow"></p>
				<div className=" bg-[#D6DDEB] h-[1px] flex-1/4"></div>
			</div>
			<SignInForm />
			<form action={signInUserWithGoogle} className="w-full">
				<button
					type="submit"
					className="flex items-center justify-center h-12.5 gap-3 rounded-md border border-[#CCCCF5] w-full"
				>
					<FcGoogle className="text-xl" />
					<p className="text-[#4640DE] text-[16px] font-bold cursor-pointer">Sign In with Google!</p>
				</button>
			</form>
			<div className="w-full flex gap-2">
				<p className="text-[#202430] text-[16px] font-normal opacity-70">Dont have an account?</p>
				<Link href={"/register"} className="text-[#4640DE] text-[16px] font-semibold">
					Sign Up
				</Link>
			</div>
		</div>
	);
}
export default LoginPage;
