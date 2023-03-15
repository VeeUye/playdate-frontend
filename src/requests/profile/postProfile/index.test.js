import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { postProfile, BASE_URL } from "./index";

const mock = new MockAdapter(axios);

describe("postProfile", () => {
  beforeEach(() => {
    mock.reset();
  });

  const stubbedFields = {
    name: "Crabbo",
    description: "I'm a little crabbo",
    children: ["Maggie", "Lisa", "Bart"],
    location: "Springfield",
    friends: ["firstFriend"],
    userId: 123,
  };

  const stubbedToken = "im-a-little-token";

  const postProfileEndpoint = `${BASE_URL}/users`;

  it("it calls the post profile endpoint with the correct payload", async () => {
    const mockedSetAlert = jest.fn();

    await postProfile(stubbedFields, stubbedToken, mockedSetAlert);

    expect(mock.history.post.length).toEqual(1);

    expect(mock.history.post[0].data).toEqual(JSON.stringify(stubbedFields));
  });

  it("returns 'record created successfully' when a profile is created", async () => {
    const mockSetAlert = jest.fn();

    mock.onPost(postProfileEndpoint).reply(201, "Record saved successfully");

    const result = await postProfile(stubbedFields, stubbedToken, mockSetAlert);

    expect(mock.history.post.length).toEqual(1);

    expect(result).toEqual("Record saved successfully");
  });

  it("it sets a success Alert when a profile is successfully created", async () => {
    const mockSetAlert = jest
      .fn()
      .mockReturnValue({ message: "Profile Created", isSuccess: true });

    mock.onPost(postProfileEndpoint).reply(201, "Record saved successfully");

    await postProfile(stubbedFields, stubbedToken, mockSetAlert);

    expect(mock.history.post.length).toEqual(1);

    expect(mock.history.post[0].data).toEqual(JSON.stringify(stubbedFields));

    expect(mockSetAlert).toHaveReturnedWith({
      message: "Profile Created",
      isSuccess: true,
    });
  });

  it("it sets a failure Alert when a profile is not successfully created", async () => {
    jest.clearAllMocks();

    mock.onPost(postProfileEndpoint, stubbedFields).reply(500);

    const mockedSetAlert = jest.fn().mockReturnValueOnce({
      message: "Server Error. Please try again later",
      isSuccess: false,
    });

    await postProfile(stubbedFields, stubbedToken, mockedSetAlert);

    expect(mock.history.post.length).toEqual(1);

    expect(mock.history.post[0].data).toEqual(JSON.stringify(stubbedFields));

    expect(mockedSetAlert).toHaveReturnedWith({
      message: "Server Error. Please try again later",
      isSuccess: false,
    });
  });
});
