import axios from "axios";

export const request = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-type": "application/json; charset=UTF-8",
	},
});

request.interceptors.request.use((config) => {
	config.data = JSON.stringify(config.data);

	return config;
});
