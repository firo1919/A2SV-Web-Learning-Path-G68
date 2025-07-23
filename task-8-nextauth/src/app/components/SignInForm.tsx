"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import * as z from "zod";
import { UserLoginSchema } from "../types/schema";

function SignInForm() {
	type FormFields = z.infer<typeof UserLoginSchema>;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormFields>({ resolver: zodResolver(UserLoginSchema) });
	const [isLoading, setIsLoading] = useState(false);
	const error = useSearchParams().get("error");

	useEffect(() => {
		if (error) {
			toast("Login failed, Invalid credentials", {
				draggable: false,
				theme: "colored",
				hideProgressBar: true,
				type: "error",
			});
		}
	}, [error]);

	async function onSubmit(data: FormFields) {
		setIsLoading(true);
		console.log(data);
		const user = {
			email: data.email,
			password: data.password,
			redirectTo: "/",
		};
		try {
			await signIn("credentials", user);
			reset();
		} catch (error) {
			toast("Login failed", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
			console.log(error);
		}
		setIsLoading(false);
	}

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5">
				<div className="flex flex-col gap-1">
					<label className="text-[#515B6F] text-[16px] font-semibold" htmlFor="email">
						Email Address
					</label>
					<input
						type="text"
						className="w-full border-4 border-[#D6DDEB] rounded-[7px] py-3 px-4 focus:outline-none focus:border-blue-700"
						id="email"
						placeholder="Enter email address"
						{...register("email")}
					/>
					{errors?.email && <div className="text-red-600 font-semibold">{errors.email.message}</div>}
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-[#515B6F] text-[16px] font-semibold" htmlFor="password">
						Password
					</label>
					<input
						type="password"
						className="w-full border-4 border-[#D6DDEB] rounded-[7px] py-3 px-4 focus:outline-none focus:border-blue-700"
						id="password"
						placeholder="Enter password"
						{...register("password")}
					/>
					{errors?.password && <div className="text-red-600 font-semibold">{errors.password.message}</div>}
				</div>
				<button
					type="submit"
					className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-600 py-3 px-6 rounded-[80px] text-white font-bold text-[16px] cursor-pointer"
				>
					Login
				</button>
			</form>
			<ToastContainer />
			{isLoading && (
				<div
					className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center
                        bg-white opacity-50"
				>
					<ImSpinner2 className="text-7xl animate-spin" />
				</div>
			)}
		</div>
	);
}
export default SignInForm;
