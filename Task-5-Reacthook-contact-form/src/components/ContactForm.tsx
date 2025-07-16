import { FiMessageSquare } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { useForm } from "react-hook-form";

interface FormFields {
	name: string;
	email: string;
	message: string;
}

function ContactForm() {
	const { register, handleSubmit, formState: {errors} } = useForm<FormFields>();

	function onSubmit(data: FormFields) {
		console.log(data);
	}

	return (
		<div className="contact-form">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="form-field">
					<label htmlFor="name">
						<FaRegUser />
						<p>Full Name</p>
					</label>
					<input
						type="text"
						id="name"
						placeholder="Enter your full name"
						{...register("name", {
							required: "Name is required",
							maxLength: {
                                value: 50,
                                message: "Name should be at maximum 50 character long"
                            },
							pattern: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
						})}
					/>
                    {
                        errors.name && <div className="error">{errors.name.message || "Invalid name format"}</div>
                    }
				</div>
				<div className="form-field">
					<label htmlFor="email">
						<MdOutlineLocalPostOffice />
						<p>Email Address</p>
					</label>
					<input
						type="text"
						id="email"
						placeholder="Enter your email address"
						{...register("email", {
							required: "Email is required",
							pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
						})}
					/>
                    {
                        errors.email && <div className="error">{errors.email.message || "Invalid email format"}</div>
                    }
				</div>
				<div className="form-field">
					<label htmlFor="message">
						<FiMessageSquare /> <p>Message</p>
					</label>
					<textarea
						id="message"
						{...register("message", {
							required: "Message is required",
						})}
					></textarea>
                    {
                        errors.message && <div className="error">{errors.message.message}</div>
                    }
				</div>
				<button>Send Message</button>
			</form>
		</div>
	);
}
export default ContactForm;
