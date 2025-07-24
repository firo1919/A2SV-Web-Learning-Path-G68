function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="bg-[#F5F5F5] fixed top-0 left-0 w-full bottom-0 flex items-center justify-center">
			{children}
		</div>
	);
}
export default AuthLayout;
