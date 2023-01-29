import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { postEvent, BASE_URL } from "./postEvent";

const mock = new MockAdapter(axios);

describe("postEvent", () => {
  beforeEach(() => {
    mock.reset();
  });

  const stubbedFields = {
    date_end: "2024-02-02T12:00",
    date_start: "2024-02-01T11:00",
    description: "A lovely description",
    friends_accepted: ["w4mYUJ2A3BLdmfnMctXVx6EDAQQE"],
    friends_invited: ["Mrs Muntz"],
    location: "A lovely location",
    name: "A lovely event name",
    owner: "w4mYUJ2A3BLdmfnMctXVx6EDAQQE",
  };

  const postEventEndpoint = `${BASE_URL}/events`;

  const stubbedToken = "im-a-little-token";

  it("it calls the post event endpoint with the correct payload", async () => {
    const mockedSetAlert = jest.fn();

    await postEvent(stubbedFields, stubbedToken, mockedSetAlert);

    expect(mock.history.post.length).toEqual(1);

    expect(mock.history.post[0].data).toEqual(JSON.stringify(stubbedFields));
  });

  it("it sets a success alert when an event is successfully posted", async () => {
    const mockedSetAlert = jest
      .fn()
      .mockReturnValueOnce({ message: "Event Created", isSuccess: true });

    mock
      .onPost(postEventEndpoint, stubbedFields)
      .reply(201, "Record saved successfully");

    const response = await postEvent(
      stubbedFields,
      stubbedToken,
      mockedSetAlert
    );

    expect(mock.history.post.length).toEqual(1);

    expect(mock.history.post[0].data).toEqual(JSON.stringify(stubbedFields));

    expect(response.status).toEqual(201);

    expect(mockedSetAlert).toHaveReturnedWith({
      message: "Event Created",
      isSuccess: true,
    });
  });

  it("it sets a failure alert when an event is not successfully posted", async () => {
    jest.clearAllMocks();

    mock.onPost(postEventEndpoint, stubbedFields).reply(500);

    const mockedSetAlert = jest.fn().mockReturnValueOnce({
      message: "Server Error. Please try again later",
      isSuccess: false,
    });

    await postEvent(stubbedFields, stubbedToken, mockedSetAlert);

    expect(mock.history.post.length).toEqual(1);

    expect(mock.history.post[0].data).toEqual(JSON.stringify(stubbedFields));

    expect(mockedSetAlert).toHaveReturnedWith({
      message: "Server Error. Please try again later",
      isSuccess: false,
    });
  });
});
