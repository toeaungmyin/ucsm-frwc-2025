import axios from 'axios';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 60000,
});

// // You can also add interceptors if needed
// client.interceptors.request.use(
//     (config) => {
//         // Modify request config before sending the request
//         return config;
//     },
//     (error) => {
//         // Handle request error
//         return Promise.reject(error);
//     }
// );

// client.interceptors.response.use(
//     (response) => {
//         // Handle response data
//         return response;
//     },
//     (error) => {
//         // Handle response error
//         return Promise.reject(error);
//     }
// );

export default client;