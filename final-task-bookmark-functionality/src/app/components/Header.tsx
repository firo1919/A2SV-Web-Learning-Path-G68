import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

async function Header() {
	const session = await auth();
	if (session) {
		return (
			<div className="w-full flex justify-between items-center px-8 py-4 bg-gray-300">
				<div className="flex gap-4 items-center">
					{session?.user?.image && (
						<Image src={`${session?.user?.image}`} alt="" width={50} height={50} className="rounded-full" />
					)}
					<p className="capitalize">{session?.user?.name} </p>
				</div>
				<div className="flex gap-6 items-center">
					<Link className="font-bold hover:text-white" href="/joblist">
						Job-List
					</Link>
					<Link className="font-bold hover:text-white" href="/bookmarks">
						Bookmarks
					</Link>
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
			</div>
		);
	}
}
export default Header;
