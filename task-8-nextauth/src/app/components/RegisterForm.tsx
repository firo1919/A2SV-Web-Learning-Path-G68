"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import * as z from "zod";
import { useRegisterUserMutation } from "../store/features/api/authSlice";
import { UserRegisterSchema } from "../types/schema";

function RegisterForm() {
	type FormFields = z.infer<typeof UserRegisterSchema>;
	const [registerUser, { isLoading }] = useRegisterUserMutation();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormFields>({ resolver: zodResolver(UserRegisterSchema) });

	async function onSubmit(data: FormFields) {
		console.log(data);
		const newUser = {
			name: data.fullname,
			email: data.email,
			password: data.password,
			confirmPassword: data.confirmPass,
		};
		try {
			const response = await registerUser(newUser).unwrap();
			console.log(response);
			if (response.success) {
				reset();
				router.push(`/register/verify?email=${newUser.email}`);
			} else {
				toast(response.message, { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
			}
		} catch (error) {
			toast("Registration failed", { draggable: false, theme: "colored", hideProgressBar: true, type: "error" });
			console.log(error);
		}
	}

	return (
		<div className="w-full relative">
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5">
				<div className="flex flex-col gap-1">
					<label htmlFor="fullname" className="text-[#515B6F] text-[16px] font-semibold">
						Full Name
					</label>
					<input
						type="text"
						id="fullname"
						className="w-full border-4 border-[#D6DDEB] focus:outline-none focus:border-blue-700 rounded-[7px] py-3 px-4"
						placeholder="Enter your full name"
						{...register("fullname")}
					/>
					{errors?.fullname && <div className="text-red-600 font-semibold">{errors.fullname.message}</div>}
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-[#515B6F] text-[16px] font-semibold" htmlFor="email">
						Email Address
					</label>
					<input
						type="text"
						className="w-full border-4 border-[#D6DDEB] focus:outline-none focus:border-blue-700 rounded-[7px] py-3 px-4"
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
						className="w-full border-4 border-[#D6DDEB] focus:outline-none focus:border-blue-700 rounded-[7px] py-3 px-4"
						id="password"
						placeholder="Enter password"
						{...register("password")}
					/>
					{errors?.password && <div className="text-red-600 font-semibold">{errors.password.message}</div>}
				</div>
				<div className="flex flex-col gap-1">
					<label className="text-[#515B6F] text-[16px] font-semibold" htmlFor="confirm-password">
						Confirm Password
					</label>
					<input
						type="text"
						className="w-full border-4 border-[#D6DDEB] focus:outline-none focus:border-blue-700 rounded-[7px] py-3 px-4"
						id="confirm-password"
						placeholder="Enter password"
						{...register("confirmPass")}
					/>
					{errors?.confirmPass && (
						<div className="text-red-600 font-semibold">{errors.confirmPass.message}</div>
					)}
				</div>
				<button className="w-full bg-blue-700 hover:bg-blue-800 active:bg-blue-600 py-3 px-6 rounded-[80px] text-white font-bold text-[16px] cursor-pointer">
					Continue
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
export default RegisterForm;
