// import axios from "axios";
// import { postEvent, BASE_URL } from "./postEvent";
// import MockAdapter from "axios-mock-adapter";
//
// const mock = new MockAdapter(axios);
//
// // jest.mock("axios");
//
// // jest.mock("axios", () => {
// //   return {
// //     post: jest.fn(() => Promise.resolve({ data: {} })),
// //   };
// // });
//
// const mockedSetAlert = jest.fn(() => {
//   return { message: "Event Created", isSuccess: true };
// });
//
// const stubbedFields = {
//   date_end: "2024-02-02T12:00",
//   date_start: "2024-02-01T11:00",
//   description: "A lovely description",
//   friends_accepted: ["w4mYUJ2A3BLdmfnMctXVx6EDAQQE"],
//   friends_invited: ["Mrs Muntz"],
//   location: "A lovely location",
//   name: "A lovely event name",
//   owner: "w4mYUJ2A3BLdmfnMctXVx6EDAQQE",
// };
//
// const stubbedToken =
//   "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiIi…N1YiI6Inc0bVlVSjJBM0JMZG1mbk1jdFhWeDZFREFRUUUifQ.";
// describe("post event", () => {
//   it("successfully posts event data to the API", async () => {
//     mock.onPost(`${BASE_URL}/events`);

it("", () => {});

// const response = { data: "Record saved successfully", status: 201 };

// const result = await postEvent(stubbedFields, stubbedToken, mockedSetAlert);
//
// expect(result).toBeTruthy();

// axios.post.mockResolvedValue(response);

// axios.post.mockImplementationOnce(() => {
//   return Promise.resolve(response);
// });
//
// await postEvent(stubbedFields, stubbedToken, mockedSetAlert);
//
// expect(axios.post).toHaveReturnedWith();
//   });
// });

// response should be:
// {data: 'Record saved successfully', status: 201, statusText: 'Created', headers: {…}, config: {…}, …}
// config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
// data: "Record saved successfully"
// headers: {content-length: '25', content-type: 'text/html; charset=utf-8'}
// request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status: 201
// statusText: "Created"
