import { FiMessageSquare } from "react-icons/fi";
import ContactForm from "./components/ContactForm";

function App() {
	return (
        <div className="container">
            <div className="logo">
                <FiMessageSquare/>
            </div>
            <h1>Get in Touch</h1>
            <h3>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</h3>
            <ContactForm />
            <p className="footer">We'll get back to you within 24 hours.</p>
        </div>
    );
}
export default App;
