import { auth, signOut } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await auth();
	if (session) {
		return (
			<div className="">
				<p>Welcome to home {session?.user?.name} </p>
				<Image src={`${session?.user?.image}`} alt="" width={50} height={50} />
				<form
					action={async () => {
						"use server";
						await signOut({ redirectTo: "/login" });
					}}
				>
					<button
						type="submit"
						className=" bg-blue-700 hover:bg-blue-800 active:bg-blue-600 py-3 px-6 rounded-[80px] text-white font-bold text-[16px] cursor-pointer"
					>
						Sign out
					</button>
				</form>
			</div>
		);
	}
	return (
		<div className="">
			<p>You are not signed in</p>
			<button
				onClick={redirect("/login")}
				className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-600 py-3 px-6 rounded-[80px] text-white font-bold text-[16px] cursor-pointer"
			>
				Sign in
			</button>
		</div>
	);
}
