"use server";

import { signIn } from "@/auth";

export async function signInUserWithGoogle() {
	await signIn("google", { redirectTo: "/" });
}

export async function signInWithApi(formData: FormData) {
	await signIn("credentials", formData, { redirectTo: "/" });
}
