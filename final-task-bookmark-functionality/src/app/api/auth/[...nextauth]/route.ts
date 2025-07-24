import { handlers } from "@/auth"; // Referring to the auth.ts we just created

const baseUrl = process.env.API_URL;

export const { GET, POST } = handlers;
