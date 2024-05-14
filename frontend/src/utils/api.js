import axios from "axios";

const axiosAPI = axios.create({
	baseURL: process.env.REACT_APP_WEBSITE_URL_LOCAL
});

const apiRequest = async (method, url, request) => {
	const headers = {
		authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
		'Content-Type': 'application/json; charset=utf-8'
	};
	try {
		const res = await axiosAPI({
			method,
			url,
			data: request,
			headers
		});
		return await Promise.resolve(res.data);
	} catch (err) {
		return await Promise.reject(err);
	}
};

const get = (url, request = {}) => apiRequest("get", url, request);

const deleteRequest = (url, request = {}) => apiRequest("delete", url, request);

const post = (url, request = {}) => apiRequest("post", url, request);

const put = (url, request = {}) => apiRequest("put", url, request);

const patch = (url, request = {}) => apiRequest("patch", url, request);

const API = {
	get,
	delete: deleteRequest,
	post,
	put,
	patch
};

export default API;
