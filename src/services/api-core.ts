import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_API_URL;


const headers = {"Content-Type": 'application/json'};

// To prevent axios from throwinf any errors
export const apiGateway = axios.create({
    baseURL:baseUrl,
    headers,
    validateStatus: ()=> true
})