import AxiosMockAdapter from "axios-mock-adapter";
import { request } from "./request.ts";

const mock = new AxiosMockAdapter(request);

export function mockGetRequest<T>(url: string, response: T) {
	mock.onGet(url).reply(200, response);
}

export function mockPostRequest<T>(url: string, response: T) {
	mock.onPost(url).reply(201, response);
}

export function clearAllMocks() {
	mock.reset();
}
